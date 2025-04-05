import { Component, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HrsvueloService } from '../../services/hrsvuelo.service';
import { HrsVuelo } from '../../interfaces/hrsvuelo.interface';
import Avion from '../../interfaces/avion.interface';
import { AvionesService } from '../../services/aviones.service';
import { ViewChild } from '@angular/core';

declare var paypal: any;

@Component({
  selector: 'app-horas-vuelo-admin-2',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    MatStepperModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    CommonModule,
    MatCardModule
  ],
  templateUrl: './horas-vuelo-admin-2.component.html',
  styleUrl: './horas-vuelo-admin-2.component.css'
})
export class HorasVueloAdmin2Component {

  @ViewChild('paypal', { static: true }) paypalElement: ElementRef | undefined;


  hrsVuelo: HrsVuelo = {
    Matricula: '',
    Fecha: '',
    Hora: '',
    Avion: ''
}

  dateFormGroup: FormGroup;
  timeFormGroup: FormGroup;
  planeFormGroup: FormGroup;
  paymentFormGroup: FormGroup;
  matriculaFormGroup: FormGroup;

  
  timeSlots: string[] = [
    '8:00 AM', '9:30 AM', 
    '11:00 AM', '12:30 PM',
    '2:00 PM', '3:30 PM',
    '5:00 PM', '6:30 PM',
  ];

  Pagos = {
    descripcion : 'Mensualidad',
    monto      :  5200,
    img         : 'imagen de tu producto'
  }

  listaAviones: Avion[] = []

  ngOnInit(): void {
    this.avionService.GetAvions().subscribe( async value => {
      this.listaAviones = value;
      console.log (value)
    });


    

              // Verificar si paypal está definido
        if (typeof paypal !== 'undefined') {
    
            paypal
            .Buttons({
              createOrder: (data: any, actions: any) => {
                return actions.order.create({
                  purchase_units: [{
                    description: this.Pagos.descripcion, 
                    amount     : {
                    currency_code: 'MXN', 
                    value        : this.Pagos.monto.toString()
                    }
                  }]
                })
              },
    
              onApprove: async (_data: any, actions: { order: { capture: () => any; }; }) => {
                const order = await actions.order.capture();
                console.log(order);
              },
              onError: (err: any) => {
                console.log(err);
              }
     
            })
            
            .render  (this.paypalElement?.nativeElement);
    
          } else {
            console.error('PayPal SDK no ha sido cargado correctamente');
          }


}




constructor(
  private _formBuilder: FormBuilder, 
  private hrsVueloService : HrsvueloService,
  private avionService : AvionesService
) {

  this.matriculaFormGroup = this._formBuilder.group({
    matricula: ['', Validators.required]
  });

    // Inicializar formularios con validaciones
    this.dateFormGroup = this._formBuilder.group({
      date: ['', Validators.required]
    });

    this.timeFormGroup = this._formBuilder.group({
      timeSlot: ['', Validators.required]
    });

    this.planeFormGroup = this._formBuilder.group({
      listaAviones: ['', Validators.required]
    })

    this.paymentFormGroup = this._formBuilder.group({
      cardName: ['', Validators.required],
      cardNumber: ['', [
        Validators.required, 
        Validators.pattern('^[0-9]{4}[ ]?[0-9]{4}[ ]?[0-9]{4}[ ]?[0-9]{4}$')
      ]],
      expiryDate: ['', [
        Validators.required, 
        Validators.pattern('^(0[1-9]|1[0-2])\\/([0-9]{2})$')
      ]],
      cvv: ['', [
        Validators.required, 
        Validators.pattern('^[0-9]{3,4}$')
      ]]
    });
  }

  formatDate(date: Date): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getAvion(): string {
    const Avion = this.hrsVuelo.Avion;
    if (!Avion) return '';
    return Avion.replace(/\s/g, '').slice(-4);
  }

  isFormValid(): boolean {
    return this.matriculaFormGroup.valid &&
           this.dateFormGroup.valid && 
           this.timeFormGroup.valid && 
           this.planeFormGroup.valid;
  }

  onSubmit(): void {
    if (this.isFormValid()) {
      // Actualizar los valores en el objeto hrsVuelo
      this.hrsVuelo.Matricula = this.matriculaFormGroup.value.matricula;
      this.hrsVuelo.Fecha = this.dateFormGroup.value.date;
      this.hrsVuelo.Hora = this.timeFormGroup.value.timeSlot;
      this.hrsVuelo.Avion = this.planeFormGroup.value.listaAviones;
  
      console.log('Reserva confirmada', {
        matricula: this.hrsVuelo.Matricula,
        date: this.hrsVuelo.Fecha,
        timeSlot: this.hrsVuelo.Hora,
        Avion: this.hrsVuelo.Avion
      });
  
      // Enviar datos corregidos a Firebase
      this.hrsVueloService.AddHrsVuelo(this.hrsVuelo)
        .then(() => {
          alert('¡Reserva confirmada con éxito!');
        })
        .catch((error) => {
          console.error('Error al guardar la reserva:', error);
        });
    }
  }
  
  
  // onSubmit(): void {
  //   if (this.isFormValid()) {
  //     console.log('Reserva confirmada', {
  //       //date: this.dateFormGroup.value.date,  
  //       date: this.hrsVuelo.Fecha,
  //       //timeSlot: this.timeFormGroup.value.timeSlot,
  //       timeSlot: this.hrsVuelo.Hora, 
  //       Slot: this.hrsVuelo.Avion,
  //       Avion: this.hrsVuelo.Avion,
  //       // payment: {
  //       //   cardName: this.paymentFormGroup.value.cardName,
  //       //   lastFourDigits: this.getLastFourDigits()
  //       // }
      
  //     });
  //     // Aquí iría la lógica para enviar la información al servidor
      
  //     this.hrsVueloService.AddHrsVuelo(this.hrsVuelo)
  //     alert('¡Reserva confirmada con éxito!');
  //   }
  // }
}
