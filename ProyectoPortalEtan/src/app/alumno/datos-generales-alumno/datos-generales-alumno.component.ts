import { Component, OnInit, NgZone } from "@angular/core"
import { CommonModule } from "@angular/common"
import { AlumnoService } from "../../services/alumno.service"
import { UsuarioService } from "../../services/usuario.service"
import { Auth, user, User } from "@angular/fire/auth"
import Usuario from "../../interfaces/usuario.interface"



@Component({
  selector: 'app-datos-generales-alumno',
  imports: [CommonModule],
  templateUrl: './datos-generales-alumno.component.html',
  styleUrl: './datos-generales-alumno.component.css'
})
export class DatosGeneralesAlumnoComponent implements OnInit{

  usuarioAutenticado!: User | null
  user: Usuario | null = null

  constructor(
    private alumnoService: AlumnoService,
    private usuarioService: UsuarioService,
    private auth: Auth,
    private ngZone: NgZone
  ) {}

  get nombreCompleto(): string {
    return this.user ? `${this.user.Nombres} ${this.user.ApellidoP} ${this.user.ApellidoM}` : ''
  }

  async ngOnInit(): Promise<void> {
    user(this.auth).subscribe(async (usuario) => {
      if (!usuario) return

      this.ngZone.run(async () => {
        this.usuarioAutenticado = usuario

        if (usuario.email) {
          const usuarioDB = await this.usuarioService.getUsuarioByUserName(usuario.email)
          if (usuarioDB) {
            this.user = usuarioDB
          }
        }
      })
    })
  }

  formatDate(date: string | null | undefined): string | null {
    if (!date) return null
    return new Date(date).toLocaleDateString("es-ES", { year: "numeric", month: "2-digit", day: "2-digit" })
  }
}
