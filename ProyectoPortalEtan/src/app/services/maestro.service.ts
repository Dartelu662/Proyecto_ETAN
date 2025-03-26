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
  
  constructor(private usuarioservice: UsuarioService) { }

  async AddMaestro(maestro: Maestro, usuario: Usuario) {
    // 1️⃣ Verificar si el usuario ya existe
    
    let usuarioCreado = await this.usuarioservice.getUsuarioByUserName(usuario.UserName);
    if (!usuarioCreado) {
      
      // 2️⃣ Crear el usuario si no existe
      await this.usuarioservice.AddUsu
      ario(usuario);
    } else {
    throw new Error('Usuario ya existente');
    }


    // 5️⃣ Guardar el maestro en Firestore
    const MaestroRef = collection(this.firestore, 'Maestro');
    return await addDoc(MaestroRef, maestro);
  }
}
