import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { AvionesService } from '../../services/aviones.service';
import Avion from '../../interfaces/avion.interface';

@Component({
  selector: 'app-pagos-admin-2',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pagos-admin-2.component.html',
  styleUrls: ['./pagos-admin-2.component.scss']
})
export class PagosAdmin2Component implements OnInit {
  pagoForm: FormGroup;
  listaAviones: Avion[] = [];

  constructor(
    private firestore: Firestore,
    private avionService: AvionesService,
    private fb: FormBuilder
  ) {
    this.pagoForm = this.fb.group({
      matricula: ['', Validators.required],
      fechaPago: ['', Validators.required],
      montoPago: [null, [Validators.required, Validators.min(1)]],
      medioPago: ['Efectivo', Validators.required],
      tipoPago: ['', Validators.required],
      avion: ['', Validators.required], // guardamos el id del avión aquí
      hrsVuelo: [null, [Validators.required, Validators.min(1)]],
    });
  }
  get tipoPagoSeleccionado(): string {
    return this.pagoForm.get('tipoPago')?.value;
  }

  debeMostrarAviones(tipo: string): boolean {
    const tiposQueUsanAvion = [
      'Crédito Horas Vuelo',
       ];
    return tiposQueUsanAvion.includes(tipo);
  }


  ngOnInit(): void {
    this.avionService.getAviones().subscribe((aviones: Avion[]) => {
      this.listaAviones = aviones;
      console.log('Aviones recibidos:', this.listaAviones);
    });

    // Asegúrate de que el select de avión arranque deshabilitado
  this.pagoForm.get('avion')?.disable();

  // Escuchar cambios en el tipo de pago para activar/desactivar el select de avión
  this.pagoForm.get('tipoPago')?.valueChanges.subscribe((nuevoTipo: string) => {
    const avionControl = this.pagoForm.get('avion');

    if (this.debeMostrarAviones(nuevoTipo)) {
      avionControl?.enable();
    } else {
      avionControl?.disable();
      avionControl?.reset(); // opcional: limpia el valor seleccionado
    }
  });

  }

  async guardarPago() {
    if (this.pagoForm.invalid) {
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }

    const avionSeleccionado = this.listaAviones.find(a => a.id === this.pagoForm.value.avion);

    const nuevoPago = {
      ...this.pagoForm.value,
      avionInfo: {
        id: avionSeleccionado?.id || '',
        modelo: avionSeleccionado?.Modelo || '',
        numeroRegistro: avionSeleccionado?.NumeroRegistro || ''
      }
    };

    try {
      const pagosRef = collection(this.firestore, 'pagos');
      await addDoc(pagosRef, nuevoPago);
      console.log('Pago agregado con éxito.', pagosRef);
      alert('Pago registrado con éxito.');
      this.pagoForm.reset();


      // Volvemos a asignar el avión por defecto si es necesario
      if (this.listaAviones.length > 0) {
        this.pagoForm.patchValue({ avion: this.listaAviones[0].id });
      }
    } catch (error) {
      console.error('Error al guardar el pago:', error);
    }
  }
}
