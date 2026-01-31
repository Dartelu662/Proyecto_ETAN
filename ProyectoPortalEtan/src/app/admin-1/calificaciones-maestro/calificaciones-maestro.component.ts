import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaestroService } from '../../services/maestro.service';
import { Firestore, collection, collectionData, query, where, updateDoc, doc } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Escolar } from '../../interfaces/escolar.interface';
import Maestro from '../../interfaces/maestro.interface';
import { Observable, pipe } from 'rxjs';

interface Alumno {
  escolarId:         string;
  matricula:         string;
  nombre:            string;
  calificacion:      number|null;
  fechaActualizacion?: string;
  horaActualizacion?:  string;
}

interface Grupo {
  materia:            string;
  planEstudio:        string;
  fechaExamen:        string;
  alumnos:            Alumno[];
  edicionHabilitada:  boolean;
}

@Component({
  selector: 'app-calificaciones-maestro',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './calificaciones-maestro.component.html',
  styleUrls: ['./calificaciones-maestro.component.scss']
})
export class CalificacionesMaestroComponent implements OnInit {
  maestroForm: FormGroup;
  listaMaestros: Maestro[] = [];
  grupos: Grupo[] = [];
  selectedGrupo: Grupo|null = null;

  private fb         = inject(FormBuilder);
  private maestroSvc = inject(MaestroService);
  private afs        = inject(Firestore);

  constructor() {
    this.maestroForm = this.fb.group({
      maestroId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // 1) Cargo maestros
    this.maestroSvc.GetMaestros().subscribe(ms => this.listaMaestros = ms);

    // 2) Cuando cambie el maestro, cargo grupos desde Escolar
    this.maestroForm.get('maestroId')!
      .valueChanges
      .subscribe(id => {
        this.selectedGrupo = null;
        if (id) this.loadGruposByMaestro(id);
        else this.grupos = [];
      });
  }

  private loadGruposByMaestro(maestroId: string) {
    const escRef = collection(this.afs, 'Escolar');
    const q = query(
      escRef,
      where('maestroId','==', maestroId),
      where('Activo','==', true)
    );
    (collectionData(q, { idField: 'id' }) as unknown as Observable<(Escolar & { id: string })[]>)
          .pipe(
            map((docs: Array<Escolar & { id: string }>) => {
              // agrupamos por materiaId
              const grpMap = new Map<string, Grupo>();
              docs.forEach(es => {
                const key = es.materiaId;
                if (!grpMap.has(key)) {
                  grpMap.set(key, {
                    materia: es.Materia,
                    planEstudio: es.Plan,
                    fechaExamen: es.FechaActualizacion ?? '',
                    edicionHabilitada: true,
                    alumnos: []
                  });
                }
                const g = grpMap.get(key)!;
                g.alumnos.push({
                  escolarId: es.id,
                  matricula: es.Matricula,
                  nombre:    '',  // si tienes nombre en Escolar, pon es.Nombre
                  calificacion: es.Calificacion ?? null,
                  fechaActualizacion: es.FechaActualizacion,
                  horaActualizacion:  undefined
                });
              });
              return Array.from(grpMap.values());
            })
          )
      .subscribe(grs => this.grupos = grs, err => console.error(err));
  }

  seleccionarGrupo(g: Grupo) {
    this.selectedGrupo = g;
  }

  regresarALista() {
    this.selectedGrupo = null;
  }

  actualizarCalificacion(a: Alumno, ev: Event) {
    const input = ev.target as HTMLInputElement;
    const val = input.valueAsNumber;
    if (val < 0 || val > 100 || isNaN(val)) return;
    const ahora = new Date();
    a.calificacion = val;
    a.fechaActualizacion = ahora.toISOString().split('T')[0];
    a.horaActualizacion  = ahora.toTimeString().split(' ')[0];

    // persistir en Firestore
    const ref = doc(this.afs, 'Escolar', a.escolarId);
    updateDoc(ref, {
      Calificacion:       val,
      FechaActualizacion: a.fechaActualizacion
    })
    .then(() => console.log(`Guardado ${a.matricula}`))
    .catch(err => console.error('Error al guardar:', err));
  }

  bloquearEdicion() {
    if (!this.selectedGrupo) return;
    const total = this.selectedGrupo.alumnos.length;
    const con    = this.selectedGrupo.alumnos.filter(x => x.calificacion != null).length;
    if (con === total) this.selectedGrupo.edicionHabilitada = false;
  }
}
