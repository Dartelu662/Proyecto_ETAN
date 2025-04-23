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
  getDoc,
  getDocs,
  orderBy,
  limit
} from '@angular/fire/firestore';
import { HrsVuelo } from '../interfaces/hrsvuelo.interface';
import { Observable, of, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HrsvueloService {
  private firestore = inject(Firestore);

  constructor() {}
  
   /** Resta horas del campo hrsVuelo del registro más reciente */
   actualizarHorasCredito(
    matricula: string,
    avionId: string,
    horas: number
  ): Observable<void> {
    const pagosRef = collection(this.firestore, 'pagos');
    const q = query(
      pagosRef,
      where('Matricula', '==', matricula),
      where('Avion', '==', avionId),
      orderBy('FechaPago', 'desc'),
      limit(1)
    );

    return from(getDocs(q)).pipe(
      switchMap(snapshot => {
        if (snapshot.empty) {
          console.warn('No hay registro para actualizar crédito');
          return of(undefined);
        }
        const docSnap = snapshot.docs[0];
        const current = docSnap.data()['hrsVuelo'] as number || 0;
        const updated = current - horas;
        const docRef = doc(this.firestore, 'pagos', docSnap.id);
        return from(updateDoc(docRef, { hrsVuelo: updated }));
      })
    );
  } 

  verificarHorasCredito(matricula: string, avionId: string): Observable<number> {
    console.log('Verificando horas de crédito...', matricula, avionId);
    const pagosRef = collection(this.firestore, 'pagos');
    const q = query(
      pagosRef,
      where('matricula', '==', matricula),
      where('avion', '==', avionId),
      orderBy('fechaPago', 'desc'),
      limit(1)
    );
    
    console.log('Query object:', q);
    console.log('Query:', pagosRef);
    console.log('Matricula:', matricula);


    
    return from(getDocs(q)).pipe(
      map(snapshot => {
        if (!snapshot.empty) {
          const data = snapshot.docs[0].data();
          return data['hrsVuelo'] || 0;
          console.warn('No hay registros de pago para este usuario+avión');
          return 0;
        }
        const data = snapshot.docs[0].data();
        // Asegúrate de que tu documento tenga el campo hrsVuelo
        return (data['hrsVuelo'] as number) || 0;

      })
    );
  }

  registrarPago(reserva: HrsVuelo): Observable<void> {
    const pagosRef = collection(this.firestore, 'pagos');
    // addDoc devuelve una Promise<DocumentReference>, lo convertimos a Observable<void>
    return from(addDoc(pagosRef, reserva)).pipe(
      map(() => {})
    );
  }

  // registrarPago(reserva: HrsVuelo): Observable<any> {
  //   return this.http.post('/api/reservas', reserva); // Reemplazar con API real si aplica
  // }

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

    const HrsVueloDocRef = doc(this.firestore, 'HrsVuelo', id);
    const docSnapshot = await getDoc(HrsVueloDocRef);
    if (!docSnapshot.exists()) {
      console.error("El documento con ID ${id} no existe.");
      return false;
    }

    try {
      await updateDoc(HrsVueloDocRef, { Activo: false });
      return true;
    } catch (error) {
      console.error('Error al desactivar HrsVuelo:', error);
      return false;
    }
  }
}