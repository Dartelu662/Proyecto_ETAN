import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, CollectionReference, DocumentReference, updateDoc, query, where, getDoc} from '@angular/fire/firestore';
import { Escolar } from '../interfaces/escolar.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EscolarService {
  
  private firestore = inject(Firestore);

    
    constructor() { }
  
    async AddEscolar(escolar: Escolar): Promise<DocumentReference<Escolar> | null> {
      try {
        const escolarRef: CollectionReference<Escolar> = collection(this.firestore, 'Escolar') as CollectionReference<Escolar>;
        return await addDoc(escolarRef, escolar);
      } catch (error) {
        console.error('Error al agregar escolar:', error);
        return null;
      }
    }
  
  
  
    GetEscolars(): Observable<Escolar[]> {
      const escolarsRef = collection(this.firestore, 'Escolar');
      const escolarsActivosQuery = query(escolarsRef, where('Activo', '==', true));
    
      return collectionData(escolarsActivosQuery, { idField: 'id' }) as Observable<Escolar[]>;
    }
  
  
  
    GetEscolarById(id: string): Observable<Escolar | undefined> {
      const escolarDoc = doc(this.firestore, `Escolar/${id}`);
      return docData(escolarDoc, { idField: 'id' }) as Observable<Escolar | undefined>;
    }
  
  
  
    async UpdateEscolar(escolar: Escolar): Promise<boolean> {
      if (!escolar.id) {
        console.error('Error: El ID del escolar es obligatorio para actualizar.');
        return false;
      }
  
      const escolarDocRef = doc(this.firestore, `Escolar/${escolar.id}`);
  
      const updateData: Partial<Escolar> = Object.fromEntries(
        Object.entries(escolar).filter(([_, value]) => value !== null && value !== '')
      );
  
      try {
        await updateDoc(escolarDocRef, updateData);
        return true;
      } catch (error) {
        console.error('Error al actualizar escolar:', error);
        return false;
      }
    }
  
  
  
    async deleteEscolar(id: string): Promise<boolean> {
      if (!id) {
        console.error('Error: El ID del escolar es obligatorio para desactivarlo.');
        return false;
      }
    
      const escolarDocRef = doc(this.firestore, `Escolar/${id}`);
    
      // Verificar que el documento exista
      const docSnapshot = await getDoc(escolarDocRef);
      if (!docSnapshot.exists()) {
        console.error(`El documento con ID ${id} no existe.`);
        return false;
      }
      console.log('Documento antes de la actualización:', docSnapshot.data());
    
      try {
        console.log(`Intentando actualizar el campo 'Activo' a false para el documento con ID ${id}`);
        await updateDoc(escolarDocRef, { Activo: false });
        console.log(`Escolar con ID ${id} ha sido desactivado.`);
        return true;
      } catch (error) {
        console.error('Error al desactivar escolar:', error);
        return false;
      }
    }
}