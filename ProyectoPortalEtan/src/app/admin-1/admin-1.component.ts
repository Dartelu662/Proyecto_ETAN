import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-1',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './admin-1.component.html',
  styleUrl: './admin-1.component.css'
})
export class Admin1Component {
  menuActivo = false;

  toggleMenu() {
    this.menuActivo = !this.menuActivo;
  }
}
