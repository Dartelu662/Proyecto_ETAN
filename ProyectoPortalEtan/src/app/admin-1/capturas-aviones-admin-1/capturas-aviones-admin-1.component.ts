import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

interface Avion {
  avion_id?: number;
  registration_number: string;
  model: string;
  manufacture_year?: number;
  last_maintenance_date?: string;
  status: 'disponible' | 'mantenimiento' | 'inactivo';
}

@Component({
  selector: 'app-capturas-aviones-admin-1',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, HttpClientModule
  ],
  templateUrl: './capturas-aviones-admin-1.component.html',
  styleUrl: './capturas-aviones-admin-1.component.scss'
})
export class CapturasAvionesAdmin1Component {
  aviones: Avion[] = [];
  avionForm!: FormGroup;
  isEditing: boolean = false;
  apiUrl = 'http://localhost:3000/aviones'; // Cambia esto según tu API

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.avionForm = this.fb.group({
      avion_id: [null],
      registration_number: ['', Validators.required],
      model: ['', Validators.required],
      manufacture_year: [null],
      last_maintenance_date: [''],
      status: ['disponible', Validators.required],
    });

    this.obtenerAviones();
}

obtenerAviones() {
  this.http.get<Avion[]>(this.apiUrl).subscribe((data) => (this.aviones = data));
}

guardarAvion() {
  const avion = this.avionForm.value;

  if (this.isEditing) {
    // Editar avión
    this.http.put(`${this.apiUrl}/${avion.avion_id}`, avion).subscribe(() => {
      this.obtenerAviones();
      this.cancelarEdicion();
    });
  } else {
    // Agregar avión nuevo
    this.http.post(this.apiUrl, avion).subscribe(() => {
      this.obtenerAviones();
      this.avionForm.reset({ status: 'disponible' });
    });
  }
}

editarAvion(avion: Avion) {
  this.isEditing = true;
  this.avionForm.patchValue(avion);
}


eliminarAvion(avion_id?: number) {
 {
    if (avion_id === undefined) {
      console.error('Error: El avion_id es undefined.');
      return;
    }
  
    console.log(`Eliminando avión con ID: ${avion_id}`);
    // Aquí puedes hacer la petición HTTP para eliminar el avión
  }
  if (confirm('¿Estás seguro de eliminar este avión?')) {
    this.http.delete(`${this.apiUrl}/${avion_id}`).subscribe(() => this.obtenerAviones());
  }
}

cancelarEdicion() {
  this.isEditing = false;
  this.avionForm.reset({ status: 'disponible' });
}
}