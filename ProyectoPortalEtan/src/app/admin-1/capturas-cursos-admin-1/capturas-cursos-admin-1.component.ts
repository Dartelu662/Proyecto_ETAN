import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

@Component({
  selector: 'app-capturas-cursos-admin-1',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './capturas-cursos-admin-1.component.html',
  styleUrls: ['./capturas-cursos-admin-1.component.scss']
})
export class CapturasCursosAdmin1Component {
  planes: any[] = [];
  cursos: any[] = [];
  materias: any[] = [];

  // Modelos para los formularios
  nuevoPlan: any = { NombrePlan: '', FechaIni: '', FechaFin: '', Activo: true };
  nuevoCurso: any = { NombreCurso: '', description: '', FechaIni: '', FechaFin: '', PlanId: 1, Activo: true };
  nuevaMateria: any = { PlanId: 1, CursoId: 1, FechaIni: '', FechaFin: '', Activo: true };

  constructor() { }

  ngOnInit(): void {
    // Inicializa los datos de ejemplo, normalmente vendrán de un servicio
    this.planes = [
      { PlanId: 1, NombrePlan: 'Plan A', FechaIni: '2025-03-01', FechaFin: '2025-12-31', Activo: true },
      { PlanId: 2, NombrePlan: 'Plan B', FechaIni: '2025-03-01', FechaFin: '2025-12-31', Activo: true }
    ];

    this.cursos = [
      { CursoId: 1, NombreCurso: 'Curso 1', PlanId: 1, description: 'Descripción del Curso 1', FechaIni: '2025-03-01', FechaFin: '2025-06-30', Activo: true },
      { CursoId: 2, NombreCurso: 'Curso 2', PlanId: 2, description: 'Descripción del Curso 2', FechaIni: '2025-03-01', FechaFin: '2025-06-30', Activo: true }
    ];

    this.materias = [
      { MateriaId: 1, PlanId: 1, CursoId: 1, FechaIni: '2025-03-01', FechaFin: '2025-06-30', Activo: true }
    ];
  }

  // Métodos para manejar las acciones en el HTML

  eliminarPlan(planId: number): void {
    this.planes = this.planes.filter(plan => plan.PlanId !== planId);
  }

  actualizarPlan(plan: any): void {
    // Lógica para actualizar el plan
    console.log('Actualizar plan', plan);
  }

  agregarPlan(): void {
    this.planes.push({ ...this.nuevoPlan });
    this.nuevoPlan = { NombrePlan: '', FechaIni: '', FechaFin: '', Activo: true }; // Limpiar formulario
  }

  eliminarCurso(cursoId: number): void {
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

  eliminarMateria(materiaId: number): void {
    this.materias = this.materias.filter(materia => materia.MateriaId !== materiaId);
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
