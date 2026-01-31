import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service'; // Ajusta la ruta si es necesario
import AUTH from '../interfaces/auth.interface';
import Usuario from '../interfaces/usuario.interface';
import { UsuarioService } from '../services/usuario.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule], // <-- añadí CommonModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  auth: AUTH = {
      Email: '',
      Password: ''
  }

  @ViewChild('username', { static: false }) username!: ElementRef<HTMLInputElement>;
  @ViewChild('password') password!: ElementRef;
  @ViewChild('imgVisible') imgVisible!: ElementRef;

  usuariosSugeridos: Usuario[] = []; // lista de sugerencias

  ngOnInit(): void {
    // Implement initialization logic here if needed.
  }

  constructor(
    private router: Router,
    private authService: AuthentificationService,
    private usuarioService: UsuarioService
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

              // LIMPIAR credenciales en el servicio para que no se propaguen a otros componentes
              if (typeof (this.authService as any).clearCredentials === 'function') {
                (this.authService as any).clearCredentials();
              }

              // Limpiar inputs de UI
              try { this.username.nativeElement.value = ''; } catch {}
              try { this.password.nativeElement.value = ''; } catch {}

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

  /**
   * Busca usuarios por nombre parcial. Llama al servicio si existe el método.
   * Usamos as any para evitar error de compilación si aún no implementaste el método en el servicio.
   */
  async buscarUsuariosPorNombre(parcial: string): Promise<void> {
    try {
      if (!parcial || !parcial.trim()) {
        this.usuariosSugeridos = [];
        return;
      }
      console.log('buscarUsuariosPorNombre ->', parcial);
      const svc = (this.usuarioService as any);
      if (typeof svc.buscarUsuariosPorNombre === 'function') {
        this.usuariosSugeridos = await svc.buscarUsuariosPorNombre(parcial);
        console.log('usuarios sugeridos:', this.usuariosSugeridos);
      } else {
        console.warn('UsuarioService.buscarUsuariosPorNombre no implementado aún');
        this.usuariosSugeridos = [];
      }
    } catch (error) {
      console.error('Error en buscarUsuariosPorNombre:', error);
      this.usuariosSugeridos = [];
    }
  }

  seleccionarUsuario(u: Usuario): void {
    console.log('Usuario seleccionado:', u);
    if (this.username && this.username.nativeElement) {
      this.username.nativeElement.value = u.UserName || '';
    }
    this.usuariosSugeridos = [];
  }
}
