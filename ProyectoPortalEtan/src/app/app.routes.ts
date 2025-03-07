import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
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
    { path: 'login', component: LoginComponent },
    { 
      path: 'alumno', component: AlumnoComponent, 
      children: [
        { path: '', redirectTo: 'inicio', pathMatch: 'full' },
        { path: 'inicio', component: InicioAlumnoComponent },
        { path: 'datos-generales', component: DatosGeneralesAlumnoComponent },
        { path: 'vuelos', component: VuelosAlumnoComponent },
        { path: 'calificaciones', component: CalificacionesAlumnoComponent },
        { path: 'pagos', component: PagosAlumnoComponent },
      ]
    },
    { 
      path: 'maestro', component: MaestroComponent, 
      children: [
        { path: '', redirectTo: 'inicio', pathMatch: 'full' },
        { path: 'inicio', component: InicioMaestroComponent },
        { path: 'datos-generales', component: DatosGeneralesMaestroComponent },
        { path: 'calificaciones', component: CalificacionesMaestroComponent },
        { path: 'cursos', component: CursosMaestroComponent },
      ]
    },
    {
      path: 'admin-1', component: Admin1Component,
      children: [
        { path: '', redirectTo: 'inicio', pathMatch: 'full' },
        { path: 'inicio', component: InicioAdmin1Component },
        { path: 'datos-generales', component: DatosGeneralesAdmin1Component },
        { path: 'captura-alumnos', component: CapturasAlumnosAdmin1Component},
        { path: 'captura-maestros', component: CapturasMaestrosAdmin1Component},
        { path: 'captura-administrativos', component: CapturasAdministrativosAdmin1Component},
        { path: 'captura-aviones', component: CapturasAvionesAdmin1Component},
        { path: 'captura-cursos', component: CapturasCursosAdmin1Component},
        { path: 'pagos', component: PagosAdmin1Component},
        { path: 'horas-vuelo', component: HorasVueloAdmin1Component},
      ]
    },
    {
      path: 'admin-2', component: Admin2Component,
      children: [
        { path: '', redirectTo: 'inicio', pathMatch: 'full' },
        { path: 'inicio', component: InicioAdmin2Component },
        { path: 'datos-generales', component: DatosGeneralesAdmin2Component },
        { path: 'captura-alumnos', component: CapturasAlumnosAdmin2Component},
        { path: 'captura-maestros', component: CapturasMaestrosAdmin2Component},
        { path: 'captura-administrativos', component: CapturasAdministrativosAdmin2Component},
        { path: 'captura-aviones', component: CapturasAvionesAdmin2Component},
        { path: 'captura-cursos', component: CapturasCursosAdmin2Component},
      ]
    },
    {
      path: 'admin-3', component: Admin3Component,
      children: [
        { path: '', redirectTo: 'inicio', pathMatch: 'full' },
        { path: 'inicio', component: InicioAdmin3Component },
        { path: 'datos-generales', component: DatosGeneralesAdmin3Component },
        { path: 'horas-vuelo', component: HorasVueloAdmin3Component},
      ]
    },
    { path: '**', redirectTo: 'login' }
  ];;
