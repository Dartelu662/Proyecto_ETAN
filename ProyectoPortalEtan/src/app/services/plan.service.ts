import { Injectable, inject } from '@angular/core';
import { Firestore, collection, CollectionReference, addDoc, collectionData, doc, docData, updateDoc, getDoc, query, where, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Plan from '../interfaces/plan.interface';


@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private firestore = inject(Firestore);

  constructor() { }

  async AddPlan(plan: Plan): Promise<DocumentReference<Plan> | null> {
    try {
      const planRef: CollectionReference<Plan> = collection(this.firestore, 'Plan') as CollectionReference<Plan>;
      return await addDoc(planRef, plan);
    } catch (error) {
      console.error('Error al agregar plan:', error);
      return null;
    }
  }

  GetPlanes(): Observable<Plan[]> {
    const planRef = collection(this.firestore, 'Plan');
    const planesActivosQuery = query(planRef, where('Activo', '==', true));
    return collectionData(planesActivosQuery, { idField: 'id' }) as Observable<Plan[]>;
  }

  GetPlanById(id: string): Observable<Plan | undefined> {
    const planDoc = doc(this.firestore, `Plan/${id}`);
    return docData(planDoc, { idField: 'id' }) as Observable<Plan | undefined>;
  }

  async UpdatePlan(plan: Plan): Promise<boolean> {
    if (!plan.id) {
      console.error('Error: El ID del plan es obligatorio para actualizar.');
      return false;
    }

    const planDocRef = doc(this.firestore, `Plan/${plan.id}`);
    const updateData: Partial<Plan> = Object.fromEntries(
      Object.entries(plan).filter(([_, value]) => value !== null && value !== '')
    );

    try {
      await updateDoc(planDocRef, updateData);
      return true;
    } catch (error) {
      console.error('Error al actualizar plan:', error);
      return false;
    }
  }

  async deletePlan(id: string): Promise<boolean> {
    if (!id) {
      console.error('Error: El ID del plan es obligatorio para desactivarlo.');
      return false;
    }
  
    const planDocRef = doc(this.firestore, `Plan/${id}`);
    const docSnapshot = await getDoc(planDocRef);
    if (!docSnapshot.exists()) {
      console.error(`El documento con ID ${id} no existe.`);
      return false;
    }
  
    try {
      await updateDoc(planDocRef, { Activo: false });
      return true;
    } catch (error) {
      console.error('Error al desactivar plan:', error);
      return false;
    }
  }
}
