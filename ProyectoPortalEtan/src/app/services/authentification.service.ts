// import { Injectable } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import Auth from '../interfaces/auth.interface';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthentificationService {

//   constructor(private afAuth: AngularFireAuth) { }

//   // Método para registrar un nuevo usuario
//   async register(_auth: Auth): Promise<any> {
//     try {
//       const userCredential = await this.afAuth.createUserWithEmailAndPassword(_auth.Email, _auth.Password);
//       return userCredential
//     } catch (error) {
//       console.error('Error en el registro:', error);
//       throw new Error('Error en el registro');
//     }
//   }
// }
