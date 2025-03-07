import { Component, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"

interface Alumno {
  matricula: string
  nombre: string
  apellidoPaterno: string
  apellidoMaterno: string
  correo1: string
  correo2: string
  celular: string
  direccion: string
  fechaNacimiento: Date
  fechaFinPermiso: Date
}

@Component({
  selector: 'app-datos-generales-alumno',
  imports: [CommonModule],
  templateUrl: './datos-generales-alumno.component.html',
  styleUrl: './datos-generales-alumno.component.css'
})
export class DatosGeneralesAlumnoComponent implements OnInit{
  alumno: Alumno = {
    matricula: "A12345678",
    nombre: "Juan",
    apellidoPaterno: "Pérez",
    apellidoMaterno: "García",
    correo1: "juan.perez@ejemplo.com",
    correo2: "juanpg@otrocorreo.com",
    celular: "555-123-4567",
    direccion: "Calle Principal 123, Ciudad Ejemplo, CP 12345",
    fechaNacimiento: new Date("1995-05-15"),
    fechaFinPermiso: new Date("2025-12-31"),
  }

  get nombreCompleto(): string {
    return `${this.alumno.nombre} ${this.alumno.apellidoPaterno} ${this.alumno.apellidoMaterno}`
  }

  constructor() {}

  ngOnInit(): void {}

  formatDate(date: Date): string {
    return date.toLocaleDateString("es-ES", { year: "numeric", month: "2-digit", day: "2-digit" })
  }
}
