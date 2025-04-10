import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { EscolarService } from '../../services/escolar.service';
import { Escolar } from '../../interfaces/escolar.interface';
import { strict } from 'assert';
import { ExportExcelService } from '../../services/exportexcel.service';

@Component({
  selector: 'app-calificaciones-alumno',
  standalone: true,
  imports: [],
  templateUrl: './calificaciones-alumno.component.html',
  styleUrl: './calificaciones-alumno.component.css'
})


  export class CalificacionesAlumnoComponent implements OnInit {
  calificaciones: Escolar[] = [];
 
    constructor(
      private escolarService: EscolarService,
      private exportExcelService: ExportExcelService
    ) {    }


    ngOnInit(): void {
      this.obtenerCalificaciones();
    }
  
    obtenerCalificaciones(): void {
      this.escolarService.GetEscolars().subscribe((data: Escolar[]) => {
        this.calificaciones = data;
      });
    }
  
    exportarAExcel(): void {
      this.exportExcelService.exportAsExcelFile(this.calificaciones, 'Calificaciones');
    }
  }
  