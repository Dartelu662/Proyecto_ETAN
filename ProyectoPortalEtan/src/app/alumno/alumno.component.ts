import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-alumno',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './alumno.component.html',
  styleUrl: './alumno.component.css'
})
export class AlumnoComponent {
  menuActivo = false;
  constructor(private authService: AuthentificationService, private router: Router) {}
  toggleMenu() {
    this.menuActivo = !this.menuActivo;
  }

  logout(): void {
    this.authService.logout()
      .then(() => {
      this.router.navigate(['/login']);  // Redirige al login
      })
      .catch(error => {
        console.error('Error al cerrar sesión:', error);
      });
  }
}
