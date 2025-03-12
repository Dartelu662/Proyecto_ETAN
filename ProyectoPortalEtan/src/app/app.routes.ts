import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AlumnoComponent } from './alumno/alumno.component';
import { InicioAlumnoComponent } from './alumno/inicio-alumno/inicio-alumno.component';
import { DatosGeneralesAlumnoComponent } from './alumno/datos-generales-alumno/datos-generales-alumno.component';
import { VuelosAlumnoComponent } from './alumno/vuelos-alumno/vuelos-alumno.component';
import { CalificacionesAlumnoComponent } from './alumno/calificaciones-alumno/calificaciones-alumno.component';
import { PagosAlumnoComponent } from './alumno/pagos-alumno/pagos-alumno.component';
import { MaestroComponent } from './maestro/maestro.component';
import { InicioMaestroComponent } from './maestro/inicio-maestro/inicio-maestro.component';
import { DatosGeneralesMaestroComponent } from './maestro/datos-generales-maestro/datos-generales-maestro.component';
import { CalificacionesMaestroComponent } from './maestro/calificaciones-maestro/calificaciones-maestro.component';
import { CursosMaestroComponent } from './maestro/cursos-maestro/cursos-maestro.component';
import { Admin1Component } from './admin-1/admin-1.component';
import { Admin2Component } from './admin-2/admin-2.component';
import { Admin3Component } from './admin-3/admin-3.component';
import { InicioAdmin1Component } from './admin-1/inicio-admin-1/inicio-admin-1.component';
import { DatosGeneralesAdmin1Component } from './admin-1/datos-generales-admin-1/datos-generales-admin-1.component';
import { InicioAdmin2Component } from './admin-2/inicio-admin-2/inicio-admin-2.component';
import { DatosGeneralesAdmin2Component } from './admin-2/datos-generales-admin-2/datos-generales-admin-2.component';
import { InicioAdmin3Component } from './admin-3/inicio-admin-3/inicio-admin-3.component';
import { DatosGeneralesAdmin3Component } from './admin-3/datos-generales-admin-3/datos-generales-admin-3.component';
import { CapturasAlumnosAdmin1Component } from './admin-1/capturas-alumnos-admin-1/capturas-alumnos-admin-1.component';
import { PagosAdmin1Component } from './admin-1/pagos-admin-1/pagos-admin-1.component';
import { HorasVueloAdmin1Component } from './admin-1/horas-vuelo-admin-1/horas-vuelo-admin-1.component';
import { CapturasAlumnosAdmin2Component } from './admin-2/capturas-alumnos-admin-2/capturas-alumnos-admin-2.component';
import { CapturasAvionesAdmin1Component } from './admin-1/capturas-aviones-admin-1/capturas-aviones-admin-1.component';
import { CapturasCursosAdmin1Component } from './admin-1/capturas-cursos-admin-1/capturas-cursos-admin-1.component';
import { CapturasAdministrativosAdmin1Component } from './admin-1/capturas-administrativos-admin-1/capturas-administrativos-admin-1.component';
import { CapturasMaestrosAdmin1Component } from './admin-1/capturas-maestros-admin-1/capturas-maestros-admin-1.component';
import { CapturasMaestrosAdmin2Component } from './admin-2/capturas-maestros-admin-2/capturas-maestros-admin-2.component';
import { CapturasAdministrativosAdmin2Component } from './admin-2/capturas-administrativos-admin-2/capturas-administrativos-admin-2.component';
import { CapturasAvionesAdmin2Component } from './admin-2/capturas-aviones-admin-2/capturas-aviones-admin-2.component';
import { CapturasCursosAdmin2Component } from './admin-2/capturas-cursos-admin-2/capturas-cursos-admin-2.component';
import { HorasVueloAdmin3Component } from './admin-3/horas-vuelo-admin-3/horas-vuelo-admin-3.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },

  { 
    path: 'alumno', 
    loadComponent: () => import('./alumno/alumno.component').then(m => m.AlumnoComponent),
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', loadComponent: () => import('./alumno/inicio-alumno/inicio-alumno.component').then(m => m.InicioAlumnoComponent) },
      { path: 'datos-generales', loadComponent: () => import('./alumno/datos-generales-alumno/datos-generales-alumno.component').then(m => m.DatosGeneralesAlumnoComponent) },
      { path: 'vuelos', loadComponent: () => import('./alumno/vuelos-alumno/vuelos-alumno.component').then(m => m.VuelosAlumnoComponent) },
      { path: 'calificaciones', loadComponent: () => import('./alumno/calificaciones-alumno/calificaciones-alumno.component').then(m => m.CalificacionesAlumnoComponent) },
      { path: 'pagos', loadComponent: () => import('./alumno/pagos-alumno/pagos-alumno.component').then(m => m.PagosAlumnoComponent) },
    ]
  },

  { 
    path: 'maestro', 
    loadComponent: () => import('./maestro/maestro.component').then(m => m.MaestroComponent),
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', loadComponent: () => import('./maestro/inicio-maestro/inicio-maestro.component').then(m => m.InicioMaestroComponent) },
      { path: 'datos-generales', loadComponent: () => import('./maestro/datos-generales-maestro/datos-generales-maestro.component').then(m => m.DatosGeneralesMaestroComponent) },
      { path: 'calificaciones', loadComponent: () => import('./maestro/calificaciones-maestro/calificaciones-maestro.component').then(m => m.CalificacionesMaestroComponent) },
      { path: 'cursos', loadComponent: () => import('./maestro/cursos-maestro/cursos-maestro.component').then(m => m.CursosMaestroComponent) },
    ]
  },

  {
    path: 'admin-1',
    loadComponent: () => import('./admin-1/admin-1.component').then(m => m.Admin1Component),
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', loadComponent: () => import('./admin-1/inicio-admin-1/inicio-admin-1.component').then(m => m.InicioAdmin1Component) },
      { path: 'datos-generales', loadComponent: () => import('./admin-1/datos-generales-admin-1/datos-generales-admin-1.component').then(m => m.DatosGeneralesAdmin1Component) },
      { path: 'captura-alumnos', loadComponent: () => import('./admin-1/capturas-alumnos-admin-1/capturas-alumnos-admin-1.component').then(m => m.CapturasAlumnosAdmin1Component) },
      { path: 'captura-maestros', loadComponent: () => import('./admin-1/capturas-maestros-admin-1/capturas-maestros-admin-1.component').then(m => m.CapturasMaestrosAdmin1Component) },
      { path: 'captura-administrativos', loadComponent: () => import('./admin-1/capturas-administrativos-admin-1/capturas-administrativos-admin-1.component').then(m => m.CapturasAdministrativosAdmin1Component) },
      { path: 'captura-aviones', loadComponent: () => import('./admin-1/capturas-aviones-admin-1/capturas-aviones-admin-1.component').then(m => m.CapturasAvionesAdmin1Component) },
      { path: 'captura-cursos', loadComponent: () => import('./admin-1/capturas-cursos-admin-1/capturas-cursos-admin-1.component').then(m => m.CapturasCursosAdmin1Component) },
      { path: 'pagos', loadComponent: () => import('./admin-1/pagos-admin-1/pagos-admin-1.component').then(m => m.PagosAdmin1Component) },
      { path: 'horas-vuelo', loadComponent: () => import('./admin-1/horas-vuelo-admin-1/horas-vuelo-admin-1.component').then(m => m.HorasVueloAdmin1Component) },
    ]
  },

  {
    path: 'admin-2',
    loadComponent: () => import('./admin-2/admin-2.component').then(m => m.Admin2Component),
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', loadComponent: () => import('./admin-2/inicio-admin-2/inicio-admin-2.component').then(m => m.InicioAdmin2Component) },
      { path: 'datos-generales', loadComponent: () => import('./admin-2/datos-generales-admin-2/datos-generales-admin-2.component').then(m => m.DatosGeneralesAdmin2Component) },
      { path: 'captura-alumnos', loadComponent: () => import('./admin-2/capturas-alumnos-admin-2/capturas-alumnos-admin-2.component').then(m => m.CapturasAlumnosAdmin2Component) },
      { path: 'captura-maestros', loadComponent: () => import('./admin-2/capturas-maestros-admin-2/capturas-maestros-admin-2.component').then(m => m.CapturasMaestrosAdmin2Component) },
      { path: 'captura-administrativos', loadComponent: () => import('./admin-2/capturas-administrativos-admin-2/capturas-administrativos-admin-2.component').then(m => m.CapturasAdministrativosAdmin2Component) },
      { path: 'captura-aviones', loadComponent: () => import('./admin-2/capturas-aviones-admin-2/capturas-aviones-admin-2.component').then(m => m.CapturasAvionesAdmin2Component) },
      { path: 'captura-cursos', loadComponent: () => import('./admin-2/capturas-cursos-admin-2/capturas-cursos-admin-2.component').then(m => m.CapturasCursosAdmin2Component) },
    ]
  },

  {
    path: 'admin-3',
    loadComponent: () => import('./admin-3/admin-3.component').then(m => m.Admin3Component),
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', loadComponent: () => import('./admin-3/inicio-admin-3/inicio-admin-3.component').then(m => m.InicioAdmin3Component) },
      { path: 'datos-generales', loadComponent: () => import('./admin-3/datos-generales-admin-3/datos-generales-admin-3.component').then(m => m.DatosGeneralesAdmin3Component) },
      { path: 'horas-vuelo', loadComponent: () => import('./admin-3/horas-vuelo-admin-3/horas-vuelo-admin-3.component').then(m => m.HorasVueloAdmin3Component) },
    ]
  },

  { path: '**', redirectTo: 'login' }
  ];
