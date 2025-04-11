import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { EscolarService } from '../../services/escolar.service';
import { Escolar } from '../../interfaces/escolar.interface';
import { strict } from 'assert';
import { ExportExcelService } from '../../services/exportexcel.service';
import { AuthentificationService } from '../../services/authentification.service';
import Usuario from '../../interfaces/usuario.interface';
import { user } from '@angular/fire/auth';
import { promises } from 'readline';

@Component({
  selector: 'app-calificaciones-alumno',
  standalone: true,
  imports: [],
  templateUrl: './calificaciones-alumno.component.html',
  styleUrl: './calificaciones-alumno.component.css'
})


  export class CalificacionesAlumnoComponent implements OnInit {
  calificaciones: Escolar[] = [];
  usuarioActual: Usuario = {
    id: '',
    Nombres: '',
    ApellidoP: '',
    ApellidoM: '',
    Email: '',
    Celular: '',
    Direccion: '',
    FechaNac: '',
    FechaIngreso: '',
    TipoUsuario: '',
    UserName: '',
    Activo:  true
   }
    constructor(
      private escolarService: EscolarService,
      private exportExcelService: ExportExcelService,
      private _authService: AuthentificationService
    ) {    }

    

    ngOnInit(): void {
      this._authService.retornarUsuarioActual().then(userS => {
        if (userS) {
          this.usuarioActual = userS;
          this.obtenerCalificaciones(); // lo llamas hasta que ya tienes el usuario
          console.log('Usuario:', this.usuarioActual);
          
        }
      });
    }
    
    
    obtenerCalificaciones(): void {
      this.escolarService.GetEscolars().subscribe(data => {
          this.calificaciones = data.filter(
          value => value.Matricula.trim().toLowerCase() === this.usuarioActual.UserName.trim().toLowerCase()
          //value => value.Matricula === this.usuarioActual.UserName
        );
       
        console.log('Datos de escolar:', data)
      });
    }  

  
    exportarAExcel(): void {
      this.exportExcelService.exportAsExcelFile(this.calificaciones, 'Calificaciones');
    }
  }
  