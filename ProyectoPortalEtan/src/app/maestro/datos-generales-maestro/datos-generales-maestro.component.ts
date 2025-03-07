import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface Maestro {
  usuario: string
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
  selector: 'app-datos-generales-maestro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './datos-generales-maestro.component.html',
  styleUrl: './datos-generales-maestro.component.css'
})
export class DatosGeneralesMaestroComponent implements OnInit {
  maestro: Maestro = {
    usuario: "juanpg",
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
    return `${this.maestro.nombre} ${this.maestro.apellidoPaterno} ${this.maestro.apellidoMaterno}`
  }

  constructor() {}

  ngOnInit(): void {}

  formatDate(date: Date): string {
    return date.toLocaleDateString("es-ES", { year: "numeric", month: "2-digit", day: "2-digit" })
  }
}
