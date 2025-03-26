import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Usuario from '../../interfaces/usuario.interface';
import alumno from '../../interfaces/alumno.interface';
import Auth from '../../interfaces/auth.interface';
import { AlumnoService } from '../../services/alumno.service';
import { UsuarioService } from '../../services/usuario.service';
import plan from '../../interfaces/plan.interface';


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

constructor ( private AlumnoService: AlumnoService) {}

  // Creamos un objeto que contenga tanto los datos de Usuario como la propiedad para el admin
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
      PlanId: '',
      Plan: '',
      FechaIni: '', 
      FechaFin: ''
  }

  

  ngOnInit(): void {}

  onSubmit(): void {

    this.auth.Email = this.usuario.Email
    
    // this.AlumnoService.AddAlumno(this.alumno, this.usuario)
    //   .then((result) => {
    //     if (result === null) {
    //       alert('La MATRICULA ya existe.');
    //     } else {
    //       alert('Usuario Alumno creado con exito');
    //       console.log('Usuario creado:', result);
    //     }
    //   })
    //   .catch((error) => { 
    //     console.error('Error al crear el Alumno:', error);
    //     alert(error);
    //     })
    this.Plan.Plan = this.Plan.Plan

    this.AlumnoService.AddAlumno(this.alumno, this.usuario)
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

