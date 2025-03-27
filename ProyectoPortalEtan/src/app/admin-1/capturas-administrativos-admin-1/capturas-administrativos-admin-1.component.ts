import { Component, OnInit } from '@angular/core';
import Usuario from '../../interfaces/usuario.interface';
import Admin from '../../interfaces/admin.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Auth from '../../interfaces/auth.interface';
import { AdminService } from '../../services/admin.service';
import { AuthentificationService } from '../../services/authentification.service';


@Component({
  selector: 'app-capturas-administrativos-admin-1',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './capturas-administrativos-admin-1.component.html',
  styleUrl: './capturas-administrativos-admin-1.component.scss'
})

export class CapturasAdministrativosAdmin1Component implements OnInit{

  constructor (private adminService:AdminService, private authService: AuthentificationService){ }

  // Creamos un objeto que contenga tanto los datos de Usuario como la propiedad para el admin
  usuario: Usuario = {
    UserName: '',
    TipoUsuario: 'admin',
    Nombres: '',
    ApellidoP: '',
    ApellidoM: '',
    Email: '',
    Celular: '',
    Direccion: '',
    FechaNac: '',
    FechaIngreso: '',
    Activo: true
  };

  // Objeto de tipo Admin
  admin: Admin = {
    TipoAdmin: '',
    IdAdmin: 1
  };

  auth: Auth = {
    Email: '',
    Password: ''
}

  ngOnInit(): void {}

  onSubmit(): void {
    
    if (this.admin.TipoAdmin === "Administrador tipo 1") {
      this.admin.IdAdmin = 1;
    } if (this.admin.TipoAdmin === "Administrador tipo 2") {
      this.admin.IdAdmin = 2;
    } 
    this.auth.Email=this.usuario.Email
    if(this.auth.Password.length >= 6)
    {
      this.authService.registrer(this.auth)
      .then((result) => {
        this.adminService.AddAdmin(this.admin, this.usuario)
        .then((result) => {
          if (result === null) {
            alert('El nombre de usuario ya existe.');
          } else {
            alert('Usuario creado con exito');
            console.log('Usuario creado:', result);
          }
        })
        .catch((error) => { 
          console.error('Error al crear el usuario:', error);
          alert(error);
        })
      })
      .catch((error) => { 
        console.error('Error al crear el usuario:', error);
        alert(error);
      })
    
    } else {
      alert("Su contraseña debe contener minimo 6 caracteres");
    }
  }
}
