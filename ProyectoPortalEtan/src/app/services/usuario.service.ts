import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, query, where, getDocs, updateDoc, getDoc } from '@angular/fire/firestore';
import Usuario from '../interfaces/usuario.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private _firestore:Firestore) { }

  async AddUsuario(usuario:Usuario) {
    const UsuarioRef = collection(this._firestore, 'Usuarios');
    const existingUser = await this.getUsuarioByUserName(usuario.UserName)
  if (existingUser) {
    throw new Error('Usuario ya existente');
  }
  return await addDoc(UsuarioRef, usuario);
  }

  GetUsuarios(): Observable<Usuario[]> {
    const usuarioRef = query(collection(this._firestore, 'Usuarios'), where('Activo', '==', true));
    return collectionData(usuarioRef, { idField: 'id' }) as Observable<Usuario[]>;
  }

  

  async DisableUsuario(id: string): Promise<void> {
    const usuarioDocRef = doc(this._firestore, `Usuarios/${id}`);
    await updateDoc(usuarioDocRef, { Activo: false });
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

  async getUsuarioById(id: string): Promise<Usuario | null> {
    const usuarioDoc = doc(this._firestore, 'Usuarios', id);
    const snapshot = await getDoc(usuarioDoc);

    if (!snapshot.exists()) {
      return null;
    }

    const data = snapshot.data();
    if (!data) {
      return null;
    }

    // 🔹 Retornar el objeto con el ID incluido
    return { id: snapshot.id, ...data } as Usuario;
  }
}
