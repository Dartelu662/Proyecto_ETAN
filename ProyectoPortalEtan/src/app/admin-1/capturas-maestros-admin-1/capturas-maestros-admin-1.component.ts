import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import Usuario from '../../interfaces/usuario.interface';
import Maestro from '../../interfaces/maestro.interface';
import { UsuarioService } from '../../services/usuario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import Auth from '../../interfaces/auth.interface';
import { MaestroService } from '../../services/maestro.service';
import licencia from '../../interfaces/licencia.interface';

@Component({
  selector: 'app-capturas-maestros-admin-1',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './capturas-maestros-admin-1.component.html',
  styleUrls: ['./capturas-maestros-admin-1.component.scss']
})
export class CapturasMaestrosAdmin1Component implements OnInit{

   constructor (private maestroService:MaestroService, private cdr: ChangeDetectorRef){ }
 
   
    maestro: Maestro = {
      Nombres: '',
      ApellidoP: '',
      ApellidoM: '',
      Email: '',
      Celular: '',
      Direccion: '',
      FechaNac: '',
      FechaIngreso: '',
      TipoLicencia: '',
      Activo: true
     }

  tiposLicencia: licencia[] = [
    { TipoLicenciasId: 1, TipoLicencia: 'Piloto Comercial', fechaFin: ''},
    { TipoLicenciasId: 2, TipoLicencia: 'Piloto Privado', fechaFin: '' },
    { TipoLicenciasId: 3, TipoLicencia: 'Instructor de Vuelo', fechaFin: ''}
  ];

  selectedLicencias: licencia[] = [];
  auth: Auth = {
    Email: '',
    Password: ''
  };

  onSubmit() {
    // Aquí puedes procesar la información, por ejemplo:
    console.log('Licencias seleccionadas: ', this.selectedLicencias);
  }

  ngOnInit(): void {
    
    console.log(this.selectedLicencias)
  }

  agregarLicencia(TipoLic: HTMLSelectElement, fechaVen: HTMLInputElement) {
    
    debugger;
    const valor = TipoLic.value;

    const _TipoLicenciasId = parseInt(valor);
    const _licenciaEncontrada = this.tiposLicencia.find(x => x.TipoLicenciasId === _TipoLicenciasId)?.TipoLicencia;
    
    const nuevaLicencia: licencia = {
      TipoLicenciasId: _TipoLicenciasId,
      TipoLicencia: _licenciaEncontrada || '',
      fechaFin: fechaVen.value
    };

    if(nuevaLicencia.TipoLicencia !== '' &&
      nuevaLicencia.fechaFin !== '' &&
      nuevaLicencia.TipoLicenciasId ){
        if(this.selectedLicencias.find(i => i.TipoLicenciasId === nuevaLicencia.TipoLicenciasId))
        {
          this.selectedLicencias = this.selectedLicencias.filter(i => i.TipoLicenciasId !== nuevaLicencia.TipoLicenciasId);
        }
        this.selectedLicencias.push(nuevaLicencia);
      } 
    this.ngOnInit();
  }

  obtenerNombreLicencia(id: number) {
    const lic = this.tiposLicencia.find(l => l.TipoLicenciasId === id);
    return lic?.TipoLicencia;
  }

}

   




