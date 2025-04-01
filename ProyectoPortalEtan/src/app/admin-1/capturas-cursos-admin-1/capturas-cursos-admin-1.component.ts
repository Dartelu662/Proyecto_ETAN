import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import Plan from '../../interfaces/plan.interface';
import Curso from '../../interfaces/curso.interface';
import Materia from '../../interfaces/materia.interface';
import { PlanService } from '../../services/plan.service';
import { CursoService } from '../../services/curso.service';
import { MateriaService } from '../../services/materia.service';

@Component({
  selector: 'app-capturas-cursos-admin-1',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './capturas-cursos-admin-1.component.html',
  styleUrls: ['./capturas-cursos-admin-1.component.scss']
})
export class CapturasCursosAdmin1Component {
  planes: Plan [] = [];
  cursos: Curso [] = [];
  materias: Materia [] = [];

  // Modelos para los formularios
  nuevoPlan: any = { plan: '', FechaIni: '', FechaFin: '', Activo: true };
  nuevoCurso: any = { Curso: '', Semanal: '', Sabatino: '', FechaCursoIni: '', FechaCursoFin: '', PlanId: 1, Activo: true };
  nuevaMateria: any = { PlanId: 1, CursoId: 1,  Activo: true };

  constructor( private planService: PlanService, private cursoservice:CursoService, private materiaservice: MateriaService ) { }

  ngOnInit(): void {

    // Inicializa los datos de ejemplo, normalmente vendrán de un servicio
      this.planService.GetPlanes().subscribe(plan => {
      this.planes = plan;
      console.log('Lista de Plane:', plan);
    });

      this.cursoservice.GetCursos().subscribe(curso =>  {
      this.cursos=curso;
      console.log('lista de Cursos:', curso);
    });

    this.materiaservice.GetMaterias().subscribe(materia => {
      this.materias=materia;
      console.log('lista de materias:', materia);
    });
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
    this.nuevoPlan = { plan: '', FechaIni: '', FechaFin: '', Activo: true }; // Limpiar formulario
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
    this.nuevoCurso = { Curso: '', Semanal: '', Sabatino: '', FechaCursoIni: '', FechaCursoFin: '', PlanId: 1, Activo: true }; // Limpiar formulario
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
