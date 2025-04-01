import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, CollectionReference, DocumentReference, updateDoc, query, where, getDoc} from '@angular/fire/firestore';
import { HrsVuelo } from '../interfaces/hrsvuelo.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class HrsvueloService {
  
  private firestore = inject(Firestore);

    
    constructor() { }
  
    async AddHrsVuelo(HrsVuelo: HrsVuelo): Promise<DocumentReference<HrsVuelo> | null> {
      try {
        const HrsVueloRef: CollectionReference<HrsVuelo> = collection(this.firestore, 'HrsVuelo') as CollectionReference<HrsVuelo>;
        return await addDoc(HrsVueloRef, HrsVuelo);
      } catch (error) {
        console.error('Error al agregar HrsVuelo:', error);
        return null;
      }
    }
  
  
  
    GetHrsVuelos(): Observable<HrsVuelo[]> {
      const HrsVuelosRef = collection(this.firestore, 'HrsVuelo');
      const HrsVuelosActivosQuery = query(HrsVuelosRef, where('Activo', '==', true));
    
      return collectionData(HrsVuelosActivosQuery, { idField: 'id' }) as Observable<HrsVuelo[]>;
    }
  
    GetEscolarById(id: string): Observable<HrsVuelo | undefined> {
      const HrsVueloDoc = doc(this.firestore, `HrsVuelo/${id}`);
      return docData(HrsVueloDoc, { idField: 'id' }) as Observable<HrsVuelo | undefined>;
    }
  
   
    async UpdateHrsVuelo(HrsVuelo: HrsVuelo): Promise<boolean> {
      if (!HrsVuelo.id) {
        console.error('Error: El ID del HrsVuelo es obligatorio para actualizar.');
        return false;
      }
  
      const HrsVueloDocRef = doc(this.firestore, `HrsVuelo/${HrsVuelo.id}`);
  
      const updateData: Partial<HrsVuelo> = Object.fromEntries(
        Object.entries(HrsVuelo).filter(([_, value]) => value !== null && value !== '')
      );
  
      try {
        await updateDoc(HrsVueloDocRef, updateData);
        return true;
      } catch (error) {
        console.error('Error al actualizar HrsVuelo:', error);
        return false;
      }
    }
  
  
  
    async deleteHrsVuelo(id: string): Promise<boolean> {
      if (!id) {
        console.error('Error: El ID del HrsVuelo es obligatorio para desactivarlo.');
        return false;
      }
    
      const HrsVueloDocRef = doc(this.firestore, `HrsVuelo/${id}`);
    
      // Verificar que el documento exista
      const docSnapshot = await getDoc(HrsVueloDocRef);
      if (!docSnapshot.exists()) {
        console.error(`El documento con ID ${id} no existe.`);
        return false;
      }
      console.log('Documento antes de la actualización:', docSnapshot.data());
    
      try {
        console.log(`Intentando actualizar el campo 'Activo' a false para el documento con ID ${id}`);
        await updateDoc(HrsVueloDocRef, { Activo: false });
        console.log(`HrsVuelo con ID ${id} ha sido desactivado.`);
        return true;
      } catch (error) {
        console.error('Error al desactivar HrsVuelo:', error);
        return false;
      }
    }
}