import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-2',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './admin-2.component.html',
  styleUrl: './admin-2.component.css'
})
export class Admin2Component {
  menuActivo = false;

  toggleMenu() {
    this.menuActivo = !this.menuActivo;
  }
}
