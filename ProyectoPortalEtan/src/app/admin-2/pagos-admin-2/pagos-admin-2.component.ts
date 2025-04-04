import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms'; // Asegúrate de importar ReactiveFormsModule

@Component({
  selector: 'app-pagos-admin-2',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './pagos-admin-2.component.html',
  styleUrls: ['./pagos-admin-2.component.scss']
})
export class PagosAdmin2Component {
  pagoForm: FormGroup;

  constructor(private firestore: Firestore, private fb: FormBuilder) {
    // Iniciar formulario reactivo
    this.pagoForm = this.fb.group({
      matricula: ['', Validators.required],
      fechaPago: [new Date(), Validators.required],
      montoPago: [null, [Validators.required, Validators.min(1)]],
      tipoPago: ['Efectivo', Validators.required],
    });
  }

  async guardarPago() {
    if (this.pagoForm.invalid) {
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }

    const pagosRef = collection(this.firestore, 'pagos'); // Nombre de la colección
    const nuevoPago = this.pagoForm.value;

    try {
      await addDoc(pagosRef, nuevoPago);
      alert('Pago registrado con éxito.');
      this.pagoForm.reset();
    } catch (error) {
      console.error('Error al guardar el pago:', error);
    }
  }
}


