import { Component, OnInit } from '@angular/core';
import Avion from '../../interfaces/avion.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AvionesService } from '../../services/aviones.service';

@Component({
  selector: 'app-capturas-aviones-admin-1',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './capturas-aviones-admin-1.component.html',
  styleUrl: './capturas-aviones-admin-1.component.scss'
})

export class CapturasAvionesAdmin1Component implements OnInit{
  aviones: Avion[] = []; // Lista de aviones
    nuevoAvion: Avion = this.inicializarAvion(); // Avion para agregar
    avionSeleccionado: Avion | null = null; // Avion que se edita
  
    constructor(private avionesService: AvionesService) {}
  
    ngOnInit(): void {
      // Obtener la lista de aviones
        this.avionesService.getAviones().subscribe(avion => {
        this.aviones = avion;
        console.log('Lista de aviones:', avion);
      });
    }
  
    // Inicializa un objeto Avion vacío
    inicializarAvion(): Avion {
      return {
        Modelo: '',
        NumeroRegistro: '',
        AnioFabricacion: '',
        FchaUltimoMtto: '',
        CostoHoraVuelo: 0,
        Activo: true,
      };
    }
  
    // Agregar un nuevo avion
    async crearAvion(): Promise<void> {
      const result = await this.avionesService.AddAvion(this.nuevoAvion);
      if (result) {
        console.log('Avion agregado:', result.id);
        this.nuevoAvion = this.inicializarAvion();
      } else {
        alert('Error con el servidor');
      }
    }
  
    // Seleccionar un avion para edición
    seleccionarAvion(avion: Avion): void {
      this.avionSeleccionado = { ...avion };
    }
  
    async confirmarEliminarAvion(avion: Avion) {
      const confirmacion = window.confirm(`¿Estás seguro de que deseas desactivar a ${avion.Modelo} ${avion.NumeroRegistro}?`);
    if (confirmacion && avion.id) {
      const desactivado = await this.avionesService.deleteAvion(avion.id);
      if (desactivado) {
        console.log('Avion desactivado correctamente.');
      } else {
        console.log('ha ocurrido un error');
      }
    }
    }
    
    async actualizarAvion(): Promise<void> {
      if (!this.avionSeleccionado) return;
  
      const result = await this.avionesService.UpdateAvion(this.avionSeleccionado);
      if (result) {
        console.log('Avion actualizado:', this.avionSeleccionado.id);
        this.avionSeleccionado = null;
      } else {
        console.error('Error al actualizar avion');
      }
    }
  
    // Cancelar edición
    cancelarEdicion(): void {
      this.avionSeleccionado = null;
    }
}