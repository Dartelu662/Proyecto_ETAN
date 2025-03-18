import { Routes } from '@angular/router';
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
      { path: 'calificaciones', loadComponent: () => import('./maestro/calificaciones-maestro/calificaciones-maestro.component').then(m => m.CalificacionesMaestroComponent) },
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

  { path: '**', component: Pagina404Component }
  
  ];
