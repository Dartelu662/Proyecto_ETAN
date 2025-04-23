import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, CollectionReference, DocumentReference, updateDoc, query, where, getDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Avion from '../interfaces/avion.interface';
@Injectable({
  providedIn: 'root'
})
export class AvionesService {

  private firestore = inject(Firestore);
  
    
    
    constructor() { }
  
    async AddAvion(avion: Avion): Promise<DocumentReference<Avion> | null> {
      try {
        const avionRef: CollectionReference<Avion> = collection(this.firestore, 'Avion') as CollectionReference<Avion>;
        return await addDoc(avionRef, avion);
      } catch (error) {
        console.error('Error al agregar avion:', error);
        return null;
      }
    }
  
  
  
    getAviones(): Observable<Avion[]> {
      const avionsRef = collection(this.firestore, 'Avion');
      const avionsActivosQuery = query(avionsRef, where('Activo', '==', true));
    
      return collectionData(avionsActivosQuery, { idField: 'id' }) as Observable<Avion[]>;
    }
  
  
  
    GetAvionById(id: string): Observable<Avion | undefined> {
      const avionDoc = doc(this.firestore, `Avion/${id}`);
      return docData(avionDoc, { idField: 'id' }) as Observable<Avion | undefined>;
    }
  
  
  
    async UpdateAvion(avion: Avion): Promise<boolean> {
      if (!avion.id) {
        console.error('Error: El ID del avion es obligatorio para actualizar.');
        return false;
      }
  
      const avionDocRef = doc(this.firestore, `Avion/${avion.id}`);
  
      const updateData: Partial<Avion> = Object.fromEntries(
        Object.entries(avion).filter(([_, value]) => value !== null && value !== '')
      );
  
      try {
        await updateDoc(avionDocRef, updateData);
        return true;
      } catch (error) {
        console.error('Error al actualizar avion:', error);
        return false;
      }
    }
  
  
  
    async deleteAvion(id: string): Promise<boolean> {
      if (!id) {
        console.error('Error: El ID del avion es obligatorio para desactivarlo.');
        return false;
      }
    
      const avionDocRef = doc(this.firestore, `Avion/${id}`);
    
      // Verificar que el documento exista
      const docSnapshot = await getDoc(avionDocRef);
      if (!docSnapshot.exists()) {
        console.error(`El documento con ID ${id} no existe.`);
        return false;
      }
      console.log('Documento antes de la actualización:', docSnapshot.data());
    
      try {
        console.log(`Intentando actualizar el campo 'Activo' a false para el documento con ID ${id}`);
        await updateDoc(avionDocRef, { Activo: false });
        console.log(`Avion con ID ${id} ha sido desactivado.`);
        return true;
      } catch (error) {
        console.error('Error al desactivar avion:', error);
        return false;
      }
    }

}
