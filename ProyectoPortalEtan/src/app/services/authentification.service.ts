import { Injectable } from '@angular/core';
import {
  Auth,
  EmailAuthProvider,
  createUserWithEmailAndPassword,
  deleteUser,
  fetchSignInMethodsForEmail,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  UserCredential
} from '@angular/fire/auth';

import AUTH from '../interfaces/auth.interface';
import Usuario from '../interfaces/usuario.interface';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  /* ============================
     CONSTRUCTOR
  ============================ */

  constructor(
    private auth: Auth,
    private usuarioService: UsuarioService
  ) {}

  /* ============================
     LOGIN
  ============================ */

  login(credentials: AUTH): Promise<UserCredential> {
    return signInWithEmailAndPassword(
      this.auth,
      credentials.Email,
      credentials.Password
    );
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }

  /* ============================
     REGISTRO (ADMIN CREA USUARIO)
  ============================ */

  async register(credentials: AUTH): Promise<boolean> {
    const currentUser = this.auth.currentUser;

    if (!currentUser?.email) {
      alert('No hay una sesión activa de administrador.');
      return false;
    }

    const adminPassword = prompt('Para continuar, introduce tu contraseña');

    if (!adminPassword) {
      alert('Se requiere la contraseña para continuar.');
      return false;
    }

    try {
      await this.reauthenticateAdmin(currentUser.email, adminPassword);

      await createUserWithEmailAndPassword(
        this.auth,
        credentials.Email,
        credentials.Password
      );

      // Restaurar sesión del admin
      await signInWithEmailAndPassword(
        this.auth,
        currentUser.email,
        adminPassword
      );

      return true;

    } catch (error) {
      console.error('Error al crear usuario:', error);
      return false;
    }
  }

  /* ============================
     RECUPERAR CONTRASEÑA
  ============================ */

  recuperarPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(this.auth, email);
  }

  /* ============================
     VERIFICAR SI EMAIL EXISTE
  ============================ */

  async existeEmail(email: string): Promise<boolean> {
    const methods = await fetchSignInMethodsForEmail(this.auth, email);
    return methods.length > 0;
  }

  /* ============================
     USUARIO ACTUAL
  ============================ */

  async retornarUsuarioActual(): Promise<Usuario | null> {
    const currentEmail = this.auth.currentUser?.email;
    if (!currentEmail) return null;

    try {
      return await this.usuarioService.getUsuarioByEMail(currentEmail);
    } catch {
      return null;
    }
  }

  /* ============================
     ACTUALIZAR CONTRASEÑA
  ============================ */

  async actualizarPassword(newPassword: string): Promise<void> {
    const user = this.auth.currentUser;

    if (!user) {
      throw new Error('No hay usuario autenticado.');
    }

    return updatePassword(user, newPassword);
  }

  /* ============================
     ELIMINAR USUARIO
  ============================ */

  async eliminarUsuarioActual(): Promise<void> {
    const user = this.auth.currentUser;

    if (!user) {
      throw new Error('No hay usuario autenticado.');
    }

    return deleteUser(user);
  }

  /* ============================
     OBTENER ROL
  ============================ */

  async getUserRole(userName: string): Promise<string | null> {
    try {
      const usuario = await this.usuarioService.getUsuarioByUserName(userName);
      if (!usuario) return null;

      return this.normalizeRole(usuario.TipoUsuario);

    } catch (error) {
      console.error('Error al obtener el rol:', error);
      return null;
    }
  }

  /* ============================
     MÉTODOS PRIVADOS
  ============================ */

  private async reauthenticateAdmin(email: string, password: string): Promise<void> {
    const currentUser = this.auth.currentUser;
    if (!currentUser) throw new Error('No hay usuario autenticado.');

    const credential = EmailAuthProvider.credential(email, password);
    await reauthenticateWithCredential(currentUser, credential);
  }

  private normalizeRole(role: string): string | null {
    const rolesMap: Record<string, string> = {
      'alumno': 'Alumno',
      'admin-1': 'Admin-1',
      'admin-2': 'Admin-2'
    };

    return rolesMap[role.toLowerCase()] ?? null;
  }
}
