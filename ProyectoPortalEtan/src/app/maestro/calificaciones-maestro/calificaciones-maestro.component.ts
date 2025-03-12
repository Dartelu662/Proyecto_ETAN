import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Grupo {
  materia: string;
  planEstudio: string;
  fechaExamen: string;
  alumnos: Alumno[];
  edicionHabilitada: boolean;
}

interface Alumno {
  nombre: string;
  calificacion: number | null;
  fechaActualizacion?: string;
  horaActualizacion?: string;
}

@Component({
  selector: 'app-calificaciones-maestro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calificaciones-maestro.component.html',
  styleUrls: ['./calificaciones-maestro.component.scss']
})
export class CalificacionesMaestroComponent {
  grupos: Grupo[] = [
    {
      materia: 'Aerodinámica',
      planEstudio: '2024A',
      fechaExamen: '2025-05-10',
      alumnos: [
        { nombre: 'Juan Pérez', calificacion: null },
        { nombre: 'María López', calificacion: null }
      ],
      edicionHabilitada: true,
    },
    {
      materia: 'Navegación Aérea',
      planEstudio: '2024A',
      fechaExamen: '2025-05-15',
      alumnos: [
        { nombre: 'Carlos Sánchez', calificacion: null },
        { nombre: 'Ana Torres', calificacion: null }
      ],
      edicionHabilitada: true,
    }
  ];
  grupoSeleccionado: Grupo | null = null;
  periodosPasados: string[] = ['2023A', '2023B', '2022A'];
  periodoSeleccionado: string | null = null;
  alumnoAnterior: Alumno[] = [{ nombre: '', calificacion: null }];

  seleccionarGrupo(grupo: Grupo) {
    this.grupoSeleccionado = grupo;
    this.alumnoAnterior = grupo.alumnos;
  }

  regresarALista() {
    this.grupoSeleccionado = null;
  }

  actualizarCalificacion(alumno: Alumno) {
    debugger;
    if (alumno.calificacion === null || alumno.calificacion < 0 || alumno.calificacion > 100) {
      if(alumno.calificacion !== null && alumno.calificacion > 100) alumno.calificacion = 100;
      if(alumno.calificacion !== null && alumno.calificacion < 0) alumno.calificacion = 0;
    }
    if(alumno.calificacion){
      const ahora = new Date();
      alumno.fechaActualizacion = ahora.toISOString().split('T')[0];
      alumno.horaActualizacion = ahora.toTimeString().split(' ')[0];
    }
  }

  bloquearEdicion() {
    if(this.grupoSeleccionado){
      this.grupoSeleccionado.edicionHabilitada = false;
    }
  }



  
}
