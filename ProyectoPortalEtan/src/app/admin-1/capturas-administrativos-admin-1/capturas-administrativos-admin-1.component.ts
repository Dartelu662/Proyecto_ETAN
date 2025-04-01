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
    TipoUsuario: 'Admin-1',
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

  ngOnInit(): void {
    this.adminService.GetAdmins().subscribe(admins => {
      admins.forEach(async (admin) => {
        if(admin.admin.id){
          const adminData = await this.adminService.GetAdminById(admin.admin.id);
          console.log(adminData);
        }
      });
    });
  }

  async onSubmit(): Promise<void> {
    const adminIds: { [key: string]: number } = {
      "Administrador tipo 1": 1,
      "Administrador tipo 2": 2
    };

    const tipoAdmin: { [key: string]: string } = {
      "Administrador tipo 1": 'Admin-1',
      "Administrador tipo 2": 'Admin-2'
    };

    this.admin.IdAdmin = adminIds[this.admin.TipoAdmin] || 1; // Default a 1 si no coincide
    this.usuario.TipoUsuario = tipoAdmin[this.admin.TipoAdmin] || 'Admin-1';
    this.auth.Email = this.usuario.Email;

    if (this.auth.Password.length < 6) {
      alert("Su contraseña debe contener mínimo 6 caracteres");
      return;
    }

    try {
      await this.authService.registrer(this.auth);
      const result = await this.adminService.AddAdmin(this.admin, this.usuario);
      
      if (!result) {
        alert('El nombre de usuario ya existe.');
      } else {
        alert('Usuario creado con éxito');
        console.log('Usuario creado:', result);
      }
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      alert("Ocurrió un error al registrar el usuario.");
    }
  }
}
