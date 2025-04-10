import { Component, OnInit, viewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Usuario from '../../interfaces/usuario.interface';
import alumno from '../../interfaces/alumno.interface';
import Auth from '../../interfaces/auth.interface';
import { AlumnoService } from '../../services/alumno.service';
import curso from '../../interfaces/curso.interface';
import { UsuarioService } from '../../services/usuario.service';
import Alumno from '../../interfaces/alumno.interface';
import Plan from '../../interfaces/plan.interface';
import Curso from '../../interfaces/curso.interface';
import { PlanService } from '../../services/plan.service';
import { CursoService } from '../../services/curso.service';
import { EscolarService } from '../../services/escolar.service';
import { Escolar } from '../../interfaces/escolar.interface';
import { AuthentificationService } from '../../services/authentification.service';

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
//          C U R S O S
///////////////////////////////////////////////////////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////
matriculaChange() {
  this.escolar.Matricula = this.usuario.UserName
}

  alumnoUpdate: Alumno = {
    id: '',
    Username: '',
    PermisoFormacion: '',
    FechaFinPF: ''    
  }
  usuarioUpdate: Usuario = {
    id: '',
    UserName: '',
    TipoUsuario: '',
    Nombres: '',
    ApellidoP: '',
    ApellidoM: '',
    Email: '',
    Celular: '',
    Direccion: '',
    FechaNac: '',
    FechaIngreso: '',
    Activo: true,
  }
///////////////////////////////////////////////////////////////////////////////////////////////////////////
//          P L A N E S
///////////////////////////////////////////////////////////////////////////////////////////////////////////
  listaPlanes: Plan[] = [];
  selectPlan: string = '';


  onPlanSelected(planId: string) {
  this.escolar.Plan = planId;
  }
///////////////////////////////////////////////////////////////////////////////////////////////////////////
//          C U R S O S
///////////////////////////////////////////////////////////////////////////////////////////////////////////
  listaCursos: Curso[] = [];
  selectCursos: string = '';


  onCursoSelected(cursoId: string) {
    this.escolar.Curso = cursoId;
    
  }
///////////////////////////////////////////////////////////////////////////////////////////////////////////
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
    if(!this.alumnoSeleccionado) return
    console.log(this.alumnoSeleccionado)
    const b = this.alumnoService.UpdateAlumno(this.alumnoSeleccionado.alumno, this.alumnoSeleccionado.usuario)
    b.then(v => {
    })
    .catch(err => {
      alert("error al actualizar el campo")
      console.log(err);
    })
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
    private usuarioService: UsuarioService,
    private planService: PlanService,
    private cursoService: CursoService,
    private escolarService: EscolarService,
    private authService: AuthentificationService
  ) {}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
//      Creamos un objeto que contenga tanto los datos de Usuario como la propiedad para el alumno
///////////////////////////////////////////////////////////////////////////////////////////////////////////
  escolar  = {
    Plan: "",
    Curso: "",
    Matricula: ""
  }


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

  Plan: Plan = {
    id: '',
    plan: '',
    FechaIni: '', 
    FechaFin: '',
    Activo: true
  }

  curso: curso = {
    curso: '',
    plan: '',
    Semanal: '',
    Sabatino: '',
    FechaCursoIni: '',
    FechaCursoFin: '',
    Activo: true
  }

  listaMatricula: { usuario: Usuario, alumno: alumno }[] = [];

  ngOnInit(): void {
    this.planService.GetPlanes().subscribe(value => {
      this.listaPlanes = value
    })
    this.cursoService.GetCursos().subscribe(value => {
      this.listaCursos = value
    })
  }

  

  async Guardar() {

    this.auth.Email = this.usuario.Email

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
    
    await this.authService.registrer(this.auth);
    console.log(this.escolar)
    await this.escolarService.CrearEscolaresPorCursoYPlan(this.escolar.Plan, this.escolar.Curso, this.escolar.Matricula)
  }
}

