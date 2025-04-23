import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EscolarService } from '../../services/escolar.service';
import { Escolar } from '../../interfaces/escolar.interface';
import { ExportExcelService } from '../../services/exportexcel.service';
import { AuthentificationService } from '../../services/authentification.service';
import Usuario from '../../interfaces/usuario.interface';

import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-calificaciones-alumno',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule
  ],
  templateUrl: './calificaciones-alumno.component.html',
  styleUrl: './calificaciones-alumno.component.css'
})
export class CalificacionesAlumnoComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Materia', 'Maestro', 'Curso', 'Plan', 'Calificacion', 'FechaActualizacion'];
  dataSource = new MatTableDataSource<Escolar>();
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
    Activo: true
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private escolarService: EscolarService,
    private exportExcelService: ExportExcelService,
    private _authService: AuthentificationService
  ) {}

  ngOnInit(): void {
    this._authService.retornarUsuarioActual().then(userS => {
      if (userS) {
        this.usuarioActual = userS;
        this.obtenerCalificaciones();
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  obtenerCalificaciones(): void {
    this.escolarService.GetEscolars().subscribe(data => {
      const filtradas = data.filter(
        d => d.Matricula?.trim().toLowerCase() === this.usuarioActual.UserName?.trim().toLowerCase()
      );
      this.dataSource.data = filtradas;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    this.dataSource.filterPredicate = (data: Escolar, filter: string): boolean =>
      data.Maestro?.toLowerCase().includes(filter);
  }

  exportarAExcel(): void {
    this.exportExcelService.exportAsExcelFile(this.dataSource.data, 'Calificaciones');
  }
}
