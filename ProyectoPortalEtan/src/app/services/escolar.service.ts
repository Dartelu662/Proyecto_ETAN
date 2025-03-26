import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Calificacion } from '../interfaces/escolar.interface';

@Injectable({
  providedIn: 'root',
})
export class CalificacionService {
  private collectionName = 'calificaciones';

  constructor(private firestore: AngularFirestore) {}

  // Agregar una calificación
  agregarCalificacion(calificacion: Calificacion) {
    return this.firestore.collection(this.collectionName).add(calificacion);
  }

  // Obtener todas las calificaciones
  obtenerCalificaciones() {
    return this.firestore.collection<Calificacion>(this.collectionName).valueChanges();
  }
}