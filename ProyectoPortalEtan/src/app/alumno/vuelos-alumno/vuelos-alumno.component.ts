import { Component } from '@angular/core';
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

@Component({
  selector: 'app-vuelos-alumno',
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
  templateUrl: './vuelos-alumno.component.html',
  styleUrl: './vuelos-alumno.component.css'
})
export class VuelosAlumnoComponent{
  dateFormGroup: FormGroup;
  timeFormGroup: FormGroup;
  paymentFormGroup: FormGroup;
  
  timeSlots: string[] = [
    '8:00 AM', '9:30 AM', 
    '11:00 AM', '12:30 PM',
    '2:00 PM', '3:30 PM',
    '5:00 PM', '6:30 PM',
  ];

  constructor(private _formBuilder: FormBuilder) {
    // Inicializar formularios con validaciones
    this.dateFormGroup = this._formBuilder.group({
      date: ['', Validators.required]
    });

    this.timeFormGroup = this._formBuilder.group({
      timeSlot: ['', Validators.required]
    });

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

  getLastFourDigits(): string {
    const cardNumber = this.paymentFormGroup.value.cardNumber;
    if (!cardNumber) return '';
    return cardNumber.replace(/\s/g, '').slice(-4);
  }

  isFormValid(): boolean {
    return this.dateFormGroup.valid && 
           this.timeFormGroup.valid && 
           this.paymentFormGroup.valid;
  }

  onSubmit(): void {
    if (this.isFormValid()) {
      console.log('Reserva confirmada', {
        date: this.dateFormGroup.value.date,
        timeSlot: this.timeFormGroup.value.timeSlot,
        payment: {
          cardName: this.paymentFormGroup.value.cardName,
          lastFourDigits: this.getLastFourDigits()
        }
      });
      // Aquí iría la lógica para enviar la información al servidor
      alert('¡Reserva confirmada con éxito!');
    }
  }
}
