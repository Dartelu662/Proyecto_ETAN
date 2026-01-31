import { Injectable } from '@angular/core';
import { Firestore,  collectionData, doc, deleteDoc, query, where, getDocs, updateDoc, getDoc } from '@angular/fire/firestore';
import Usuario from '../interfaces/usuario.interface';
import { Observable } from 'rxjs';
import { addDoc, collection } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  GetUsuarioById: any;
  auth: { Email?: string; Password?: string } = {}; // Add this property

  constructor(private _firestore:Firestore) { }

  async AddUsuario(usuario: Usuario) {
    const UsuarioRef = collection(this._firestore, 'Usuarios');
    const existingUser = await this.getUsuarioByUserName(usuario.UserName);
    if (existingUser) {
      throw new Error('Usuario ya existente');
    }
    // Verificar si el correo ya existe
    const existingEmail = await this.getUsuarioByEMail(usuario.Email);
    if (existingEmail) {
      throw new Error('Correo ya registrado');
    }
    return await addDoc(UsuarioRef, usuario);
  }

  GetUsuarios(): Observable<Usuario[]> {
    const usuarioRef = query(collection(this._firestore, 'Usuarios'), where('Activo', '==', true));
    return collectionData(usuarioRef, { idField: 'id' }) as Observable<Usuario[]>;
  }

  async deleteUsuario(userName: string): Promise<void | null> {
    const usuarioRef = collection(this._firestore, 'Usuarios');
    const q = query(usuarioRef, where('UserName', '==', userName));
    const querySnapshot = await getDocs(q);
  
    if (!querySnapshot.empty) {
      const usuarioDoc = querySnapshot.docs[0];
      const usuarioId = usuarioDoc.id;
  
      const userRef = doc(this._firestore, 'Usuarios', usuarioId); // Corregido aquí
      await deleteDoc(userRef);
    } else {
      return null;
    }
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
  
    if (!querySnapshot.empty) {
      const usuarioDoc = querySnapshot.docs[0];
      const usuarioData: Usuario = {
        ...usuarioDoc.data() as Usuario,
        id: usuarioDoc.id
      };
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
      const usuarioDoc = querySnapshot.docs[0];
      const usuarioData: Usuario = {
        ...usuarioDoc.data() as Usuario,
        id: usuarioDoc.id
      };
      return usuarioData;
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

  // Busca usuarios por nombre parcial (o por UserName si no hay coincidencias por nombre)
  async buscarUsuariosPorNombre(parcial: string): Promise<Usuario[]> {
    const resultados: Usuario[] = [];
    try {
      const usuariosRef = collection(this._firestore, 'Usuarios');
      // Busqueda por Nombres (rango para "starts with")
      const q = query(usuariosRef, where('Nombres', '>=', parcial), where('Nombres', '<=', parcial + '\uf8ff'));
      const snapshot = await getDocs(q);
      snapshot.forEach(doc => {
        const data = doc.data() as Usuario;
        data.id = doc.id;
        resultados.push(data);
      });

      // Si no hubo resultados por Nombres, intentamos por UserName
      if (resultados.length === 0) {
        const q2 = query(usuariosRef, where('UserName', '>=', parcial), where('UserName', '<=', parcial + '\uf8ff'));
        const snap2 = await getDocs(q2);
        snap2.forEach(doc => {
          const data = doc.data() as Usuario;
          data.id = doc.id;
          resultados.push(data);
        });
      }

      console.log('buscarUsuariosPorNombre -> parcial:', parcial, 'resultados:', resultados.length);
      return resultados;
    } catch (error) {
      console.error('Error en buscarUsuariosPorNombre:', error);
      return [];
    }
  }
}
