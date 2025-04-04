import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Usuario from '../../interfaces/usuario.interface';
import alumno from '../../interfaces/alumno.interface';
import Auth from '../../interfaces/auth.interface';
import { AlumnoService } from '../../services/alumno.service';
import plan from '../../interfaces/plan.interface';
import curso from '../../interfaces/curso.interface';
import { UsuarioService } from '../../services/usuario.service';
import Alumno from '../../interfaces/alumno.interface';

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
export class CapturasAlumnosAdmin1Component implements OnInit{

  matriculaBusqueda: string = '';
  alumnoSeleccionado: { alumno: Alumno; usuario: Usuario } | null = null;


  async buscarAlumno(): Promise<void> {
    if (!this.matriculaBusqueda.trim()) return;

    const resultado = await this.alumnoService.GetAlumnoByUsername(this.matriculaBusqueda);
    
    if (resultado) {
      this.alumnoSeleccionado = resultado;
    } else {
      alert('Alumno no encontrado');
    }
  }

  cancelarEdicion(): void {
    this.alumnoSeleccionado = null;
  }
  
  async actualizarAlumno(): Promise<void> {
    if (!this.alumnoSeleccionado) return;

    const { alumno, usuario } = this.alumnoSeleccionado;

    const actualizado = await this.alumnoService.UpdateAlumno(alumno, usuario);
    
    if (actualizado) {
      alert('Alumno actualizado correctamente');
      this.alumnoSeleccionado = null;
    } else {
      alert('Error al actualizar');
    }
  }

  async deshabilitarAlumno() {
    if (this.alumnoSeleccionado) {
      const usuario = this.alumnoSeleccionado.usuario;
      try {
        await this.alumnoService.disableAlumno(usuario.UserName);
        alert('Alumno deshabilitado correctamente');
        this.alumnoSeleccionado = null;  // Limpiar los datos del alumno
      } catch (error) {
        console.error('Error al deshabilitar', error);
        alert('Error al deshabilitar');
      }
    }
  }

constructor ( 
  private alumnoService: AlumnoService, 
  private usuarioService: UsuarioService
) {}

// Creamos un objeto que contenga tanto los datos de Usuario como la propiedad para el alumno
   usuario: Usuario = {
      UserName: '',
      TipoUsuario: 'Alumno',
      Nombres: '',
      ApellidoP: '',
      ApellidoM: '',
      Email: '',
      Celular: '',
      Direccion: '',
      FechaNac: '',
      FechaIngreso: '',
      Activo: true
    }
    
    alumno: alumno = {
    PermisoFormacion: '',
    FechaFinPF: ''
  }

    auth: Auth = {
      Email: '',
      Password: ''
  }

    Plan: plan = {
      id: '',
      Plan: '',
      FechaIni: '', 
      FechaFin: '',
      Activo: true
  }

    
  curso: curso = {
    CursoId: '',
    PlanId: '',
    Curso: '',
    Semanal: '',
    Sabatino: '',
    FechaCursoIni: '',
    FechaCursoFin: '',
    Activo: true
}

  listaMatricula: { usuario: Usuario, alumno: alumno }[] = [];

  ngOnInit(): void {
    
  }

  

  Guardar(): void {

    this.auth.Email = this.usuario.Email
    this.Plan.Plan = this.Plan.Plan

     if (this.curso.Semanal === "Semanal") {
       this.curso.Semanal = "Semanal";
     } if (this.curso.Sabatino === "Sabatino") {
       this.curso.Sabatino = "Sabatino";
     } 

    

    this.alumnoService.AddAlumno(this.alumno, this.usuario)
      .then((result) => {
        if (result === null) {
          alert('La MATRICULA ya existe.');
        } else {
          alert('Usuario Alumno creado con exito');
          console.log('Usuario creado:', result);
        }
      })
      .catch((error) => { 
        console.error('Error al crear el Alumno:', error);
        alert(error);
        })
  }

  }

