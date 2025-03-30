import { Component, input } from '@angular/core';
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
  matricula: string;
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
        { matricula: "123456", nombre: 'Juan Pérez', calificacion: null },
        { matricula: "123457", nombre: 'María López', calificacion: null }
      ],
      edicionHabilitada: true,
    },
    {
      materia: 'Navegación Aérea',
      planEstudio: '2024A',
      fechaExamen: '2025-05-15',
      alumnos: [
        { matricula: "123446", nombre: 'Carlos Sánchez', calificacion: null },
        { matricula: "123356", nombre: 'Ana Torres', calificacion: null }
      ],
      edicionHabilitada: true,
    }
  ];
  grupoSeleccionado: Grupo | null = null;
  periodosPasados: string[] = ['2023A', '2023B', '2022A'];
  periodoSeleccionado: string | null = null;
  alumnoAuxiliar: Alumno[] = [];
  conteoAlumnos:number = 0;
  conteoCalificaciones:number = 0;
  numeroParaIterar:number = 0;

  seleccionarGrupo(grupo: Grupo) {
    this.grupoSeleccionado = grupo;
    this.alumnoAuxiliar = [];  // Limpiar las calificaciones auxiliares cuando se selecciona un grupo
    grupo.alumnos.forEach(alumno => {
      const _a:Alumno | null = this.buscarAlumnoPorMatricula(alumno.matricula);
      if(_a !== null) this.alumnoAuxiliar.push(_a);
      this.numeroParaIterar++;
    });
  }

  buscarAlumnoPorMatricula(matricula: string): Alumno | null {
    if (this.grupoSeleccionado) {
      // Buscamos al alumno por su matrícula
      const alumno = this.grupoSeleccionado.alumnos.find(a => a.matricula === matricula);
      return alumno || null; // Si no se encuentra, devolvemos null
    }
    return null; // Si no hay grupo seleccionado, devolvemos null
  }

  regresarALista() {
    console.log(this.grupoSeleccionado)
    console.log(this.alumnoAuxiliar)
    this.grupoSeleccionado = null;
  }

  actualizarCalificacion(alumno: Alumno, _e:Event) {
      const inputElement = (_e.target as HTMLElement).closest('tr')?.querySelector('input');
      const ahora = new Date();
      if(inputElement && this.ValidarInfo(inputElement)){
        alumno.calificacion = inputElement?.valueAsNumber;
        alumno.fechaActualizacion = ahora.toISOString().split('T')[0];
        alumno.horaActualizacion = ahora.toTimeString().split(' ')[0];
      }
      
  }

  bloquearEdicion() {
    if(this.grupoSeleccionado){
      this.grupoSeleccionado.alumnos.forEach(alumno => {
        if(alumno.calificacion){
          this.conteoCalificaciones++;
        } 
        this.conteoAlumnos++;
      });
      if(this.conteoAlumnos == this.conteoCalificaciones){
        this.grupoSeleccionado.edicionHabilitada = false;
      }
    }
    this.conteoAlumnos = 0;
    this.conteoCalificaciones = 0;
  }

  ValidarInfo(_e: Event|HTMLInputElement):boolean {
    if (_e instanceof HTMLInputElement) {
      const input = _e;
      const calificacion = input.valueAsNumber; // Obtenemos el valor como número
  
    // Validamos que la calificación esté dentro del rango permitido
    if (calificacion < 0){ 
      input.value = "";
      return false;
    } 
    else if (calificacion > 100){
      input.value = ""; 
      return false;
    }
    else if (input.value == ""){
      input.value = "";
      return false;
    }
    }else {
      const input = _e.target as HTMLInputElement;
      const calificacion = input.valueAsNumber; // Obtenemos el valor como número
  
    // Validamos que la calificación esté dentro del rango permitido
    if (calificacion < 0){ 
      input.value = "";
      return false;
    } 
    else if (calificacion > 100){
      input.value = ""; 
      return false;
    }
    else if (input.value == ""){
      input.value = "";
      return false;
    }
    }
    
    return true;
  }
  
}
