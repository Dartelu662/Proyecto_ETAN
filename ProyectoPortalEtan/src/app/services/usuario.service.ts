import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, query, where, getDocs } from '@angular/fire/firestore';
import Usuario from '../interfaces/usuario.interface';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import AUTH from '../interfaces/auth.interface';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private _firestore:Firestore, private _authService: AuthentificationService) { }

  async AddUsuario(usuario:Usuario, _auth: AUTH) {
    const UsuarioRef = collection(this._firestore, 'Usuarios');
    const existingUser = await this.getUsuarioByUserName(usuario.UserName)
  if (existingUser) {
    throw new Error('Usuario ya existente');
  }
  this._authService.registrer(_auth)
  return await addDoc(UsuarioRef, usuario);
  }

  getUsuarios(): Observable<Usuario[]> {
    const usuarioRef = collection(this._firestore, 'Usuarios');
    return collectionData(usuarioRef, { idField: 'id' }) as Observable<Usuario[]>;
  }

  deleteUsuario(id: string) {
    const usuarioDocRef = doc(this._firestore, `Usuarios/${id}`);
    return deleteDoc(usuarioDocRef);
  }

  async getUsuarioByUserName(userName: string): Promise<Usuario | null> {
    const usuarioRef = collection(this._firestore, 'Usuarios');
    const q = query(usuarioRef, where('UserName', '==', userName));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data() as Usuario;
    } else {
      return null;
    }
  }
}
