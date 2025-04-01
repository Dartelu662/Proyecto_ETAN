import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, updatePassword, deleteUser, signInWithEmailAndPassword, User, signOut } from '@angular/fire/auth';
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
    constructor(private _Auth: Auth, private usuarioService: UsuarioService, private adminService:AdminService){}

    registrer(_auth: AUTH){
        return createUserWithEmailAndPassword(this._Auth, _auth.Email, _auth.Password);
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
