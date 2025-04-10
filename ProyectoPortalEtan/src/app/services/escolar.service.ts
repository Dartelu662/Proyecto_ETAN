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
  
    async CrearEscolaresPorCursoYPlan(plan: string, curso: string, matricula: string): Promise<boolean> {
      try {
        const materiasRef = collection(this.firestore, 'Materia');
        const materiasQuery = query(
          materiasRef,
          where('planid', '==', plan),
          where('cursoid', '==', curso),
          where('Activo', '==', true)
        );
    
        const snapshot = await getDocs(materiasQuery);
        if (snapshot.empty) {
          console.warn('No se encontraron materias para este curso y plan.');
          return false;
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
            Plan: plan,
            planId: plan,
            Curso: curso,
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