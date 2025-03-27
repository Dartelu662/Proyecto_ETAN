import plan from '../interfaces/plan.interface';
import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private firestore: Firestore ) { }

  async AddPlan(plan: plan) {
    const PlanRef = collection(this.firestore, 'Plan');
    return await addDoc(PlanRef, plan);
  }
  async UpdatePlan(plan: plan ) {
    
  }
  async deletePlan(plan: plan) {
    
  }
}
