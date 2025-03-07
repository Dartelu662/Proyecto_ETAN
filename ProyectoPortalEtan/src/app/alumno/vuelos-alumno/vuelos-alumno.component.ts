import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { MatDatepickerModule } from "@angular/material/datepicker"
import { MatInputModule } from "@angular/material/input"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatButtonModule } from "@angular/material/button"
import { FormsModule } from "@angular/forms"


@Component({
  selector: 'app-vuelos-alumno',
  imports: [CommonModule],
  templateUrl: './vuelos-alumno.component.html',
  styleUrl: './vuelos-alumno.component.css'
})
export class VuelosAlumnoComponent implements OnInit{
  diasDisponibles: string[] = ["2025-02-25", "2025-02-27", "2025-02-29"] // Lista de días disponibles
  fechaActual: Date = new Date()
  mes: number = this.fechaActual.getMonth()
  anio: number = this.fechaActual.getFullYear()
  diaHoy: number = this.fechaActual.getDate()
  mesHoy: number = this.mes
  anioHoy: number = this.anio
  fechaSeleccionada: string | null = null
  nombreMes = ""

  calendario: any[] = []

  constructor() {}

  ngOnInit(): void {
    this.generarCalendario()
    this.actualizarNombreMes()
  }

  generarCalendario(): void {
    const primerDia = new Date(this.anio, this.mes, 1).getDay()
    const totalDias = new Date(this.anio, this.mes + 1, 0).getDate()

    this.calendario = []

    let fila: any[] = []
    for (let i = 0; i < primerDia; i++) {
      fila.push(null)
    }

    for (let dia = 1; dia <= totalDias; dia++) {
      const fecha = `${this.anio}-${(this.mes + 1).toString().padStart(2, "0")}-${dia.toString().padStart(2, "0")}`
      const diaData = {
        dia,
        fecha,
        disponible: this.diasDisponibles.includes(fecha), // Marca si el día es seleccionable
        hoy: dia === this.diaHoy && this.mes === this.mesHoy && this.anio === this.anioHoy,
        seleccionado: false,
      }

      fila.push(diaData)

      if (fila.length === 7) {
        this.calendario.push(fila)
        fila = []
      }
    }

    if (fila.length > 0) {
      while (fila.length < 7) {
        fila.push(null)
      }
      this.calendario.push(fila)
    }

    // Asegurarse de que siempre haya 6 filas
    while (this.calendario.length < 6) {
      this.calendario.push(new Array(7).fill(null))
    }
  }

  seleccionarFecha(fecha: string): void {
    if (this.fechaSeleccionada) {
      const fechaSeleccionada = this.calendario.flat().find((d) => d && d.fecha === this.fechaSeleccionada)
      if (fechaSeleccionada) {
        fechaSeleccionada.seleccionado = false
      }
    }

    const diaSeleccionado = this.calendario.flat().find((d) => d && d.fecha === fecha)
    if (diaSeleccionado && diaSeleccionado.disponible) { // Solo se selecciona si el día está disponible
      diaSeleccionado.seleccionado = true
      this.fechaSeleccionada = fecha
    }
  }

  confirmarSeleccion(): void {
    if (this.fechaSeleccionada) {
      console.log(`Día seleccionado: ${this.fechaSeleccionada}`)
    } else {
      alert("No has seleccionado ninguna fecha.")
    }
  }

  cambiarMes(direccion: number): void {
    this.mes += direccion
    if (this.mes < 0) {
      this.mes = 11
      this.anio--
    } else if (this.mes > 11) {
      this.mes = 0
      this.anio++
    }
    this.generarCalendario()
    this.actualizarNombreMes()
  }

  actualizarNombreMes(): void {
    const meses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ]
    this.nombreMes = `${meses[this.mes]} ${this.anio}`
  }
}
