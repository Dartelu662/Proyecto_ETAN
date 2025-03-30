import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, CollectionReference, DocumentReference, updateDoc, query, where, getDoc} from '@angular/fire/firestore';
import Maestro from '../interfaces/maestro.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaestroService {

  private firestore = inject(Firestore);

  
  
  constructor() { }

  async AddMaestro(maestro: Maestro): Promise<DocumentReference<Maestro> | null> {
    try {
      const maestroRef: CollectionReference<Maestro> = collection(this.firestore, 'Maestro') as CollectionReference<Maestro>;
      return await addDoc(maestroRef, maestro);
    } catch (error) {
      console.error('Error al agregar maestro:', error);
      return null;
    }
  }



  GetMaestros(): Observable<Maestro[]> {
    const maestrosRef = collection(this.firestore, 'Maestro');
    const maestrosActivosQuery = query(maestrosRef, where('Activo', '==', true));
  
    return collectionData(maestrosActivosQuery, { idField: 'id' }) as Observable<Maestro[]>;
  }



  GetMaestroById(id: string): Observable<Maestro | undefined> {
    const maestroDoc = doc(this.firestore, `Maestro/${id}`);
    return docData(maestroDoc, { idField: 'id' }) as Observable<Maestro | undefined>;
  }



  async UpdateMaestro(maestro: Maestro): Promise<boolean> {
    if (!maestro.id) {
      console.error('Error: El ID del maestro es obligatorio para actualizar.');
      return false;
    }

    const maestroDocRef = doc(this.firestore, `Maestro/${maestro.id}`);

    const updateData: Partial<Maestro> = Object.fromEntries(
      Object.entries(maestro).filter(([_, value]) => value !== null && value !== '')
    );

    try {
      await updateDoc(maestroDocRef, updateData);
      return true;
    } catch (error) {
      console.error('Error al actualizar maestro:', error);
      return false;
    }
  }



  async deleteMaestro(id: string): Promise<boolean> {
    if (!id) {
      console.error('Error: El ID del maestro es obligatorio para desactivarlo.');
      return false;
    }
  
    const maestroDocRef = doc(this.firestore, `Maestro/${id}`);
  
    // Verificar que el documento exista
    const docSnapshot = await getDoc(maestroDocRef);
    if (!docSnapshot.exists()) {
      console.error(`El documento con ID ${id} no existe.`);
      return false;
    }
    console.log('Documento antes de la actualización:', docSnapshot.data());
  
    try {
      console.log(`Intentando actualizar el campo 'Activo' a false para el documento con ID ${id}`);
      await updateDoc(maestroDocRef, { Activo: false });
      console.log(`Maestro con ID ${id} ha sido desactivado.`);
      return true;
    } catch (error) {
      console.error('Error al desactivar maestro:', error);
      return false;
    }
  }
  
}
