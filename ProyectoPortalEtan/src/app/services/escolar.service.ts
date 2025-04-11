import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, CollectionReference, DocumentReference, updateDoc, query, where, getDoc, getDocs} from '@angular/fire/firestore';
import { Escolar } from '../interfaces/escolar.interface';
import { Observable } from 'rxjs';
import Materia from '../interfaces/materia.interface';

@Injectable({
  providedIn: 'root',
})
export class EscolarService {
  
  private firestore = inject(Firestore);

    
    constructor() { }
    GetEscolars(): Observable<Escolar[]> {
        const escolarRef = collection(this.firestore, 'Escolar');
        // Se asume que la interfaz Escolar tiene la propiedad "Activo" para determinar si el Escolar está activo
        const escolaresActivosQuery = query(escolarRef, where('Activo', '==', true));
        return collectionData(escolaresActivosQuery, { idField: 'id' }) as Observable<Escolar[]>;
      }

    async CrearEscolaresPorCursoYPlan(plan: string, curso: string, matricula: string): Promise<boolean> {
      try {
        const materiasRef = collection(this.firestore, 'Materia');
        const materiasQuery = query(
          materiasRef,
          where('PlanId', '==', plan),
          where('CursoId', '==', curso),
          where('Activo', '==', true)
        );
    
        const snapshot = await getDocs(materiasQuery);
        console.log(snapshot)
        if (snapshot.empty) {
          console.warn('No se encontraron materias para este curso y plan.');
          return false;
        }
    
        const firstMateria = snapshot.docs[0].data() as Materia;
        const nombrePlan = firstMateria.plan;
        const nombreCurso = firstMateria.curso;
        if(nombrePlan == undefined || nombreCurso == undefined){
          return false
        }
        const escolarRef: CollectionReference<Escolar> = collection(this.firestore, 'Escolar') as CollectionReference<Escolar>;
    
        const fechaActual = new Date().toISOString();
    
        const batchPromises = snapshot.docs.map(async (docSnap) => {
          const materia = {
            ...docSnap.data() as Materia,
            id: docSnap.id
          }
          
          const escolar: Escolar = {
            Matricula: matricula,
            Plan: nombrePlan,
            planId: plan,
            Curso: nombreCurso,
            cursoId: curso,
            Maestro: materia.Maestro,
            maestroId: materia.idMaestro,
            Materia: materia.Materia,
            materiaId: materia.id,
            FechaActualizacion: fechaActual,
            Activo: true,
          };
    
          await addDoc(escolarRef, escolar);
        });
    
        await Promise.all(batchPromises);
        console.log('Registros de escolares creados con éxito.');
        return true;
      } catch (error) {
        console.error('Error al crear registros escolares:', error);
        return false;
      }
    }
}