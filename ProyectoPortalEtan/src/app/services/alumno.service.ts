import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import Usuario from '../interfaces/usuario.interface';
import Alumno from '../interfaces/alumno.interface';
import { UsuarioService } from './usuario.service';
import AUTH from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private firestore = inject(Firestore); // Usa inyección correcta
  
  constructor(private usuarioservice: UsuarioService) { }

  async AddAlumno(alumno: Alumno, usuario: Usuario, auth: AUTH) {
    // 1️⃣ Verificar si el usuario ya existe
    
    let usuarioCreado = await this.usuarioservice.getUsuarioByUserName(usuario.UserName);
    if (!usuarioCreado) {
      
      // 2️⃣ Crear el usuario si no existe
      await this.usuarioservice.AddUsuario(usuario, auth);
    } else {
    throw new Error('Usuario ya existente');
    }

    // 4️⃣ Asignar el ID del usuario al Alumno
    alumno.Username = usuario.UserName; // Asegúrate de que el campo sea correcto

    // 5️⃣ Guardar el alumno en Firestore
    const AlumnoRef = collection(this.firestore, 'Alumno');
    return await addDoc(AlumnoRef, alumno);
  }
}
