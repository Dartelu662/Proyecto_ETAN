import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule } from '@angular/forms'; // Importa FormsModule
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core'; // Importa MatOption
import Plan from '../../interfaces/plan.interface';
import Curso from '../../interfaces/curso.interface';
import Materia from '../../interfaces/materia.interface';
import Maestro from '../../interfaces/maestro.interface';
import { PlanService } from '../../services/plan.service';
import { CursoService } from '../../services/curso.service';
import { MateriaService } from '../../services/materia.service';
import { Console } from 'node:console';
import { MaestroService } from '../../services/maestro.service';

@Component({
  selector: 'app-capturas-cursos-admin-1',
  standalone: true,
  imports: [
    CommonModule,    
      FormsModule,
  ], 
  templateUrl: './capturas-cursos-admin-1.component.html',
  styleUrls: ['./capturas-cursos-admin-1.component.scss']
})
export class CapturasCursosAdmin1Component {

    // ✅ Agrega el FormGroup correctamente
    planeFormGroup = new FormGroup({
      listaMaestros: new FormControl('', Validators.required)
    });

  listaMaestros: Maestro[] = [];
  planes: Plan[] = [];
  cursos: Curso [] = [];
  materias: Materia [] = [];

  // Modelos para los formularios
  nuevoPlan: Plan = { plan: '', FechaIni: '', FechaFin: '', Activo: true };
  nuevoCurso: Curso = { curso: '', Semanal: '', Sabatino: '', FechaCursoIni: '', FechaCursoFin: '', plan: '', Activo: true };
  nuevaMateria: Materia = { plan: '', curso: '', idMaestro: '', Maestro: '', Materia: '', Activo: true };

  selectedMaestro: string = '';
  selectPlan: string = '';
  selectCurso: string = '';

  constructor( 
    private planService: PlanService, 
    private cursoservice:CursoService, 
    private materiaservice: MateriaService,
    private maestroservice: MaestroService, 
    
  ) { }

  ngOnInit(): void {

    this.maestroservice.GetMaestros().subscribe( async value => {
      this.listaMaestros = value;
      console.log (value)
    }

    )

    // Inicializa los datos de ejemplo, normalmente vendrán de un servicio
      this.planService.GetPlanes().subscribe(plan => {
      this.planes = plan
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

   onMaestroSelected(maestro: string): void{
    if(maestro){
      console.log(maestro)
      this.nuevaMateria.idMaestro=maestro
      this.maestroservice.GetMaestroById(maestro).subscribe( value => {
        if(value)
        {
          this.nuevaMateria.Maestro = value.Nombres+" "+value.ApellidoP+" "+value.ApellidoM
        }
      })
    }
   }
 

   onPlanSelected(plan: string): void{
    if(plan){
      console.log(plan)
      this.nuevaMateria.plan=plan
      this.planService.GetPlanById(plan).subscribe( value => {
        if(value)
        {
          this.nuevaMateria.plan = value.plan
        }
      })
    }
   }

   
   onCursoSelected(curso: string): void{
    if(curso){
      console.log(curso)
      this.nuevaMateria.curso
      this.cursoservice.GetCursoById(curso).subscribe( value => {
        if(value)
        {
          this.nuevaMateria.curso = value.curso
        }
      })
    }
  }



  // Métodos para manejar las acciones en el HTML

  eliminarPlan(planId: Plan): void {
    if(planId && planId.id){ 
      console.log( this.planService.deletePlan(planId.id) )
    }
    
  }

  actualizarPlan(plan: any): void {
    // Lógica para actualizar el plan
    if(plan && plan.id){ 
      console.log( this.planService.UpdatePlan(plan.id) )
    }
    console.log('Actualizar plan', plan);
  }

  agregarPlan(): void {
    console.log(this.planService.AddPlan(this.nuevoPlan));
    //this.planes.push({ ...this.nuevoPlan });
    this.nuevoPlan = { plan: '', FechaIni: '', FechaFin: '', Activo: true }; // Limpiar formulario
  }

  eliminarCurso(id: string): void {
    // this.cursos = this.cursos.filter(curso => curso.curso !== cursoId);
    console.log(this.cursoservice.deleteCurso(id))
    
    
  }

  actualizarCurso(curso: any): void {
    // Lógica para actualizar el curso
    console.log('Actualizar curso', curso);
    this.cursoservice.UpdateCurso(curso)
  }

  agregarCurso(): void {
    this.cursoservice.AddCurso(this.nuevoCurso);
    //this.cursos.push({ ...this.nuevoCurso });
    this.nuevoCurso = { curso: '', Semanal: '', Sabatino: '', FechaCursoIni: '', FechaCursoFin: '', plan: '', Activo: true }; // Limpiar formulario
  }

  eliminarMateria(Materia: string | undefined): void {
    console.log('Eliminar materia', Materia)
    if(Materia) {
      this.materiaservice.deleteMateria(Materia)
    }
    
    
    //this.materias = this.materias.filter(materia => materia.Materia !== Materia);
  }

  actualizarMateria(Materia: Materia | undefined): void {
    // Lógica para actualizar la materia
    console.log('Actualizar materia', Materia);
    if(Materia) {
      this.materiaservice.UpdateMateria(Materia)
    }
  }

    agregarMateria(): void {
    this.materiaservice.AddMateria(this.nuevaMateria);
    //this.materias.push({ ...this.nuevaMateria });
    // this.nuevaMateria = { plan: '', curso: '', idMaestro: '', Maestro: '', Materia: '', Activo: true }; // Limpiar formulario
    this.nuevaMateria = { plan: '', curso: '',idMaestro: '', Maestro: '', Materia: '', Activo: true };
    this.selectPlan = '';
    this.selectCurso = '';
    this.selectedMaestro = '';
  }

  }
