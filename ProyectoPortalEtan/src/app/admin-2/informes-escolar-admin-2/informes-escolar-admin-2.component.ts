import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { take } from 'rxjs/operators';

import { PagosService } from '../../services/pagos.service';
import { EdoCuentaService } from '../../services/edo-cuenta.service';
import Pagos from '../../interfaces/pagos.interface';
import Edocuenta from '../../interfaces/edocuenta.interface';


@Component({
  selector: 'app-informes-escolar-admin-2',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './informes-escolar-admin-2.component.html',
  styleUrl: './informes-escolar-admin-2.component.scss'
})
export class InformesEscolarAdmin2Component {
  matricula: string = '';
  pagos: Pagos[] = [];
  pagosVuelo: Pagos[] = [];
  pagosOtros: Pagos[] = [];
  edoCuenta: Edocuenta | null = null;
  error: string | null = null;

  constructor(
    private pagosService: PagosService,
    private edoService: EdoCuentaService
  ) {}

  ngOnInit(): void {
    // Inicialización vacía
  }

  onFilter(): void {
    this.error = null;
    const m = this.matricula.trim();
    if (!m) {
      this.error = 'Ingresa una matrícula válida.';
      return;
    }
console.log('Cargando pagos para MAT:', m); 
    // Cargar pagos por matrícula
    this.pagosService.GetPagosByMatricula(m)
      .pipe(take(1))
      .subscribe({
        next: pagos => {
          this.pagos = pagos;
          this.pagosVuelo = pagos.filter(p => !!p.AvionId);
          this.pagosOtros = pagos.filter(p => !p.AvionId);
        },
        error: () => this.error = 'Error al cargar pagos.'
      });

      console.log('Cargando pagos para matrícula:', this.pagos[0]?.matricula);

    // Cargar estado de cuenta
    this.edoService.GetEdocuentas(m)
      .pipe(take(1))
      .subscribe({
        next: arr => this.edoCuenta = arr.length ? arr[0] : null,
        error: () => this.error = 'Error al cargar estado de cuenta.'
      });
  }
}