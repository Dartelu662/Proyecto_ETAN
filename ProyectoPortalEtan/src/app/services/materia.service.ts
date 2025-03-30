import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, CollectionReference, DocumentReference, updateDoc, query, where, getDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Materia from '../interfaces/materia.interface';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  private firestore = inject(Firestore);
  
    
    
    constructor() { }
  
    async AddMateria(materia: Materia): Promise<DocumentReference<Materia> | null> {
      try {
        const materiaRef: CollectionReference<Materia> = collection(this.firestore, 'Materia') as CollectionReference<Materia>;
        return await addDoc(materiaRef, materia);
      } catch (error) {
        console.error('Error al agregar materia:', error);
        return null;
      }
    }
  
  
  
    GetMaterias(): Observable<Materia[]> {
      const materiasRef = collection(this.firestore, 'Materia');
      const materiasActivosQuery = query(materiasRef, where('Activo', '==', true));
    
      return collectionData(materiasActivosQuery, { idField: 'id' }) as Observable<Materia[]>;
    }
  
  
  
    GetMateriaById(id: string): Observable<Materia | undefined> {
      const materiaDoc = doc(this.firestore, `Materia/${id}`);
      return docData(materiaDoc, { idField: 'id' }) as Observable<Materia | undefined>;
    }
  
  
  
    async UpdateMateria(materia: Materia): Promise<boolean> {
      if (!materia.id) {
        console.error('Error: El ID del materia es obligatorio para actualizar.');
        return false;
      }
  
      const materiaDocRef = doc(this.firestore, `Materia/${materia.id}`);
  
      const updateData: Partial<Materia> = Object.fromEntries(
        Object.entries(materia).filter(([_, value]) => value !== null && value !== '')
      );
  
      try {
        await updateDoc(materiaDocRef, updateData);
        return true;
      } catch (error) {
        console.error('Error al actualizar materia:', error);
        return false;
      }
    }
  
  
  
    async deleteMateria(id: string): Promise<boolean> {
      if (!id) {
        console.error('Error: El ID del materia es obligatorio para desactivarlo.');
        return false;
      }
    
      const materiaDocRef = doc(this.firestore, `Materia/${id}`);
    
      // Verificar que el documento exista
      const docSnapshot = await getDoc(materiaDocRef);
      if (!docSnapshot.exists()) {
        console.error(`El documento con ID ${id} no existe.`);
        return false;
      }
      console.log('Documento antes de la actualización:', docSnapshot.data());
    
      try {
        console.log(`Intentando actualizar el campo 'Activo' a false para el documento con ID ${id}`);
        await updateDoc(materiaDocRef, { Activo: false });
        console.log(`Materia con ID ${id} ha sido desactivado.`);
        return true;
      } catch (error) {
        console.error('Error al desactivar materia:', error);
        return false;
      }
    }

}
