import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

@Component({
  selector: 'app-capturas-alumnos-admin-1',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule
  ], 
  templateUrl: './capturas-alumnos-admin-1.component.html',
  styleUrls: ['./capturas-alumnos-admin-1.component.scss']
})
export class CapturasAlumnosAdmin1Component {
  alumno = {
    usuario: {
      UserName: '',
      Nombres: '',
      ApellidoP: '',
      ApellidoM: '',
      Email: '',
      Celular: '',
      Direccion: '',
      FechaNac: '',
      FechaIngreso: '',
      Password: ''
    },
    Matricula: '',
    PermisoFormacion: '',
    FechaFinPF: '',
    Activo: true
  };

     // Define el método onSubmit aquí
  onSubmit() {
    // Lógica para manejar el formulario cuando se envíe
    console.log('Alumno guardado:', this.alumno);
  }
  }

