import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { EscolarService } from '../../services/escolar.service';

@Component({
  selector: 'app-calificaciones-alumno',
  imports: [],
  templateUrl: './calificaciones-alumno.component.html',
  styleUrl: './calificaciones-alumno.component.css'
})
  

  export class CalificacionesAlumnoComponent implements OnInit {
    
  
    constructor(private escolarService: EscolarService) {
    }
  
    ngOnInit(): void {
      
    }
  }



