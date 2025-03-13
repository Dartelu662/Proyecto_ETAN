import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

@Component({
  selector: 'app-capturas-administrativos-admin-1',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './capturas-administrativos-admin-1.component.html',
  styleUrl: './capturas-administrativos-admin-1.component.scss'
})
export class CapturasAdministrativosAdmin1Component{
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
    console.log('Administrativo guardado:', this.admin);
  }
}
