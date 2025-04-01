import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { user } from 'rxfire/auth';
import { map, take, switchMap, catchError } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';
import { of, from } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);
  const usuarioService = inject(UsuarioService);

  return user(auth).pipe(
    take(1), // Obtiene el usuario solo una vez
    switchMap(user => {
      if (!user || !user.email) {
        console.log('Usuario no autenticado. Redirigiendo al login.');
        router.navigate(['/login']);
        return of(false);
      }

      console.log('Correo electrónico del usuario autenticado:', user.email);
      
      return from(usuarioService.getUsuarioByEMail(user.email)).pipe(
        map(usuario => {
          if (usuario && usuario.TipoUsuario === "Alumno") {
            return true;
          } else {
            console.log('Usuario no autorizado. Redirigiendo al login.');
            router.navigate(['/login']);
            return false;
          }
        }),
        catchError(err => {
          console.error("Ocurrió un error al obtener el usuario:", err);
          router.navigate(['/login']);
          return of(false);
        })
      );
    })
  );
};
