import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import AUTH from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
    constructor(private _Auth: Auth){}
    registrer(_auth: AUTH){
        return createUserWithEmailAndPassword(this._Auth, _auth.Email, _auth.Password);
    }
}
