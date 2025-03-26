import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import Usuario from '../interfaces/usuario.interface';
import Maestro from '../interfaces/maestro.interface';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class MaestroService {

  private firestore = inject(Firestore); // Usa inyección correcta
  
  constructor() { }

  async AddMaestro(maestro: Maestro) {
    const MaestroRef = collection(this.firestore, 'Maestro');
    return await addDoc(MaestroRef, maestro);
  }
}
