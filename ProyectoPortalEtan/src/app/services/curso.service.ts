import { Injectable, inject } from '@angular/core';
import { Firestore, collection, CollectionReference, addDoc, collectionData, doc, docData, updateDoc, getDoc, query, where, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Curso from '../interfaces/curso.interface';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private firestore = inject(Firestore);

  constructor() { }

  async AddCurso(curso: Curso): Promise<DocumentReference<Curso> | null> {
    try {
      const cursoRef: CollectionReference<Curso> = collection(this.firestore, 'Curso') as CollectionReference<Curso>;
      return await addDoc(cursoRef, curso);
    } catch (error) {
      console.error('Error al agregar curso:', error);
      return null;
    }
  }

  GetCursos(): Observable<Curso[]> {
    const cursoRef = collection(this.firestore, 'Curso');
    // Se asume que la interfaz Curso tiene la propiedad "Activo" para determinar si el curso está activo
    const cursosActivosQuery = query(cursoRef, where('Activo', '==', true));
    return collectionData(cursosActivosQuery, { idField: 'id' }) as Observable<Curso[]>;
  }

  GetCursoById(id: string): Observable<Curso | undefined> {
    const cursoDoc = doc(this.firestore, `Curso/${id}`);
    return docData(cursoDoc, { idField: 'id' }) as Observable<Curso | undefined>;
  }

  async UpdateCurso(curso: Curso): Promise<boolean> {
    if (!curso.id) {
      console.error('Error: El ID del curso es obligatorio para actualizar.');
      return false;
    }

    const cursoDocRef = doc(this.firestore, `Curso/${curso.id}`);
    const updateData: Partial<Curso> = Object.fromEntries(
      Object.entries(curso).filter(([_, value]) => value !== null && value !== '')
    );

    try {
      await updateDoc(cursoDocRef, updateData);
      return true;
    } catch (error) {
      console.error('Error al actualizar curso:', error);
      return false;
    }
  }

  async deleteCurso(id: string): Promise<boolean> {
    if (!id) {
      console.error('Error: El ID del curso es obligatorio para desactivarlo.');
      return false;
    }
  
    const cursoDocRef = doc(this.firestore, `Curso/${id}`);
    const docSnapshot = await getDoc(cursoDocRef);
    if (!docSnapshot.exists()) {
      console.error(`El documento con ID ${id} no existe.`);
      return false;
    }
  
    try {
      await updateDoc(cursoDocRef, { Activo: false });
      return true;
    } catch (error) {
      console.error('Error al desactivar curso:', error);
      return false;
    }
  }
  
}
