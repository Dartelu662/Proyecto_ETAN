import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-3',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './admin-3.component.html',
  styleUrl: './admin-3.component.css'
})
export class Admin3Component {
  menuActivo = false;

  toggleMenu() {
    this.menuActivo = !this.menuActivo;
  }
}
