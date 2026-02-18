import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-cambiar-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent {
  email: string = '';
  mensaje: string = '';
  cargando: boolean = false;

  constructor(private authService: AuthentificationService, private router: Router) {}

  async enviarRecuperacion() {
    this.mensaje = '';

  if (!this.email || !this.email.includes('@')) {
    this.mensaje = 'Por favor, ingresa un correo válido.';
    return;
  }

  this.cargando = true;

  try {
    const methods = await this.authService.recuperarPassword(this.email);
    await console.log(methods);
    this.mensaje =
      'Se ha enviado un correo de recuperación a tu email. Por favor, revisa tu bandeja de entrada.';

  } catch (error) {
    console.error(error);

    this.mensaje =
      'Ocurrió un error al intentar enviar el correo. Intenta nuevamente.';
  }

  this.cargando = false;
  }
}
