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

  

  async DisableUsuario(id: string): Promise<boolean> {
    if (!id) {
      console.error('Error: El ID del usuario es obligatorio para desactivarlo.');
      return false;
    }
  
    const usuarioDocRef = doc(this._firestore, `Usuarios/${id}`);
  
    // Verificar que el documento exista
    const docSnapshot = await getDoc(usuarioDocRef);
    if (!docSnapshot.exists()) {
      console.error(`El documento con ID ${id} no existe.`);
      return false;
    }
    console.log('Documento antes de la actualización:', docSnapshot.data());
  
    try {
      console.log(`Intentando actualizar el campo 'Activo' a false para el documento con ID ${id}`);
      await updateDoc(usuarioDocRef, { Activo: false });
      console.log(`Usuario con ID ${id} ha sido desactivado.`);
      return true;
    } catch (error) {
      console.error('Error al desactivar usuario:', error);
      return false;
    }
  }

  async UpdateUsuario(usuario: Usuario): Promise<boolean> {
    if (!usuario.id) {
      console.error('Error: El ID del usuario es obligatorio para actualizar.');
      return false;
    }

    const usuarioDocRef = doc(this._firestore, `Usuarios/${usuario.id}`);

    const updateData: Partial<Usuario> = Object.fromEntries(
      Object.entries(usuario).filter(([_, value]) => value !== null && value !== '')
    );

    try {
      await updateDoc(usuarioDocRef, updateData);
      return true;
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      return false;
    }
  }

  async getUsuarioByUserName(userName: string): Promise<Usuario | null> {
    const usuarioRef = collection(this._firestore, 'Usuarios');
    const q = query(usuarioRef, where('UserName', '==', userName));
    const querySnapshot = await getDocs(q);
    const usuarioDoc = querySnapshot.docs[0]
    const usuarioData: Usuario = {
      ...usuarioDoc.data() as Usuario,
      id: usuarioDoc.id
    };
    if (!querySnapshot.empty) {
      return usuarioData;
      
    } else {
      return null;
    }
  }

  async getUsuarioByEMail(email: string): Promise<Usuario | null> {
    const usuarioRef = collection(this._firestore, 'Usuarios');
    const q = query(usuarioRef, where('Email', '==', email));
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
