import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, CollectionReference, DocumentReference, updateDoc, query, where, getDoc} from '@angular/fire/firestore';
import Edocuenta from '../interfaces/edocuenta.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EdoCuentaService {

  
  private firestore = inject(Firestore);

    
    constructor() { }
  
    async AddEdocuenta(edocuenta: Edocuenta): Promise<DocumentReference<Edocuenta> | null> {
      try {
        const edocuentaRef: CollectionReference<Edocuenta> = collection(this.firestore, 'Edocuenta') as CollectionReference<Edocuenta>;
        return await addDoc(edocuentaRef, edocuenta);
      } catch (error) {
        console.error('Error al agregar edocuenta:', error);
        return null;
      }
    }
  
  
  
    GetEdocuentas(Matricula: string): Observable<Edocuenta[]> {
      console.log('Cargando estado de cuenta para matrícula:', Matricula);

      const edocuentasRef = collection(this.firestore, 'Edocuenta');
      const activosQuery = query(edocuentasRef,  where('Matricula', '==', Matricula));
  
      return collectionData(activosQuery, { idField: 'id' })
        .pipe(
          map((arr: any[]) => 
            arr.map(doc => ({
              ...doc,
              MensPag: doc.MensPag  ?? 0,
              MensPen: doc.MensPen  ?? 0
            }))
          )
        ) as Observable<Edocuenta[]>;
    }
  
    GetEdocuentasByAlumnoId(alumnoId: string): Observable<Edocuenta[]> {
      const edocuentasRef = collection(this.firestore, 'Edocuenta');
      const edocuentasQuery = query(edocuentasRef, where('Alumno', '==', alumnoId));
    
      return collectionData(edocuentasQuery, { idField: 'id' }) as Observable<Edocuenta[]>;
    }
  
    GetEdocuentaById(id: string): Observable<Edocuenta | undefined> {
      const edocuentaDoc = doc(this.firestore, `Edocuenta/${id}`);
      return docData(edocuentaDoc, { idField: 'id' }) as Observable<Edocuenta | undefined>;
    }
  
  
  
    async UpdateEdocuenta(edocuenta: Edocuenta): Promise<boolean> {
      if (!edocuenta.id) {
        console.error('Error: El ID del edocuenta es obligatorio para actualizar.');
        return false;
      }
  
      const edocuentaDocRef = doc(this.firestore, `Edocuenta/${edocuenta.id}`);
  
      const updateData: Partial<Edocuenta> = Object.fromEntries(
        Object.entries(edocuenta).filter(([_, value]) => value !== null && value !== '')
      );
  
      try {
        await updateDoc(edocuentaDocRef, updateData);
        return true;
      } catch (error) {
        console.error('Error al actualizar edocuenta:', error);
        return false;
      }
    }
  
  
  
    async deleteEdocuenta(id: string): Promise<boolean> {
      if (!id) {
        console.error('Error: El ID del edocuenta es obligatorio para desactivarlo.');
        return false;
      }
    
      const edocuentaDocRef = doc(this.firestore, `Edocuenta/${id}`);
    
      // Verificar que el documento exista
      const docSnapshot = await getDoc(edocuentaDocRef);
      if (!docSnapshot.exists()) {
        console.error(`El documento con ID ${id} no existe.`);
        return false;
      }
      console.log('Documento antes de la actualización:', docSnapshot.data());
    
      try {
        console.log(`Intentando actualizar el campo 'Activo' a false para el documento con ID ${id}`);
        await updateDoc(edocuentaDocRef, { Activo: false });
        console.log(`Edocuenta con ID ${id} ha sido desactivado.`);
        return true;
      } catch (error) {
        console.error('Error al desactivar edocuenta:', error);
        return false;
      }
    }
}
