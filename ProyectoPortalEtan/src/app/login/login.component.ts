import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @ViewChild('username') username!: ElementRef;
  @ViewChild('password') password!: ElementRef;
  @ViewChild('imgVisible') imgVisible!: ElementRef;

  constructor(private router: Router) {}

  togglePassword() {
    const img = this.imgVisible.nativeElement;
    const pass = this.password.nativeElement;
  
    if (img.getAttribute('xlink:href') === '#icon-eye') {
      pass.type = 'text';
      img.setAttribute('xlink:href', '#icon-eye-slash');
    } else {
      pass.type = 'password';
      img.setAttribute('xlink:href', '#icon-eye');
    }
  }
  


  submitForm(event: Event) {
    event.preventDefault();  // Previene el envío automático del formulario

    const user = this.username.nativeElement.value;
    const pass = this.password.nativeElement.value;

    if (user && pass) {
      this.router.navigate(['/alumno']);
    } else {
      console.log('Por favor, complete todos los campos.');
    }
  }
}
