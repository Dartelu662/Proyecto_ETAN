import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, updatePassword, deleteUser, signInWithEmailAndPassword, User } from '@angular/fire/auth';
import AUTH from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
    constructor(private _Auth: Auth){}

    registrer(_auth: AUTH){
        return createUserWithEmailAndPassword(this._Auth, _auth.Email, _auth.Password);
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

}
