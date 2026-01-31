// pagos-alumno.component.ts
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { take } from 'rxjs/operators';

import { AuthentificationService } from '../../services/authentification.service';
import { PagosService } from '../../services/pagos.service';
import { EdoCuentaService } from '../../services/edo-cuenta.service';

import Edocuenta from '../../interfaces/edocuenta.interface';
import pagos from '../../interfaces/pagos.interface';
import Usuario from '../../interfaces/usuario.interface';

declare var paypal: any;

@Component({
  selector: 'app-pagos-alumno',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pagos-alumno.component.html',
  styleUrls: ['./pagos-alumno.component.scss']
})
export class PagosAlumnoComponent implements OnInit {
  @ViewChild('paypalButtonContainer', { static: true }) paypalElement!: ElementRef;
  @ViewChild('paymentForm', { static: true }) paymentForm!: NgForm;

  // Modelo para la vista de pago
  EdoCuenta: Partial<Edocuenta> = {
    Matricula: '',
    MontoMensual: 0
  };

Pagos: pagos  = {
  tipoPago: 'Mensualidad',
  Monto: 5200,
  Activo: false,
  matricula: '',
  fechaPago: '',
  FormaPago: '',
  medioPago: '',
  hrsVuelo: 0,
  avion: '',
  AvionId: undefined
};

  usuarioActual!: Usuario;

  constructor(
    private authService: AuthentificationService,
    private pagosService: PagosService,
    private edoService: EdoCuentaService
  ) {}

  ngOnInit(): void {
    // 1) Obtener usuario actual y asignar matrícula
    this.authService.retornarUsuarioActual().then(user => {
      if (user) {
        this.usuarioActual = user;
        this.EdoCuenta.Matricula = user.UserName;
      }
    });

    // 2) Asignar monto al modelo
    this.EdoCuenta.MontoMensual = this.Pagos.Monto;

    // 3) Renderizar botón PayPal
    if (typeof paypal !== 'undefined') {
      paypal
        .Buttons({
          createOrder: (data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [{
                  amount: {
                  currency_code: 'MXN',
                  value: this.Pagos.Monto.toString()
                }
              }]
            });
          },
          onApprove: (data: any, actions: any) => {
            // Devolver la promesa para cerrar el popup automáticamente
            return actions.order.capture().then((order: { id: any; }) => {
              console.log('Order approved:', order);

              // a) Registrar en colección 'Pagos'
              this.pagosService.AddPago({
                matricula: this.EdoCuenta.Matricula!,
                Monto: this.Pagos.Monto,
                fechaPago: new Date().toISOString(),
                Activo: true,
                FormaPago: this.Pagos.FormaPago,
                tipoPago: this.Pagos.tipoPago,
                medioPago: this.Pagos.medioPago,
                hrsVuelo: this.Pagos.hrsVuelo,
                avion: this.Pagos.avion,
                AvionId: undefined
              }).then(() => {
                // b) Actualizar EdoCuenta: MensPen--, MensPag++
                this.edoService.GetEdocuentas(this.EdoCuenta.Matricula!)
                  .pipe(take(1))
                  .subscribe(edos => {
                    const edo = edos && edos.length > 0 ? edos[0] : null;
                    if (!edo) {
                      console.error('No se encontró un registro activo para el alumno');
                      return;
                    }
                    const actualizado: Edocuenta = {
                      ...edo,
                      MensPen: (edo.MensPen ?? 0) - 1,
                      MensPag: (edo.MensPag ?? 0) + 1,
                      id: edo.id!
                    };
                    this.edoService.UpdateEdocuenta(actualizado).then(() => {
                      // Antes de limpiar, mostrar mensaje de éxito
                      alert('Pago registrado con éxito');
                      // Limpiar formulario
                      this.resetForm();
                    }).catch(err => {
                      console.error('Error actualizando EdoCuenta:', err);
                      alert('Error al actualizar estado de cuenta');
                    });
                  }, err => {
                    console.error('Error obteniendo EdoCuenta:', err);
                  });
              }).catch(err => {
                console.error('Error agregando Pago:', err);
                alert('Error al registrar pago');
              });
            });
          },
          onCancel: (data: any) => {
            console.log('Pago cancelado por el usuario', data);
            alert('Has cancelado el pago');
          },
          onError: (err: any) => {
            console.error('PayPal error:', err);
            alert('Error con PayPal, inténtalo de nuevo.');
          }
        })
        .render(this.paypalElement.nativeElement);
    } else {
      console.error('PayPal SDK no ha sido cargado');
    }
  }

  /**
   * Limpia los campos del formulario
   */
  resetForm(): void {
    // Reset de formulario angular
    this.paymentForm.resetForm({
      Matricula: '',
      MontoMensual: 0
    });
    // También actualizar modelo interno si fuera necesario
    this.EdoCuenta.Matricula = this.usuarioActual.UserName;
    this.EdoCuenta.MontoMensual = this.Pagos.Monto;
  }
}