
// Angular/core:
import { Component } from '@angular/core';

// Angular/forms:
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Angular/router:
import { Router } from '@angular/router';

// Servicios:
import { peticionesGetService } from '../../../../services/peticionesGet.service';
import { tableService }         from '../../../../services/table.service';


// Componente decorado:
@Component({
  selector   : 'ngx-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls  : ['./agregar-cliente.component.scss']
})


// Clase exportable AgregarClienteComponent:
export class AgregarClienteComponent {

  // Variables:
  formulario      : FormGroup;
  usuario         : any;
  reportCliente   : any;
  reportResidencia: any;
  correo_         : any;
  telefono2_      : any;
  a               : any[] = [];


  // Constructor:
  constructor(private fb        : FormBuilder,
              private service   : tableService,
              private peticiones: peticionesGetService,
              private router    : Router) {

    // Obtiene el usuario actual desde el servicio indicado:
    this.usuario = this.service.getUsuario();

    // Llamada de métodos:
    this.crearFormulario();
  };


  // Método encargado de construir el formulario con cada control especificado con sus validadores:
  crearFormulario() {

    this.formulario = this.fb.group({

      rut_cliente   : ['', Validators.required],
      nombre_cliente: ['', Validators.required],
      telefono1     : ['', [Validators.required, Validators.minLength(7), Validators.maxLength(12)]],
      telefono2     : [''],
      correo_cliente: ['', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      creado_por    : [this.usuario, Validators.required],
      residencia    : this.fb.group({
        direccion_cliente: ['', Validators.required],
        comuna_cliente   : ['', Validators.required],
        mac_cliente      : ['', Validators.required],
        pppoe_cliente    : ['', Validators.required],
      })
    });
  };


  // Método encargado de postear la información hacia la API:
  guardar() {

    // Si el estado del formulario es válido, ejecutar:
    if (this.formulario.status === "VALID") {

      // Si el valor del control es nulo, asignar valor por defecto, si no, asignar valor ingresado:
      if (this.formulario.value['correo_cliente'] === null) {
        this.correo_ = 'Sin correo';
      } else {
        this.correo_ = this.formulario.value['correo_cliente'];
      };

      // Si el valor del control es nulo, asignar valor por defecto, si no, asignar valor ingresado:
      if (this.formulario.value['telefono2'] === null) {
        this.telefono2_ = 'Sin número';
      } else {
        this.telefono2_ = this.formulario.value['telefono2'];
      };

      /* Se define la estructura de datos a enviar al servicio y 
      se le asignan los datos obtenidos del formulario: */
      this.reportCliente = {
        rut       : this.formulario.value['rut_cliente'],
        nombre    : this.formulario.value['nombre_cliente'],
        email     : this.correo_,
        contacto1 : this.formulario.value['telefono1'],
        contacto2 : this.telefono2_,
        created_by: this.usuario,
        updated_by: this.usuario,
      };


      /* Se define la estructura de datos a enviar al servicio y 
      se le asignan los datos obtenidos del formulario: */
      this.reportResidencia = {
        client_rut: this.formulario.value['rut_cliente'],
        direccion : this.formulario.value['residencia']['direccion_cliente'],
        comuna    : this.formulario.value['residencia']['comuna_cliente'],
        mac       : this.formulario.value['residencia']['mac_cliente'],
        pppoe     : this.formulario.value['residencia']['pppoe_cliente'],
      };
    };

    console.log(this.reportResidencia);

    let res = '';


    if (this.reportCliente) {
      // Llama al servicio requerido y envía los datos obtenidos anteriormente a la API:
      this.peticiones.agregarCliente(this.reportCliente).subscribe(data => {
        res = data;
        console.log('res');
        console.log(res);
        this.router.navigate(['/success']);
      });
    }


    if (this.reportResidencia) {
      // Llama al servicio requerido y envía los datos obtenidos anteriormente a la API:
      this.peticiones.agregarResidencia(this.reportResidencia).subscribe(data => {
        res = data;
        console.log('res');
        console.log(res);
        this.router.navigate(['/success']);
      });
    }


    //Se resetean los valores del formulario, dejando por defecto el valor del usuario:
    this.formulario.reset({
      creado_por: this.usuario,
    });
  };
};
