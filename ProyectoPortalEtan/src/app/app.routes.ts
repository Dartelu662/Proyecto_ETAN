import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { admin1Guard } from './guards/admin-1.guard';
import { admin2Guard } from './guards/admin-2.guard';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: 'registro', loadComponent: () => import('./registro-usuario/registro-usuario.component').then(m => m.RegistroUsuarioComponent) },

  { 
    path: 'alumno', 
    loadComponent: () => import('./alumno/alumno.component').then(m => m.AlumnoComponent),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'datos-generales', pathMatch: 'full' },
      { path: 'datos-generales', loadComponent: () => import('./alumno/datos-generales-alumno/datos-generales-alumno.component').then(m => m.DatosGeneralesAlumnoComponent) },
      { path: 'vuelos', loadComponent: () => import('./alumno/vuelos-alumno/vuelos-alumno.component').then(m => m.VuelosAlumnoComponent) },
      { path: 'calificaciones', loadComponent: () => import('./alumno/calificaciones-alumno/calificaciones-alumno.component').then(m => m.CalificacionesAlumnoComponent) },
      //{ path: 'pagos', loadComponent: () => import('./alumno/pagos-alumno/pagos-alumno.component').then(m => m.PagosAlumnoComponent) },
    ]
  },

  {
    path: 'admin-1',
    loadComponent: () => import('./admin-1/admin-1.component').then(m => m.Admin1Component),
    canActivate: [admin1Guard],
    children: [
      { path: '', redirectTo: 'datos-generales', pathMatch: 'full' },
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
    canActivate: [admin2Guard],
    loadComponent: () => import('./admin-2/admin-2.component').then(m => m.Admin2Component),
    children: [
      { path: '', redirectTo: 'datos-generales', pathMatch: 'full' },
      { path: 'datos-generales', loadComponent: () => import('./admin-2/datos-generales-admin-2/datos-generales-admin-2.component').then(m => m.DatosGeneralesAdmin2Component) },
      { path: 'horas-vuelo', loadComponent: () => import('./admin-2/horas-vuelo-admin-2/horas-vuelo-admin-2.component').then(m => m.HorasVueloAdmin2Component)},
      { path: 'pagos', loadComponent: () => import('./admin-2/pagos-admin-2/pagos-admin-2.component').then(m => m.PagosAdmin2Component)},
      { path: 'informes-escolar', loadComponent: () => import('./admin-2/informes-escolar-admin-2/informes-escolar-admin-2.component').then(m => m.InformesEscolarAdmin2Component)}, 
    ]
  },

  { path: '**', redirectTo: 'login' }
  ];
