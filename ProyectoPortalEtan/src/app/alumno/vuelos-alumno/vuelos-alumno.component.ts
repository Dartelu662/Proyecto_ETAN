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
import { MatStepper } from '@angular/material/stepper';
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
  @ViewChild('stepper') stepper!: MatStepper;
  @ViewChild('paypal', { static: false }) paypalElement!: ElementRef;

  dateFormGroup:     FormGroup;
  timeFormGroup:     FormGroup;
  planeFormGroup:    FormGroup;
  paymentFormGroup:  FormGroup;

  timeSlots = ['8:00 AM','9:30 AM','11:00 AM','12:30 PM','2:00 PM','3:30 PM','5:00 PM','6:30 PM'];
  listaAviones: Avion[] = [];
  selectedAvion?:  Avion;

  montoPago = 0;
  horasDisponibles = 0;
  tieneHorasCredito = false;
  creditChecked = false;
  matricula: string | null = null;

  /** <-- NUEVO: Horas que se descuentan por reserva */
  readonly horasReserva = 1.5;

  private fb              = inject(FormBuilder);
  private avionService    = inject(AvionesService);
  private hrsVueloService = inject(HrsvueloService);
  private usuarioService  = inject(UsuarioService);
  private auth            = inject(Auth);

  constructor() {
    this.dateFormGroup    = this.fb.group({ date: ['', Validators.required] });
    this.timeFormGroup    = this.fb.group({ timeSlot: ['', Validators.required] });
    this.planeFormGroup   = this.fb.group({ listaAviones: ['', Validators.required] });
    this.paymentFormGroup = this.fb.group({ metodoPago: ['', Validators.required] });
  }

  ngOnInit(): void {
    // 1) cargar aviones
    this.avionService.getAviones().subscribe(avs => this.listaAviones = avs);

    // 2) obtener matrícula
    const user = this.auth.currentUser;
    if (user?.email) {
      this.usuarioService.getUsuarioByEMail(user.email)
        .then(u => this.matricula = u?.UserName ?? null)
        .catch(err => console.error(err));
    }

    // 3) al cambiar método
    this.paymentFormGroup.get('metodoPago')!
      .valueChanges
      .subscribe((m: 'paypal'|'credito') => {
        if (!this.selectedAvion) return;
        m==='paypal' ? this.renderizarPaypal() : this.verificarCredito();
      });
  }

  onAvionSeleccionado(): void {
    this.selectedAvion = this.planeFormGroup.value.listaAviones;
    this.montoPago     = this.selectedAvion?.CostoHoraVuelo || 0;
    const m = this.paymentFormGroup.value.metodoPago;
    if (m==='paypal') this.renderizarPaypal();
    if (m==='credito') this.verificarCredito();
  }

  onMetodoPagoChange(): void {
    const m = this.paymentFormGroup.value.metodoPago;
    if (!this.selectedAvion) return;
    m==='paypal' ? this.renderizarPaypal() : this.verificarCredito();
  }

  private renderizarPaypal(): void {
    if (!this.paypalElement||typeof paypal==='undefined') return;
    this.paypalElement.nativeElement.innerHTML = '';
    paypal.Buttons({
      createOrder: (_:any, act:any) => act.order.create({
        purchase_units:[{
          description:`Vuelo ${this.selectedAvion!.Modelo}`,
          amount:{currency_code:'MXN', value:this.montoPago.toString()}
        }]
      }),
      onApprove: async(_:any, act:any) => {
        const order = await act.order.capture();
        this.guardarReserva('paypal', order);
      },
      onError: console.error
    }).render(this.paypalElement.nativeElement);
  }

  private verificarCredito(): void {
    if (!this.selectedAvion||!this.matricula) return;
    this.creditChecked = false;
    this.horasDisponibles = 0;
    const id = this.selectedAvion.id;
    this.hrsVueloService.verificarHorasCredito(this.matricula, id!)
      .subscribe(h => {
        this.horasDisponibles = h;
        this.tieneHorasCredito = h > 0;
        this.creditChecked = true;
      }, console.error);
  }

  private guardarReserva(
    metodo: 'paypal'|'credito',
    info: any = null
  ): void {
    if (!this.selectedAvion||!this.matricula) return;
    const id = this.selectedAvion.id;
    console.log('Guardando reserva...', metodo, info);

    const reserva: HrsVuelo = {
      Matricula:  this.matricula,
      Fecha:      this.dateFormGroup.value.date,
      Hora:       this.timeFormGroup.value.timeSlot,
      Avion:      id!,
      MetodoPago: metodo,
      Monto:      this.montoPago,
      /** <-- NUEVO: restamos las horas de vuelo reservadas */
      hrsVuelo:   metodo==='credito'
                    ? - this.horasReserva
                    : 0,
      PagoInfo:   info
    };

    // 1) Siempre guardamos la reserva en HrsVuelo
    this.hrsVueloService.AddHrsVuelo(reserva)
      .then(() => {
        if (metodo==='credito') {
          // 2) y si es crédito, actualizamos el crédito en 'pagos'
          this.hrsVueloService
            .actualizarHorasCredito(this.matricula!, id!, this.horasReserva)
            .subscribe({
              next: () => alert('Reserva y crédito actualizado con éxito'),
              error: err => console.error('Error actualizar crédito:', err)
            });
        } else {
          alert('Reserva guardada con éxito');
          this.resetAll();            // <— aquí también
        }
      })
      .catch(err => console.error('Error guardando HrsVuelo:', err));
      this.resetAll();            // <— aquí también
  }

  pagoValido(): boolean {
    const m = this.paymentFormGroup.value.metodoPago;
    return m==='paypal'
      ? this.montoPago>0
      : (this.creditChecked && this.horasDisponibles>0);
  }

  confirmarReserva(): void {
    if (this.paymentFormGroup.value.metodoPago==='credito') {
      this.guardarReserva('credito');
    }
  }

  formatDate(d: Date): string {
    return new Date(d).toLocaleDateString('es-ES', {
      weekday:'long',year:'numeric',month:'long',day:'numeric'
    });
  }

  private resetAll(): void {
    // 1) Resetear el stepper al primer paso
    this.stepper.reset();
  
    // 2) Resetear cada formulario
    this.dateFormGroup.reset();
    this.timeFormGroup.reset();
    this.planeFormGroup.reset();
    this.paymentFormGroup.reset();
  
    // 3) Limpiar variables internas
    this.selectedAvion    = undefined;
    this.montoPago        = 0;
    this.horasDisponibles = 0;
    this.tieneHorasCredito= false;
    this.creditChecked    = false;
  }
}
