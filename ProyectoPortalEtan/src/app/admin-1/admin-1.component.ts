import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-admin-1',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './admin-1.component.html',
  styleUrl: './admin-1.component.css'
})
export class Admin1Component {

  constructor(private authService: AuthentificationService, private router: Router) {}
  menuActivo = false;

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
