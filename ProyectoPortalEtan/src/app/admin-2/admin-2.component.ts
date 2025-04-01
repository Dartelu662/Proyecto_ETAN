import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';


@Component({
  selector: 'app-admin-2',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './admin-2.component.html',
  styleUrl: './admin-2.component.css'
})
export class Admin2Component {
  menuActivo = false;
  constructor(private authService: AuthentificationService, private router: Router) {}
  toggleMenu() {
    this.menuActivo = !this.menuActivo;
  }

  logout(): void {
    this.authService.logout()
      .then(() => {
      this.router.navigate(['/login']);
      })
      .catch(error => {
        console.error('Error al cerrar sesión:', error);
      });
  }
}
