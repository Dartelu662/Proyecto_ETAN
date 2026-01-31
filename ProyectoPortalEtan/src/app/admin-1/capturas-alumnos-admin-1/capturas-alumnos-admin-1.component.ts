import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';

import { AlumnoService }           from '../../services/alumno.service';
import { PlanService }             from '../../services/plan.service';
import { CursoService }            from '../../services/curso.service';
import { EscolarService }          from '../../services/escolar.service';
import { AuthentificationService } from '../../services/authentification.service';
import { EdoCuentaService }        from '../../services/edo-cuenta.service';

import Usuario    from '../../interfaces/usuario.interface';
import Alumno     from '../../interfaces/alumno.interface';
import Plan       from '../../interfaces/plan.interface';
import Curso      from '../../interfaces/curso.interface';
import Edocuenta  from '../../interfaces/edocuenta.interface';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-capturas-alumnos-admin-1',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './capturas-alumnos-admin-1.component.html',
  styleUrls: ['./capturas-alumnos-admin-1.component.scss']
})
export class CapturasAlumnosAdmin1Component implements OnInit {
  // ── Modelo para crear nuevo alumno ─────────────────────────────────────────
  usuario: Usuario = {
    id: '', UserName: '', TipoUsuario: 'Alumno',
    Nombres: '', ApellidoP: '', ApellidoM: '',
    Email: '', Celular: '', Direccion: '',
    FechaNac: '', FechaIngreso: '', Activo: true, Password:''
  };
  alumno: Alumno = { id: '', PermisoFormacion: '', FechaFinPF: '' };

  auth = { Email: '', Password: '' };
  escolar = { Plan: '', Curso: '', Matricula: '' };

  listaPlanes: Plan[]  = [];
  listaCursos: Curso[] = [];
  selectPlan    = '';
  selectCurso   = '';
  modalidad     = '';
  selectedCursoObj?: Curso;

  // ── Modelo para buscar/editar alumno ────────────────────────────────────────
  matriculaBusqueda = '';
  alumnoSeleccionado: { usuario: Usuario; alumno: Alumno } | null = null;

  usuariosSugeridos: Usuario[] = []; // <-- nueva propiedad
  mensajeValidacion: string = '';
  matriculaExiste: boolean = false;

  constructor(
    private usuarioService:   UsuarioService,
    private alumnoService:    AlumnoService,
    private planService:      PlanService,
    private cursoService:     CursoService,
    private escolarService:   EscolarService,
    private authService:      AuthentificationService,
    private edoService:       EdoCuentaService
  ) {}

  
  ngOnInit(): void {
    this.planService.GetPlanes().subscribe(pls => this.listaPlanes = pls);
    this.cursoService.GetCursos().subscribe(cs => this.listaCursos = cs);
    this.clearForm(); // limpia al abrir la pantalla
  }

  matriculaChange() {
    this.escolar.Matricula = this.usuario.UserName;
  }

  onPlanSelected(planId: string) {
    this.escolar.Plan = planId;
  }

  onCursoSelected(cursoId: string) {
    this.escolar.Curso = cursoId;
    this.selectedCursoObj = this.listaCursos.find(c => c.id === cursoId);
  }

  /** Valida si la matrícula (Username) ya existe en la colección Alumno */
  async validarMatricula(): Promise<void> {
    this.mensajeValidacion = '';
    this.matriculaExiste = false;

    if (!this.usuario.UserName || !this.usuario.UserName.trim()) {
      return;
    }

    try {
      console.log('Validando matrícula:', this.usuario.UserName);
      const alumnoExistente = await this.alumnoService.GetAlumnoByUsername(this.usuario.UserName);
      
      if (alumnoExistente) {
        this.mensajeValidacion = `⚠️ La matrícula "${this.usuario.UserName}" ya existe en el sistema.`;
        this.matriculaExiste = true;
        console.warn('Matrícula duplicada:', this.usuario.UserName);
      } else {
        this.mensajeValidacion = '✓ Matrícula disponible.';
        this.matriculaExiste = false;
        console.log('Matrícula válida:', this.usuario.UserName);
      }
    } catch (error) {
      console.error('Error al validar matrícula:', error);
      this.mensajeValidacion = 'Error al validar la matrícula.';
    }
  }

  /** Guarda nuevo alumno + edoCuenta */
  async Guardar() {
    // Validar que la matrícula no exista antes de guardar
    if (this.matriculaExiste) {
      alert('No se puede guardar: La matrícula ya existe.');
      return;
    }

    // VALIDACIÓN: asegurar que la contraseña del alumno está capturada
    if (!this.usuario.Password || !this.usuario.Password.trim()) {
      alert('Por favor ingresa una contraseña para el alumno.');
      return;
    }

    // 1) Alta en AlumnoService
    this.auth.Email = this.usuario.Email;

    // pasar la contraseña del formulario al objeto auth que envías al servicio
    this.auth.Password = this.usuario.Password;
    
    const res = await this.alumnoService.AddAlumno(this.alumno, this.usuario);
    if (res === null) {
      alert('La matrícula ya existe.');
      return;
    }

    // 2) Registro en Auth
    const ok = await this.authService.registrer(this.auth);
    if (!ok) {
      await this.alumnoService.deleteAlumno(res.id!);
      alert('Error al crear credenciales.');
      return;
    }

    // 3) Crear registros en escolar
    await this.escolarService.CrearEscolaresPorCursoYPlan(
      this.escolar.Plan, this.escolar.Curso, this.escolar.Matricula
    );

    // 4) Crear EdoCuenta
    let numMensu = 0;
    let horasVuelo = 0;
    if (this.selectedCursoObj && this.modalidad) {
      numMensu = this.modalidad === 'Semanal'
        ? Number(this.selectedCursoObj.Semanal)
        : Number(this.selectedCursoObj.Sabatino);
        horasVuelo = Number(this.listaCursos.find(c => c.id === this.escolar.Curso)?.hrsvuelo) || 0;
    }
    // Crear el objeto EdoCuenta
    const edo: Edocuenta = {
      Matricula:    this.escolar.Matricula,
      MontoMensual: 0,
      NumMensu:     numMensu,
      MensPag:      0,
      MensPen:      numMensu,
      HrsVuelo:     horasVuelo,
      HrsVueloPag:  0,
      HrsVueloPen:  0,
      HrsSimula: (this.selectedCursoObj?.curso === 'Piloto Aviador Comercial Ala Fija') ? 52 : 0,
      HrsSimulaPag: 0,
      HrsSimulaPen: 0
    };
    try {
      await this.edoService.AddEdocuenta(edo);
      alert('¡Alumno y estado de cuenta creados con éxito!');
      this.resetForm();
    } catch (err) {
      console.error('Error creando edoCuenta:', err);
      alert('Error al registrar estado de cuenta');
    }
  }

  private resetForm() {
    this.usuario = {
      id: '', UserName: '', TipoUsuario: 'Alumno',
      Nombres: '', ApellidoP: '', ApellidoM: '',
      Email: '', Celular: '', Direccion: '',
      FechaNac: '', FechaIngreso: '', Activo: true, Password:''
    };
    this.alumno  = { id: '', PermisoFormacion: '', FechaFinPF: '' };
    this.auth    = { Email: '', Password: '' };
    this.escolar = { Plan: '', Curso: '', Matricula: '' };
    this.selectPlan    = '';
    this.selectCurso   = '';
    this.modalidad     = '';
    this.selectedCursoObj = undefined;
  }

  /** Busca alumno por UserName y carga para editar */
  async buscarAlumno(): Promise<void> {
    if (!this.matriculaBusqueda.trim()) return;
    const resultado = await this.alumnoService.GetAlumnoByUsername(this.matriculaBusqueda);
    if (resultado) {
      this.alumnoSeleccionado = resultado;
    } else {
      alert('Alumno no encontrado');
    }
  }

  cancelarEdicion(): void {
    this.alumnoSeleccionado = null;
  }

  /** Actualiza usuario + alumno */
  async actualizarAlumno(): Promise<void> {
    if (!this.alumnoSeleccionado) return;
    try {
      await this.alumnoService.UpdateAlumno(
        this.alumnoSeleccionado.alumno,
        this.alumnoSeleccionado.usuario
      );
      alert('Alumno actualizado con éxito');
      this.alumnoSeleccionado = null;
    } catch (err) {
      console.error(err);
      alert('Error al actualizar');
    }
  }

  /** Deshabilita el alumno */
  async deshabilitarAlumno(): Promise<void> {
    if (!this.alumnoSeleccionado) return;
    try {
      await this.alumnoService.disableAlumno(this.alumnoSeleccionado.usuario.UserName);
      alert('Alumno deshabilitado');
      this.alumnoSeleccionado = null;
    } catch (err) {
      console.error(err);
      alert('Error deshabilitando');
    }
  }

  async buscarUsuariosPorNombre(parcial: string): Promise<void> {
    try {
      if (!parcial || !parcial.trim()) {
        this.usuariosSugeridos = [];
        return;
      }
      console.log('buscarUsuariosPorNombre ->', parcial);
      this.usuariosSugeridos = await this.usuarioService.buscarUsuariosPorNombre(parcial);
      console.log('usuarios sugeridos:', this.usuariosSugeridos);
    } catch (error) {
      console.error('Error buscarUsuariosPorNombre:', error);
      this.usuariosSugeridos = [];
    }
  }

  seleccionarUsuario(u: Usuario): void {
    console.log('Usuario seleccionado:', u);
    this.usuario.UserName = u.UserName || '';
    this.usuario.Nombres = u.Nombres || '';
    this.usuario.ApellidoP = u.ApellidoP || '';
    this.usuario.ApellidoM = u.ApellidoM || '';
    this.usuario.Email = u.Email || '';
    this.usuario.Celular = u.Celular || '';
    this.usuario.Direccion = u.Direccion || '';
    this.usuariosSugeridos = [];
  }

  /** Limpia todos los modelos del formulario para una nueva captura */
  clearForm(): void {
    this.usuario = {
      id: '', UserName: '', TipoUsuario: 'Alumno',
      Nombres: '', ApellidoP: '', ApellidoM: '',
      Email: '', Celular: '', Direccion: '',
      FechaNac: '', FechaIngreso: '', Activo: true, Password: ''
    };
    this.alumno = { id: '', PermisoFormacion: '', FechaFinPF: '' };

    // modelos auxiliares que pueda usar el componente
    (this as any).auth = { Email: '', Password: '' };
    (this as any).usuariosSugeridos = [];
    (this as any).matriculaBusqueda = '';
    (this as any).alumnoSeleccionado = null;
    (this as any).selectPlan = '';
    (this as any).selectCurso = '';
    (this as any).modalidad = '';
    (this as any).selectedCursoObj = undefined;
  }

  /** Llamado desde el botón "Nuevo alumno" */
  abrirNuevoAlumno(): void {
    this.clearForm();
    // si tienes lógica para abrir modal o foco:
    // this.showForm = true;
    // setTimeout(()=> this.focusFirstInput(), 50);
  }

  // Ejemplo: después de guardar limpiar
  async guardarAlumno(): Promise<void> {
    // ... lógica de guardado ...
    this.clearForm();
    // cerrar modal / feedback al usuario...
  }

}
