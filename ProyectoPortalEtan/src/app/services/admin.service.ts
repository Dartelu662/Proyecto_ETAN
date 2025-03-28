import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, doc, getDoc, getDocs, updateDoc, query, where } from '@angular/fire/firestore';
import Usuario from '../interfaces/usuario.interface';
import Admin from '../interfaces/admin.interface';
import { UsuarioService } from './usuario.service';
import { Observable, combineLatest, map } from 'rxjs';
import { collectionData } from 'rxfire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private firestore = inject(Firestore); // Usa inyección correcta

  constructor(private usuarioService: UsuarioService) { }

  async AddAdmin(admin: Admin, usuario: Usuario) {
    // 1️⃣ Verificar si el usuario ya existe
    let usuarioCreado = await this.usuarioService.getUsuarioByUserName(usuario.UserName);
    if (!usuarioCreado) {
      // 2️⃣ Crear el usuario si no existe
      await this.usuarioService.AddUsuario(usuario);
    } else {
    throw new Error('Usuario ya existente');
    }

    // 4️⃣ Asignar el ID del usuario al admin
    admin.Username = usuario.UserName; // Asegúrate de que el campo sea correcto

    // 5️⃣ Guardar el admin en Firestore
    const AdminRef = collection(this.firestore, 'Admin');
    return await addDoc(AdminRef, admin);
  }

  GetAdmins(): Observable<{ usuario: Usuario; admin: Admin }[]> {
    const adminsRef = query(collection(this.firestore, 'Admin'));

    const admins$ = collectionData(adminsRef, { idField: 'id' }) as Observable<Admin[]>;

    return combineLatest([admins$, this.usuarioService.GetUsuarios()]).pipe(
      map(([admins, usuarios]) => {
        return admins
          .map(admin => {
            const usuario = usuarios.find(user => user.UserName === admin.Username);
            return usuario ? { usuario, admin } : null;
          })
          .filter((item): item is { usuario: Usuario; admin: Admin } => item !== null);
      })
    );
  }

  async GetAdminById(id: string): Promise<{ usuario: Usuario; admin: Admin } | null> {
    const adminDoc = doc(this.firestore, 'Admin', id);
    const snapshot = await getDoc(adminDoc);

    if (!snapshot.exists()) {
      return null;
    }
    
    const adminData = snapshot.data() as Admin;
    if (!adminData.Username) {
      throw new Error('El admin no tiene un nombre de usuario válido.');
    }

    const usuario = await this.usuarioService.getUsuarioByUserName(adminData.Username);

    return usuario ? { usuario, admin: adminData } : null;
  }

  async DisableAdmin(id: string): Promise<void> {
    const adminDocRef = doc(this.firestore, `Admin/${id}`);
    await updateDoc(adminDocRef, { Activo: false });

    const adminData = await this.GetAdminById(id);
    if (adminData && adminData.usuario.id) {
      await this.usuarioService.DisableUsuario(adminData.usuario.id);
    }
  }
}
