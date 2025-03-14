import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Usuario {
  UserName: string;
  Nombres: string;
  ApellidoP: string;
  ApellidoM: string;
  Email: string;
  Celular: string;
  Direccion: string;
  FechaNac: string;
  FechaIngreso: string;
  Password: string;
}

interface Licencia {
  TipoLicenciasId: NonNullable<number>;
  FechaFin: string;
}

@Component({
  selector: 'app-capturas-maestros-admin-1',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './capturas-maestros-admin-1.component.html',
  styleUrl: './capturas-maestros-admin-1.component.scss'
})
export class CapturasMaestrosAdmin1Component {
  admin = {
    usuario: <Usuario>{
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
    licencias: [] as Licencia[] // <--- Se inicializa como un array vacío con tipado correcto
  };

  licencia: Licencia = {
    TipoLicenciasId: 1, // <--- Se asigna un valor por defecto válido
    FechaFin: ''
  };

  tiposLicencia = [
    { TipoLicenciasId: 1, TipoLicencia: 'Piloto Comercial' },
    { TipoLicenciasId: 2, TipoLicencia: 'Piloto Privado' },
    { TipoLicenciasId: 3, TipoLicencia: 'Instructor de Vuelo' }
  ];

  agregarLicencia() {
    if (this.licencia.TipoLicenciasId !== null && this.licencia.FechaFin) {
      this.admin.licencias.push({ ...this.licencia });

      // Resetear el formulario de licencia
      this.licencia = {
        TipoLicenciasId: 1, // <--- Se asegura que siempre tenga un número válido
        FechaFin: ''
      };
    }
  }

  obtenerNombreLicencia(id: number) {
    const licencia = this.tiposLicencia.find(l => l.TipoLicenciasId === id);
    return licencia ? licencia.TipoLicencia : 'Desconocido';
  }

  onSubmit() {
    console.log('Maestro / Instructor guardado:', this.admin);
  }
}
