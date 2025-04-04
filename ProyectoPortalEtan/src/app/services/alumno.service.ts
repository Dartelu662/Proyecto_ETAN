import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, doc, getDoc, getDocs, updateDoc, query, where } from '@angular/fire/firestore';
import Usuario from '../interfaces/usuario.interface';
import Alumno from '../interfaces/alumno.interface';
import { UsuarioService } from './usuario.service';
import { Observable, combineLatest, map } from 'rxjs';
import { collectionData } from 'rxfire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private firestore = inject(Firestore); // Usa inyección correcta
  
  constructor(private usuarioService: UsuarioService) { }

  async AddAlumno(alumno: Alumno, usuario: Usuario) {
    
    let usuarioCreado = await this.usuarioService.getUsuarioByUserName(usuario.UserName);
    if (!usuarioCreado) {
      
      await this.usuarioService.AddUsuario(usuario);
    } else {
    throw new Error('Usuario ya existente');
    }

    alumno.Username = usuario.UserName;
    
    const AlumnoRef = collection(this.firestore, 'Alumno');
    return await addDoc(AlumnoRef, alumno);
  }
  
  GetAlumnos(): Observable<{ usuario: Usuario; alumno: Alumno }[]> {
      const alumnosRef = query(collection(this.firestore, 'Alumno'));
  
      const alumnos$ = collectionData(alumnosRef, { idField: 'id' }) as Observable<Alumno[]>;
  
      return combineLatest([alumnos$, this.usuarioService.GetUsuarios()]).pipe(
        map(([alumnos, usuarios]) => {
          return alumnos
            .map(alumno => {
              const usuario = usuarios.find(user => user.UserName === alumno.Username);
              return usuario ? { usuario, alumno } : null;
            })
            .filter((item): item is { usuario: Usuario; alumno: Alumno } => item !== null);
        })
      );
    }
  
    async GetAlumnoById(id: string): Promise<{ usuario: Usuario; alumno: Alumno } | null> {
      const alumnoDoc = doc(this.firestore, 'Alumno', id);
      const snapshot = await getDoc(alumnoDoc);
  
      if (!snapshot.exists()) {
        return null;
      }
      
      const alumnoData = snapshot.data() as Alumno;
      if (!alumnoData.Username) {
        throw new Error('El alumno no tiene un nombre de usuario válido.');
      }
  
      const usuario = await this.usuarioService.getUsuarioByUserName(alumnoData.Username);
  
      return usuario ? { usuario, alumno: alumnoData } : null;
    }
  
    async GetAlumnoByUsername(username: string): Promise<{ usuario: Usuario; alumno: Alumno } | null> {
      const q = query(collection(this.firestore, 'Alumno'), where('Username', '==', username));
      const querySnapshot = await getDocs(q);
    
      if (querySnapshot.empty) {
        return null;
      }
      
      const alumnoDoc = querySnapshot.docs[0];
      const alumnoData = alumnoDoc.data() as Alumno;
    
      const usuario = await this.usuarioService.getUsuarioByUserName(username);
    
      return usuario ? { usuario, alumno: alumnoData } : null;
    }

    async disableAlumno(userName: string): Promise<void> {
      // 1. Obtener el usuario por UserName
      const usuario = await this.usuarioService.getUsuarioByUserName(userName);
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }
    
      // 2. Deshabilitar el usuario actualizando el campo Activo a false
      await this.usuarioService.DisableUsuario(usuario.id!);
    }

    async UpdateAlumno(alumno: Alumno, usuario: Usuario): Promise<boolean> {
        if (!alumno.id) {
          console.error('Error: El ID del Alumno es obligatorio para actualizar.');
          return false;
        }
    
        const alumnoDocRef = doc(this.firestore, `Alumno/${alumno.id}`);
    
        const updateData: Partial<Alumno> = Object.fromEntries(
          Object.entries(alumno).filter(([_, value]) => value !== null && value !== '')
        );
    
        try {
          await updateDoc(alumnoDocRef, updateData);
          await this.usuarioService.UpdateUsuario(usuario);
          
          return true;
        } catch (error) {
          console.error('Error al actualizar alumno:', error);
          return false;
        }
      }
      
}
