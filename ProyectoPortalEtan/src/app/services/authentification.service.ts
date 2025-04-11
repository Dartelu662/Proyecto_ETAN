import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, updatePassword, deleteUser, signInWithEmailAndPassword, User, signOut, reauthenticateWithCredential, EmailAuthProvider } from '@angular/fire/auth';
import AUTH from '../interfaces/auth.interface';
import { UsuarioService } from './usuario.service';
import { throwError } from 'rxjs';
import { AdminService } from './admin.service';
import { error } from 'console';
import Usuario from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
    private authActual = inject(Auth);
    constructor(private _Auth: Auth, private usuarioService: UsuarioService){}

    async registrer(_auth: AUTH): Promise<boolean>{
      const currentUser = this._Auth.currentUser;

      if (!currentUser || !currentUser.email) {
        alert('No hay una sesión activa de administrador.');
        return false;
      }

      const adminPassword = prompt('Para continuar, introduce tu contraseña');

      if (!adminPassword) {
        alert('Se requiere la contraseña para continuar.');
        return false;
      }

      try {
        // Validamos la contraseña del admin
        const credential = EmailAuthProvider.credential(currentUser.email, adminPassword);
        await reauthenticateWithCredential(currentUser, credential);

        // Si la reautenticación fue exitosa, se crea el usuario nuevo
        await createUserWithEmailAndPassword(this._Auth, _auth.Email, _auth.Password);

        // 🔥 Pero ahora el auth actual es el nuevo usuario, así que volvemos a loguear al admin
        await signInWithEmailAndPassword(this._Auth, currentUser.email, adminPassword);

        alert('Usuario creado correctamente y sesión de administrador restaurada.');
        return true
      } catch (error) {
        console.error('Error durante la reautenticación o creación del usuario:', error);
        alert('Error: contraseña incorrecta o no se pudo crear el usuario.');
        return false
      }
    }

    logout(): Promise<void> {
      return signOut(this.authActual);  // Cierra la sesión de Firebase
    }

    async retornarUsuarioActual(): Promise<Usuario | null> {
  if (this.authActual && this.authActual.currentUser && this.authActual.currentUser.email) {
    try {
      const value = await this.usuarioService.getUsuarioByEMail(this.authActual.currentUser.email);
      return value;
    } catch (error) {
      return null;
    }
  }
  return null;
}

    async updatePassword(newPassword: string): Promise<void> {
      const user = this._Auth.currentUser;
      if (user) {
        return updatePassword(user, newPassword);
      } else {
        throw new Error('No hay usuario autenticado.');
      }
    }
  
    async deleteUser(): Promise<void> {
      const user = this._Auth.currentUser;
      if (user) {
        return deleteUser(user);
      } else {
        throw new Error('No hay usuario autenticado.');
      }
    }
  
    async login(_auth: AUTH) {
      return signInWithEmailAndPassword(this._Auth, _auth.Email, _auth.Password);
    }

    async getUserRole(userName: string): Promise<string | null> {
      try {
        const usuario = await this.usuarioService.getUsuarioByUserName(userName);
        
        if (!usuario) return null;
    
        if (usuario.TipoUsuario.toLowerCase() === "alumno") return "Alumno";
        if (usuario.TipoUsuario.toLowerCase() === "Alumno") return "Alumno";
    
        if (usuario.TipoUsuario.toLowerCase() === "admin-1") return "Admin-1";
        if (usuario.TipoUsuario.toLowerCase() === "Admin-1") return "Admin-1";
    
        if (usuario.TipoUsuario.toLowerCase() === "admin-2") return "Admin-2";
        if (usuario.TipoUsuario.toLowerCase() === "Admin-2") return "Admin-2";
    
        return null;
      } catch (error) {
        console.error("Error al obtener el rol del usuario:", error);
        return null;
      }
    }

}
