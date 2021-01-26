
// Angular/core:
import { Component } from '@angular/core';

// Angular/forms:
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Angular/router:
import { Router } from '@angular/router';

// Servicios:
import { peticionesGetService } from '../../../../services/peticionesGet.service';

import { NbPopoverModule } from "@nebular/theme";


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
  mostrar: boolean = false;


  // Constructor:
  constructor(private fb        : FormBuilder,
              private peticiones: peticionesGetService,
              private router    : Router) {

    // Llamada de método:
    this.crearFormulario();
  };


  // Método encargado de construir el formulario con cada control especificado con sus validadores:
  crearFormulario() {

    this.formulario = this.fb.group({

      rut_cliente      : ['', Validators.required],
      direccion_cliente: ['', Validators.required],
      comuna_cliente   : ['', Validators.required],
      mac_cliente      : ['', Validators.required],
      pppoe_cliente    : ['', Validators.required]
    });
  };


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
    };

    let res = '';

    // Llama al servicio requerido y envía los datos obtenidos anteriormente a la API:
    this.peticiones.agregarResidencia(this.report).subscribe(data => {
      res = data;
      console.log('res');
      console.log(res);
      this.router.navigate(['/success']);
    });
  };
};