import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-maestro',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './maestro.component.html',
  styleUrl: './maestro.component.css'
})
export class MaestroComponent{
  menuActivo = false;

  toggleMenu() {
    this.menuActivo = !this.menuActivo;
  }
}
