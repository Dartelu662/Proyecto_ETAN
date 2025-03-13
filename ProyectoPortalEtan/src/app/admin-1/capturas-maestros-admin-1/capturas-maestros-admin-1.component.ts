import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

@Component({
  selector: 'app-capturas-maestros-admin-1',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './capturas-maestros-admin-1.component.html',
  styleUrl: './capturas-maestros-admin-1.component.scss'
})
export class CapturasMaestrosAdmin1Component {
  admin = {
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
      console.log('Maestro / Instructor guardado:', this.admin);
    }
  }


