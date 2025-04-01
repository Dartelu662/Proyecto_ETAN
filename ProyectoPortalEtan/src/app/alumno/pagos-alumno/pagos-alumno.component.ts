import { Component, ElementRef, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { error } from 'console';
import Pagos from '../../interfaces/pagos.interface';
import Edocuenta from '../../interfaces/edocuenta.interface';

declare var paypal: any;

@Component({
  selector: 'app-pagos-alumno',
  imports: [],
  templateUrl: './pagos-alumno.component.html',
  styleUrl: './pagos-alumno.component.css'
})
// export class PagosAlumnoComponent {

  export class PagosAlumnoComponent implements OnInit{

    @ViewChild('paypal', { static: true }) paypalElement: ElementRef | undefined;
  
    Edocuenta = {
      Matricula : 'Matricula',
      Mensualidad : 5200

    }

    Pagos = {
      descripcion : 'Mensualidad',
      monto      :  5200,
      img         : 'imagen de tu producto'
    }
matricula: any;
    
    ngOnInit(){

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
}
