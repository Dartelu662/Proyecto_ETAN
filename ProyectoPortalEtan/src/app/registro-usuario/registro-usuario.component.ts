import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router'; // <-- agrega este import

import { UsuarioService } from '../services/usuario.service';
import { AlumnoService } from '../services/alumno.service'; // <-- agrega este import
import Usuario from '../interfaces/usuario.interface';

@Component({
  selector: 'app-registro-usuario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {
  usuario: Usuario = {
    UserName: '',
    Email: '',
    Password: '',
    Activo: true,
    TipoUsuario: 'Alumno', // Ajusta el valor por defecto según tu lógica
    Nombres: '',
    ApellidoP: '',
    ApellidoM: '',
    Celular: '',
    FechaNac: '', // Usa el formato adecuado si es Date
    FechaIngreso: '',
    Direccion: '',
    // agrega otros campos si tu interfaz los requiere
  };
  mensaje: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private auth: Auth,
    private alumnoService: AlumnoService, // <-- agrega aquí la inyección
    private router: Router // <-- agrega aquí la inyección
  ) {}

  ngOnInit(): void {
    // Aquí puedes inicializar datos si es necesario
  }

  async registrar() {
    this.mensaje = '';
    // Validación básica
    if (!this.usuario.UserName || !this.usuario.Email || !this.usuario.Password) {
      this.mensaje = 'Completa todos los campos.';
      return;
    }
    // Validar formato de correo
    if (!/\S+@\S+\.\S+/.test(this.usuario.Email)) {
      this.mensaje = 'Correo inválido.';
      return;
    }
    // Validar correo único
    const existe = await this.usuarioService.getUsuarioByEMail(this.usuario.Email);
    if (existe) {
      this.mensaje = 'El correo ya está registrado.';
      return;
    }
    // Validar usuario único
    const existeUser = await this.usuarioService.getUsuarioByUserName(this.usuario.UserName);
    if (existeUser) {
      this.mensaje = 'El usuario ya existe.';
      return;
    }
    // Registrar usuario
    try {
      // 1. Crear usuario en Authentication
      await createUserWithEmailAndPassword(this.auth, this.usuario.Email, this.usuario.Password);

      // 2. Guardar usuario en Firestore
      await this.usuarioService.AddUsuario(this.usuario);

      // 3. Guardar alumno
      await this.guardarAlumno(this.usuario);

      this.mensaje = 'Usuario registrado exitosamente.';
    } catch (error: any) {
      this.mensaje = error.message || 'Error al registrar usuario.';
      console.error('Error en registro:', error);
    }
  }

  async guardarAlumno(usuario: Usuario) {
    const alumno = {
      Username: usuario.UserName,
      PermisoFormacion: '',
      FechaFinPF: ''
    };
    console.log('Intentando guardar alumno:', alumno, usuario);
    try {
      const res = await this.alumnoService.AddAlumno(alumno, usuario);
      console.log('Alumno guardado correctamente:', res);
    } catch (error) {
      console.error('Error al guardar alumno:', error);
    }
  }

  volverLogin() {
    this.router.navigate(['/login']);
  }
}


