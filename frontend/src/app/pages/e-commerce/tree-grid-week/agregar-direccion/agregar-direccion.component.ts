
// Angular/core:
import { Component } from '@angular/core';

// Angular/forms:
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Angular/router:
import { Router } from '@angular/router';

// Servicios:
import { peticionesGetService } from '../../../../services/peticionesGet.service';

import { NbDialogRef, NbIconConfig, NbPopoverModule, NbToastrService } from "@nebular/theme";
import { tableService } from '../../../../services/table.service';


// Componente decorado:
@Component({
  selector   : 'ngx-agregar-direccion',
  templateUrl: './agregar-direccion.component.html',
  styleUrls  : ['./agregar-direccion.component.scss']
})


// Clase exportable AgregarDireccionComponent:
export class AgregarDireccionComponent {

  // Variables:
  formulario: FormGroup;
  report    : any;
  comuna    : any;

  rutRegExp = new RegExp('^([0-9]+-[0-9K])$');

  direccionRegExp = new RegExp(/^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)* (((#|[nN][oO]\.?) ?)?\d{1,4}(( ?[a-zA-Z0-9\-]+)+)?)$/);

  macRegExp = new RegExp (/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/);

  loading = false;

  // Constructor:
  constructor(private fb           : FormBuilder,
              private peticiones   : peticionesGetService,
              private router       : Router,
              private toastrService: NbToastrService,
              private tableService : tableService,
              protected ref        : NbDialogRef<AgregarDireccionComponent>) {

    // Obtiene la lista de comunas:
    this.comuna = this.tableService.getComuna();

    // Llamada de método:
    this.crearFormulario();
  };

  get rutNoValido() {
    return this.formulario.get('rut_cliente').invalid && this.formulario.get('rut_cliente').touched;
  }

  get direccionNoValido() {
    return this.formulario.get('direccion_cliente').invalid && 
    this.formulario.get('direccion_cliente').touched;
  }

  get comunaNoValido() {
    return this.formulario.get('comuna_cliente').invalid && 
    this.formulario.get('comuna_cliente').touched;
  }

  get macNoValido() {
    return this.formulario.get('mac_cliente').invalid && 
    this.formulario.get('mac_cliente').touched;
  }

  get pppoeNoValido() {
    return this.formulario.get('pppoe_cliente').invalid && 
    this.formulario.get('pppoe_cliente').touched;
  }

  // Método encargado de construir el formulario con cada control especificado con sus validadores:
  crearFormulario() {

    this.formulario = this.fb.group({

      rut_cliente      : ['', [Validators.pattern(this.rutRegExp), Validators.required]],
      direccion_cliente: ['', [Validators.pattern(this.direccionRegExp), Validators.required]],
      comuna_cliente   : ['', Validators.required],
      mac_cliente      : ['', [Validators.pattern(this.macRegExp), Validators.required]],
      pppoe_cliente    : ['', Validators.required]
    });
  };


  showToast(icono) {
    const iconConfig: NbIconConfig = { icon: icono, pack: 'eva' };
    this.toastrService.show(
      '',
      'Dirección creada exitosamente!',
      iconConfig)
  }
  

  // Método encargado de postear la información hacia la API:
  guardar() {
    
    // Si el estado del formulario es válido, ejecutar:
    if (this.formulario.status === "VALID") {

      // Obtiene los datos del formulario y los asigna a cada variable definida en la API:
      this.report = {
        client_rut: this.formulario.value['rut_cliente'],
        direccion : this.formulario.value['direccion_cliente'],
        comuna    : this.formulario.value['comuna_cliente'],
        mac       : this.formulario.value['mac_cliente'],
        pppoe     : this.formulario.value['pppoe_cliente'],
      };

      this.loading = true;
      
    } else {
      return this.formulario.markAllAsTouched();
    };

    let res = '';

    // Llama al servicio requerido y envía los datos obtenidos anteriormente a la API:
    if (this.report) {
      this.peticiones.agregarResidencia(this.report).subscribe(data => {
        res = data;
        console.log('res');
        console.log(res);
        this.loading = false;
        this.router.navigate(['/success']);
        this.showToast('');
        this.ref.close();
      });
    };
  };
};