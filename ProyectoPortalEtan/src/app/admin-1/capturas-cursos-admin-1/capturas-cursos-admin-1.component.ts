import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import plan from '../../interfaces/plan.interface';
import curso from '../../interfaces/curso.interface';
import materia from '../../interfaces/materia.interface';
import { PlanService } from '../../services/plan.service';

@Component({
  selector: 'app-capturas-cursos-admin-1',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './capturas-cursos-admin-1.component.html',
  styleUrls: ['./capturas-cursos-admin-1.component.scss']
})
export class CapturasCursosAdmin1Component {
  planes: plan [] = [];
  cursos: curso [] = [];
  materias: materia [] = [];

  // Modelos para los formularios
  nuevoPlan: any = { NombrePlan: '', FechaIni: '', FechaFin: '', Activo: true };
  nuevoCurso: any = { NombreCurso: '', Semanal: '', Sabatino: '', FechaIni: '', FechaFin: '', PlanId: 1, Activo: true };
  nuevaMateria: any = { PlanId: 1, CursoId: 1,  Activo: true };

  constructor( private planService: PlanService ) { }

  ngOnInit(): void {
    // Inicializa los datos de ejemplo, normalmente vendrán de un servicio
    this.planes = [
      { id: "1", Plan: 'Plan A', FechaIni: '2025-03-01', FechaFin: '2025-12-31', Activo: true },
      { id: "2", Plan: 'Plan B', FechaIni: '2025-03-01', FechaFin: '2025-12-31', Activo: true }
    ];

    this.cursos = [
      {  Curso: 'Curso 1', PlanId: "1", Semanal: '8', Sabatino: '11', FechaCursoIni: '2025-03-01', FechaCursoFin: '2025-06-30', Activo: true },
      {  Curso: 'Curso 2', PlanId: "2", Semanal: '8', Sabatino: '11', FechaCursoIni: '2025-03-01', FechaCursoFin: '2025-06-30', Activo: true }
    ];

    this.materias = [
      { Materia: "", PlanId: "1", CursoId: "1", MaestroId: "1",  Activo: true }
    ];
  }

  // Métodos para manejar las acciones en el HTML

  eliminarPlan(planId: string): void {
  
    this.planService.deletePlan 
  }

  actualizarPlan(plan: any): void {
    // Lógica para actualizar el plan
    console.log('Actualizar plan', plan);
  }

  agregarPlan(): void {
    this.planes.push({ ...this.nuevoPlan });
    this.nuevoPlan = { NombrePlan: '', FechaIni: '', FechaFin: '', Activo: true }; // Limpiar formulario
  }

  eliminarCurso(cursoId: string): void {
    this.cursos = this.cursos.filter(curso => curso.CursoId !== cursoId);
  }

  actualizarCurso(curso: any): void {
    // Lógica para actualizar el curso
    console.log('Actualizar curso', curso);
  }

  agregarCurso(): void {
    this.cursos.push({ ...this.nuevoCurso });
    this.nuevoCurso = { NombreCurso: '', description: '', FechaIni: '', FechaFin: '', PlanId: 1, Activo: true }; // Limpiar formulario
  }

  eliminarMateria(Materia: string): void {
    this.materias = this.materias.filter(materia => materia.Materia !== Materia);
  }

  actualizarMateria(materia: any): void {
    // Lógica para actualizar la materia
    console.log('Actualizar materia', materia);
  }

  agregarMateria(): void {
    this.materias.push({ ...this.nuevaMateria });
    this.nuevaMateria = { PlanId: 1, CursoId: 1, FechaIni: '', FechaFin: '', Activo: true }; // Limpiar formulario
  }
}
