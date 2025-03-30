import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Usuario from '../../interfaces/usuario.interface';
import alumno from '../../interfaces/alumno.interface';
import Auth from '../../interfaces/auth.interface';
import { AlumnoService } from '../../services/alumno.service';
import plan from '../../interfaces/plan.interface';
import curso from '../../interfaces/curso.interface';

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
eliminarAlumno(arg0: any) {
throw new Error('Method not implemented.');
}
editarAlumno(_t150: any) {
throw new Error('Method not implemented.');
}

constructor ( private alumnoService: AlumnoService) {}

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
  matricula = "";

  listaMatricula: { usuario: Usuario, alumno: alumno }[] = [];

  ngOnInit(): void {
    
  }

  Actualizar(): void {
    this.alumnoService.GetAlumnoByUsername(this.matricula)
    .then((result) => {
      if(result != null){
        this.listaMatricula = [];
        this.listaMatricula.push(result);
      } else {
        alert('Matricula no encontrada');
      }
    })
    .catch((error) => { 
      console.error('Error al crear el Alumno:', error);
      alert('Error al crear el Alumno');
    })
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

