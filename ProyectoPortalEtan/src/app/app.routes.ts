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
import { CalificacionesMaestroComponent } from './admin-1/calificaciones-maestro/calificaciones-maestro.component';
import { Admin1Component } from './admin-1/admin-1.component';
import { Admin2Component } from './admin-2/admin-2.component';
import { InicioAdmin1Component } from './admin-1/inicio-admin-1/inicio-admin-1.component';
import { DatosGeneralesAdmin1Component } from './admin-1/datos-generales-admin-1/datos-generales-admin-1.component';
import { InicioAdmin2Component } from './admin-2/inicio-admin-2/inicio-admin-2.component';
import { DatosGeneralesAdmin2Component } from './admin-2/datos-generales-admin-2/datos-generales-admin-2.component';
import { CapturasEscolarAdmin1Component } from './admin-1/capturas-escolar-admin-1/capturas-escolar-admin-1.component';
import { CapturasAvionesAdmin1Component } from './admin-1/capturas-aviones-admin-1/capturas-aviones-admin-1.component';
import { CapturasCursosAdmin1Component } from './admin-1/capturas-cursos-admin-1/capturas-cursos-admin-1.component';
import { CapturasAdministrativosAdmin1Component } from './admin-1/capturas-administrativos-admin-1/capturas-administrativos-admin-1.component';
import { HorasVueloAdmin2Component } from './admin-2/horas-vuelo-admin-2/horas-vuelo-admin-2.component';
import { PagosAdmin2Component } from './admin-2/pagos-admin-2/pagos-admin-2.component';
import path from 'path';
import { Pagina404Component } from './pagina404/pagina404.component';

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
      { path: 'captura-administrativos', loadComponent: () => import('./admin-1/capturas-administrativos-admin-1/capturas-administrativos-admin-1.component').then(m => m.CapturasAdministrativosAdmin1Component)},
      { path: 'captura-aviones', loadComponent: () => import('./admin-1/capturas-aviones-admin-1/capturas-aviones-admin-1.component').then(m => m.CapturasAvionesAdmin1Component) },
      { path: 'captura-cursos', loadComponent: () => import('./admin-1/capturas-cursos-admin-1/capturas-cursos-admin-1.component').then(m => m.CapturasCursosAdmin1Component) },
      { path: 'captura-escolar', loadComponent: () => import('./admin-1/capturas-escolar-admin-1/capturas-escolar-admin-1.component').then(m=> m.CapturasEscolarAdmin1Component) },
      { path: 'calificaciones', loadComponent: () => import('./admin-1/calificaciones-maestro/calificaciones-maestro.component').then(m => m.CalificacionesMaestroComponent) },

    ]
  },

  {
    path: 'admin-2',
    loadComponent: () => import('./admin-2/admin-2.component').then(m => m.Admin2Component),
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', loadComponent: () => import('./admin-2/inicio-admin-2/inicio-admin-2.component').then(m => m.InicioAdmin2Component) },
      { path: 'datos-generales', loadComponent: () => import('./admin-2/datos-generales-admin-2/datos-generales-admin-2.component').then(m => m.DatosGeneralesAdmin2Component) },
      { path: 'horas-vuelo', loadComponent: () => import('./admin-2/horas-vuelo-admin-2/horas-vuelo-admin-2.component').then(m => m.HorasVueloAdmin2Component)},
      { path: 'pagos', loadComponent: () => import('./admin-2/pagos-admin-2/pagos-admin-2.component').then(m => m.PagosAdmin2Component)},
    ]
  },

  { path: '**', redirectTo: 'login' }
  ];
