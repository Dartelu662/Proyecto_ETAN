import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  addDoc,
  CollectionReference,
  DocumentReference,
  updateDoc,
  query,
  where,
  getDoc
} from '@angular/fire/firestore';
import Pagos from '../interfaces/pagos.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PagosService {

  private firestore = inject(Firestore);

  constructor() {}

  /**
   * Agrega un nuevo pago a la colección 'Pagos'.
   * Retorna la referencia al documento creado o null en caso de error.
   */
  async AddPago(pago: Pagos): Promise<DocumentReference<Pagos> | null> {
    try {
      const pagosRef = collection(
        this.firestore,
        'pagos'
      ) as CollectionReference<Pagos>;
      // Asegurar un campo Activo por defecto
      const data = { ...pago, Activo: pago.Activo ?? true };
      return await addDoc(pagosRef, data);
    } catch (error) {
      console.error('Error al agregar pago:', error);
      return null;
    }
  }

  /**
   * Obtiene todos los pagos activos.
   */
  GetPagos(): Observable<Pagos[]> {
    const pagosRef = collection(this.firestore, 'pagos');
    const activosQuery = query(pagosRef, where('Activo', '==', true));

    return collectionData(activosQuery, { idField: 'id' })
      .pipe(
        map((arr: any[]) => 
          arr.map(doc => ({
            ...doc
          }))
        )
      ) as Observable<Pagos[]>;
  }

  /**
   * Obtiene los pagos filtrados por matrícula.
   */
  GetPagosByMatricula(matricula: string): Observable<Pagos[]> {
    const pagosRef = collection(this.firestore, 'pagos');
    const pagosQuery = query(pagosRef, where('matricula', '==', matricula));

    return collectionData(pagosQuery, { idField: 'id' }) as Observable<Pagos[]>;
  }

  /**
   * Obtiene un pago por su ID.
   */
//   GetPagoById(id: string): Observable<Pagos | undefined> {
//     const pagoDoc = doc(this.firestore, `Pagos/${id}`);
//     return docData(pagoDoc, { idField: 'id' }) as Observable<Pagos | undefined>;
//   }

  /**
   * Actualiza un pago existente (se requiere propiedad id).
   */
  // // async UpdatePago(pago: Pagos): Promise<boolean> {
  // //   if (!pago.Orderid) {
  // //     console.error('Error: El ID del pago es obligatorio para actualizar.');
  // //     return false;
  // //   }

  // //   const pagoDocRef = doc(this.firestore, `Pagos/${pago.Orderid}`);
  // //   const updateData: Partial<Pagos> = Object.fromEntries(
  // //     Object.entries(pago).filter(([_, value]) => value !== null && value !== undefined && value !== '')
  // //   );

  //   try {
  //     await updateDoc(pagoDocRef, updateData);
  //     return true;
  //   } catch (error) {
  //     console.error('Error al actualizar pago:', error);
  //     return false;
  //   }
  }

  /**
   * Desactiva (soft delete) un pago marcando Activo=false.
   */
  // async deletePago(id: string): Promise<boolean> {
  //   if (!id) {
  //     console.error('Error: El ID del pago es obligatorio para desactivar.');
  //     return false;
  //   }

  //   const pagoDocRef = doc(this.firestore, `Pagos/${id}`);
  //   const docSnapshot = await getDoc(pagoDocRef);
  //   if (!docSnapshot.exists()) {
  //     console.error(`El documento con ID ${id} no existe.`);
  //     return false;
  //   }

    // try {
    //   await updateDoc(pagoDocRef, { Activo: false });
    //   return true;
    // } catch (error) {
    //   console.error('Error al desactivar pago:', error);
    //   return false;
    // }
  // }

