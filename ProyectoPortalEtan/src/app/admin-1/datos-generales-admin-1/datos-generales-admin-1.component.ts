import { Component, OnInit, NgZone } from "@angular/core"
import { CommonModule } from "@angular/common"
import { AlumnoService } from "../../services/alumno.service"
import { UsuarioService } from "../../services/usuario.service"
import { Auth, user, User } from "@angular/fire/auth"
import Usuario from "../../interfaces/usuario.interface"
import { AuthentificationService } from "../../services/authentification.service"

@Component({
  selector: 'app-datos-generales-admin-1',
  imports: [CommonModule],
  templateUrl: './datos-generales-admin-1.component.html',
  styleUrl: './datos-generales-admin-1.component.css'
})
export class DatosGeneralesAdmin1Component {
  
    usuarioAutenticado!: User | null
    user: Usuario | null = null
  
    constructor(
      private alumnoService: AlumnoService,
      private usuarioService: UsuarioService,
      private auth: Auth,
      private authentificationService: AuthentificationService
    ) {}
  
    get nombreCompleto(): string {
      return this.user ? `${this.user.Nombres} ${this.user.ApellidoP} ${this.user.ApellidoM}` : ''
    }
  
    async ngOnInit(): Promise<void> {
      this.authentificationService.retornarUsuarioActual()
      .then(v => {
        this.user = v;
      })
    }
  
    formatDate(date: string | null | undefined): string | null {
      if (!date) return null
      return new Date(date).toLocaleDateString("es-ES", { year: "numeric", month: "2-digit", day: "2-digit" })
    }
}
