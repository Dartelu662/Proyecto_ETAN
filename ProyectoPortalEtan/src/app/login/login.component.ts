import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service'; // Ajusta la ruta si es necesario
import AUTH from '../interfaces/auth.interface';
import { UsuarioService } from '../services/usuario.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  auth: AUTH = {
      Email: '',
      Password: ''
  }

  @ViewChild('username') username!: ElementRef;
  @ViewChild('password') password!: ElementRef;
  @ViewChild('imgVisible') imgVisible!: ElementRef;

  constructor(
    private router: Router,
    private authService: AuthentificationService,
    private usuarioService:UsuarioService
  ) {}

  togglePassword() {
    const img = this.imgVisible.nativeElement;
    const pass = this.password.nativeElement;
  
    if (img.getAttribute('xlink:href') === '#icon-eye') {
      pass.type = 'text';
      img.setAttribute('xlink:href', '#icon-eye-slash');
    } else {
      pass.type = 'password';
      img.setAttribute('xlink:href', '#icon-eye');
    }
  }

  submitForm(event: Event) {
    event.preventDefault();
    
    this.auth.Email = this.username.nativeElement.value;
    this.auth.Password = this.password.nativeElement.value;
  
    if (this.auth.Email && this.auth.Password) {
      this.authService.login(this.auth)
            .then(credential => {
              console.log('Inicio de sesión exitoso:', credential);
              this.usuarioService.getUsuarioByEMail(this.auth.Email)
              .then(user => {
                if(user !== null){
                  const role = user.TipoUsuario;
                  if (role === 'Alumno') {
                  this.router.navigate(['/alumno']);
                  console.log('Alumno');
                  } else if (role === 'Admin-1') {
                  this.router.navigate(['/admin-1']);
                  console.log('Admin-1');
                  } else if (role === 'Admin-2') {
                  this.router.navigate(['/admin-2']);
                  console.log('Admin-2');
                  } else {
                    alert('Error al iniciar sesión');
                    this.router.navigate(['/login']);
                  }
                }
              })
              .catch(error => {
                alert('Error al iniciar sesión');
              });
            })
            .catch(error => {
              alert('Error al iniciar sesión');
            });
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }
}
