import { Component, OnInit, ViewChild, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';

import { AvionesService } from '../../services/aviones.service';
import { HrsvueloService } from '../../services/hrsvuelo.service';
import { UsuarioService } from '../../services/usuario.service';

import { Auth } from '@angular/fire/auth';
import { HrsVuelo } from '../../interfaces/hrsvuelo.interface';
import Avion from '../../interfaces/avion.interface';

declare const paypal: any;

@Component({
  selector: 'app-vuelos-alumno',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatRadioModule,
    MatCardModule
  ],
  templateUrl: './vuelos-alumno.component.html',
  styleUrls: ['./vuelos-alumno.component.css']
})
export class VuelosAlumnoComponent implements OnInit {
  @ViewChild('paypal', { static: false }) paypalElement!: ElementRef;

  dateFormGroup: FormGroup;
  timeFormGroup: FormGroup;
  planeFormGroup: FormGroup;
  paymentFormGroup: FormGroup;

  timeSlots = [
    '8:00 AM','9:30 AM','11:00 AM','12:30 PM',
    '2:00 PM','3:30 PM','5:00 PM','6:30 PM'
  ];
  listaAviones: Avion[] = [];
  selectedAvion?: Avion;

  montoPago = 0;
  horasDisponibles = 0;
  tieneHorasCredito = false;
  creditChecked = false;

  matricula: string | null = null;

  private fb = inject(FormBuilder);
  private avionService = inject(AvionesService);
  private hrsVueloService = inject(HrsvueloService);
  private usuarioService = inject(UsuarioService);
  private auth = inject(Auth);

  constructor() {
    this.dateFormGroup    = this.fb.group({ date: ['', Validators.required] });
    this.timeFormGroup    = this.fb.group({ timeSlot: ['', Validators.required] });
    this.planeFormGroup   = this.fb.group({ listaAviones: ['', Validators.required] });
    this.paymentFormGroup = this.fb.group({ metodoPago: ['', Validators.required] });
  }

  ngOnInit(): void {
    // 1) Lista de aviones
    this.avionService.getAviones().subscribe(avs => {
      console.log('Aviones cargados:', avs);
      this.listaAviones = avs;
    });

    // 2) Matrícula del usuario
    const user = this.auth.currentUser;
    if (user?.email) {
      this.usuarioService.getUsuarioByEMail(user.email)
        .then(u => {
          console.log('UsuarioService.getUsuarioByEMail:', u);
          this.matricula = u?.UserName ?? null;
        })
        .catch(err => console.error('Error UsuarioService:', err));
    }

    // 3) Cambio de método de pago
    this.paymentFormGroup.get('metodoPago')!
      .valueChanges
      .subscribe((metodo: 'paypal'|'credito') => {
        console.log('Método de pago seleccionado:', metodo);
        if (!this.selectedAvion) return;
        if (metodo === 'paypal') {
          this.renderizarPaypal();
        } else {
          this.verificarCredito();
        }
      });
  }

  onAvionSeleccionado(): void {
    this.selectedAvion = this.planeFormGroup.value.listaAviones;
    console.log('Avión seleccionado:', this.selectedAvion);
    this.montoPago = this.selectedAvion?.CostoHoraVuelo || 0;
    const metodo = this.paymentFormGroup.value.metodoPago;
    if (metodo === 'paypal') this.renderizarPaypal();
    if (metodo === 'credito') this.verificarCredito();
  }

  onMetodoPagoChange(): void {
    const metodo = this.paymentFormGroup.value.metodoPago;
    console.log('onMetodoPagoChange ->', metodo);
    if (!this.selectedAvion) return;
    metodo === 'paypal' ? this.renderizarPaypal() : this.verificarCredito();
  }

  private renderizarPaypal(): void {
    if (!this.paypalElement || typeof paypal === 'undefined') return;
    this.paypalElement.nativeElement.innerHTML = '';
    paypal.Buttons({
      createOrder: (_: any, actions: any) => actions.order.create({
        purchase_units: [{
          description: `Vuelo ${this.selectedAvion!.Modelo}`,
          amount: { currency_code: 'MXN', value: this.montoPago.toString() }
        }]
      }),
      onApprove: async (_: any, actions: any) => {
        const order = await actions.order.capture();
        console.log('PayPal onApprove, order =', order);
        this.guardarReserva('paypal', order);
      },
      onError: (err: any) => console.error('PayPal error:', err)
    }).render(this.paypalElement.nativeElement);
  }

  private verificarCredito(): void {
    if (!this.selectedAvion || !this.matricula) {
      console.error('verificarCredito: falta selectedAvion o matricula');
      return;
    }

    this.creditChecked = false;
    this.horasDisponibles = 0;
    this.tieneHorasCredito = false;

    const avionId = this.selectedAvion.id;
    console.log('verificarCredito para:', this.matricula, avionId);

    this.hrsVueloService.verificarHorasCredito(this.matricula, avionId!)
      .subscribe({
        next: horas => {
          console.log('verificarHorasCredito -> horas =', horas);
          this.horasDisponibles = horas;
          this.tieneHorasCredito = horas > 0;
          this.creditChecked = true;
        },
        error: err => {
          console.error('Error en verificarHorasCredito:', err);
          this.creditChecked = true;
        }
      });
  }

  private guardarReserva(
    metodo: 'paypal' | 'credito',
    pagoInfo: any = null
  ): void {
    if (!this.selectedAvion || !this.matricula) {
      console.error('guardarReserva: falta selectedAvion o matricula');
      return;
    }

    const avionId = this.selectedAvion.id;
    if (!avionId) {
      console.error('guardarReserva: avión sin id');
      return;
    }

    console.log(`guardarReserva: metodo=${metodo}, matricula=${this.matricula}, avionId=${avionId}, monto=${this.montoPago}`);

    if (metodo === 'paypal') {
      // Insertar nuevo registro en 'pagos'
      const reserva: HrsVuelo = {
        Matricula:  this.matricula,
        Fecha:      this.dateFormGroup.value.date,
        Hora:       this.timeFormGroup.value.timeSlot,
        Avion:      avionId,
        MetodoPago: 'paypal',
        Monto:      this.montoPago,
        hrsVuelo:   0,
        PagoInfo:   pagoInfo
      };
      console.log('Llamando registrarPago with', reserva);
      this.hrsVueloService.registrarPago(reserva).subscribe({
        next: () => console.log('✅ PayPal registrado en Firestore'),
        error: err => console.error('❌ Error registrarPago:', err)
      });

    } else {
      // Actualizar hrsVuelo en el último registro
      console.log('Llamando actualizarHorasCredito...');
      this.hrsVueloService
        .actualizarHorasCredito(this.matricula, avionId, this.montoPago)
        .subscribe({
          next: () => console.log('✅ Crédito actualizado en Firestore'),
          error: err => console.error('❌ Error actualizarHorasCredito:', err)
        });
    }
  }

  pagoValido(): boolean {
    const metodo = this.paymentFormGroup.value.metodoPago;
    return metodo === 'paypal'
      ? this.montoPago > 0
      : (this.creditChecked && this.horasDisponibles > 0);
  }

  confirmarReserva(): void {
    const metodo = this.paymentFormGroup.value.metodoPago;
    console.log('confirmarReserva -> metodo =', metodo);
    if (metodo === 'credito') {
      this.guardarReserva('credito');
    }
  }

  formatDate(d: Date): string {
    return new Date(d).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
