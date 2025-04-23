import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
  orderBy,
  limit
} from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { HrsVuelo } from '../interfaces/hrsvuelo.interface';

@Injectable({ providedIn: 'root' })
export class HrsvueloService {
  private firestore = inject(Firestore);

  /** Guarda un nuevo pago en 'pagos' */
  registrarPago(reserva: HrsVuelo): Observable<void> {
    const pagosRef = collection(this.firestore, 'pagos');
    // Asegúrate de incluir aquí reserva.Fecha = new Date() si quieres timestamp real
    return from(addDoc(pagosRef, reserva)).pipe(map(() => {}));
  }

  /** Verifica el crédito restante (hrsVuelo) del último pago para esa matrícula+avión */
  verificarHorasCredito(matricula: string, avionId: string): Observable<number> {
    const pagosRef = collection(this.firestore, 'pagos');
    const q = query(
      pagosRef,
      where('matricula', '==', matricula),
      where('avion', '==', avionId),
      orderBy('fechaPago', 'desc'),  // <— usa 'Fecha', que es el campo que realmente guardas
      limit(1)
    );
    console.log('Verificando horas de crédito...', matricula, avionId);


    return from(getDocs(q)).pipe(
      map(snapshot => {
        if (snapshot.empty) return 0;
        const data = snapshot.docs[0].data();
        return (data['hrsVuelo'] as number) || 0;
      })
    );
  }

  /** Resta 'horas' del campo hrsVuelo del registro más reciente */
  actualizarHorasCredito(
    matricula: string,
    avionId: string,
    horas: number
  ): Observable<void> {
    const pagosRef = collection(this.firestore, 'pagos');
    const q = query(
      pagosRef,
      where('matricula', '==', matricula),
      where('avion', '==', avionId),
      orderBy('fechaPago', 'desc'),
      limit(1)
    );

    console.log('Actualizando horas de crédito...', matricula, avionId, horas);
    return from(getDocs(q)).pipe(
      switchMap(snapshot => {
        if (snapshot.empty) {
          console.warn('No hay pago previo para restar crédito');
          return of(undefined);
        }
        const docSnap = snapshot.docs[0];
        const current = (docSnap.data()['hrsVuelo'] as number) || 0;
        const updated = current - horas;
        const ref = doc(this.firestore, 'pagos', docSnap.id);
        return from(updateDoc(ref, { hrsVuelo: updated }));
      })
    );
  }

  /** Guarda la reserva en la colección 'HrsVuelo' */
  AddHrsVuelo(reserva: HrsVuelo): Promise<void> {
    const hrsRef = collection(this.firestore, 'HrsVuelo');
    // addDoc devuelve Promise<DocumentReference>, aquí la convertimos a void
    return addDoc(hrsRef, reserva).then(() => {});
  }
}
