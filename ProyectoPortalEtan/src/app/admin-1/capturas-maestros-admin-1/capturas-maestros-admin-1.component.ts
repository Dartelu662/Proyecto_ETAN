import { Component, OnInit } from '@angular/core';
import Maestro from '../../interfaces/maestro.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaestroService } from '../../services/maestro.service';

@Component({
  selector: 'app-capturas-maestros-admin-1',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './capturas-maestros-admin-1.component.html',
  styleUrls: ['./capturas-maestros-admin-1.component.scss']
})
export class CapturasMaestrosAdmin1Component implements OnInit{

  maestros: Maestro[] = []; // Lista de maestros
  nuevoMaestro: Maestro = this.inicializarMaestro(); // Maestro para agregar
  maestroSeleccionado: Maestro | null = null; // Maestro que se edita

  constructor(private maestroService: MaestroService) {}

  ngOnInit(): void {
    // Obtener la lista de maestros
    this.maestroService.GetMaestros().subscribe(maestros => {
      this.maestros = maestros;
      console.log('Lista de Maestros:', maestros);
    });
  }

  // Inicializa un objeto Maestro vacío
  inicializarMaestro(): Maestro {
    return {
      Nombres: '',
      ApellidoP: '',
      ApellidoM: '',
      Email: '',
      Celular: '',
      Direccion: '',
      FechaNac: '',
      FechaIngreso: '',
      TipoLicencia1: '',
      TipoLicencia2: '',
      TipoLicencia3: '',
      Activo: true
    };
  }

  // Agregar un nuevo maestro
  async crearMaestro(): Promise<void> {
    const result = await this.maestroService.AddMaestro(this.nuevoMaestro);
    if (result) {
      console.log('Maestro agregado:', result.id);
      this.nuevoMaestro = this.inicializarMaestro();
    } else {
      alert('Error con el servidor');
    }
  }

  // Seleccionar un maestro para edición
  seleccionarMaestro(maestro: Maestro): void {
    this.maestroSeleccionado = { ...maestro };
  }

  async confirmarEliminarMaestro(maestro: Maestro) {
    const confirmacion = window.confirm(`¿Estás seguro de que deseas desactivar a ${maestro.Nombres} ${maestro.ApellidoP}?`);
  if (confirmacion && maestro.id) {
    const desactivado = await this.maestroService.deleteMaestro(maestro.id);
    if (desactivado) {
      console.log('Maestro desactivado correctamente.');
    } else {
      console.log('ha ocurrido un error');
    }
  }
  }
  
  async actualizarMaestro(): Promise<void> {
    if (!this.maestroSeleccionado) return;

    const result = await this.maestroService.UpdateMaestro(this.maestroSeleccionado);
    if (result) {
      console.log('Maestro actualizado:', this.maestroSeleccionado.id);
      this.maestroSeleccionado = null;
    } else {
      console.error('Error al actualizar maestro');
    }
  }

  // Cancelar edición
  cancelarEdicion(): void {
    this.maestroSeleccionado = null;
  }
}