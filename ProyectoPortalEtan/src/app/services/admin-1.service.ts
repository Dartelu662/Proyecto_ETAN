import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import Usuario from '../interfaces/usuario.interface';
import Admin from '../interfaces/admin.interface';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class Admin1Service {

  private firestore = inject(Firestore); // Usa inyección correcta

  constructor(private usuarioService: UsuarioService) { }

  async AddAdmin(admin: Admin, usuario: Usuario) {
    // 1️⃣ Verificar si el usuario ya existe
    let usuarioCreado = await this.usuarioService.getUsuarioByUserName(usuario.UserName);
    debugger;
    if (!usuarioCreado) {
      // 2️⃣ Crear el usuario si no existe
      await this.usuarioService.AddUsuario(usuario);

      // 3️⃣ Obtener el usuario recién creado
      usuarioCreado = await this.usuarioService.getUsuarioByUserName(usuario.UserName);

      if (!usuarioCreado) {
        throw new Error('Error al crear el usuario.');
      }
    } else {
    throw new Error('Usuario ya existente');
    }

    // 4️⃣ Asignar el ID del usuario al admin
    admin.Username = usuarioCreado.UserName; // Asegúrate de que el campo sea correcto

    // 5️⃣ Guardar el admin en Firestore
    const AdminRef = collection(this.firestore, 'Admin');
    return await addDoc(AdminRef, admin);
  }
}
