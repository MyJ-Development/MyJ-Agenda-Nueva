
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

  emailRegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  rutRegExp = new RegExp('^([0-9]+-[0-9K])$');

  telefonoRegExp = new RegExp(/^(\+?56)?(\s?)(0?9)(\s?)[9876543]\d{7}$/);

  direccionRegExp = new RegExp(/^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)* (((#|[nN][oO]\.?) ?)?\d{1,4}(( ?[a-zA-Z0-9\-]+)+)?)$/);

  comunaRegExp = new RegExp (/^[a-zA-ZÀ-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-ZÀ-ÖØ-öø-ÿ]+\.?)*$/);

  macRegExp = new RegExp (/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/);



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

  get rutNoValido() {
    return this.formulario.get('rut_cliente').invalid && this.formulario.get('rut_cliente').touched;
  }

  get nombreNoValido() {
    return this.formulario.get('nombre_cliente').invalid && this.formulario.get('nombre_cliente').touched;
  }

  get correoNoValido() {
    return this.formulario.get('correo_cliente').invalid && this.formulario.get('correo_cliente').touched;
  }

  get telefono1NoValido() {
    return this.formulario.get('telefono1').invalid && this.formulario.get('telefono1').touched;
  }

  get telefono2NoValido() {
    return this.formulario.get('telefono2').invalid && this.formulario.get('telefono2').touched;
  }

  get direccionNoValido() {
    return this.formulario.get('residencia.direccion_cliente').invalid && 
    this.formulario.get('residencia.direccion_cliente').touched;
  }

  get comunaNoValido() {
    return this.formulario.get('residencia.comuna_cliente').invalid && 
    this.formulario.get('residencia.comuna_cliente').touched;
  }

  get macNoValido() {
    return this.formulario.get('residencia.mac_cliente').invalid && 
    this.formulario.get('residencia.mac_cliente').touched;
  }

  get pppoeNoValido() {
    return this.formulario.get('residencia.pppoe_cliente').invalid && 
    this.formulario.get('residencia.pppoe_cliente').touched;
  }

  // Método encargado de construir el formulario con cada control especificado con sus validadores:
  crearFormulario() {

    this.formulario = this.fb.group({

      rut_cliente   : ['', [Validators.pattern(this.rutRegExp), Validators.required]],
      nombre_cliente: ['', [Validators.required, Validators.minLength(6)]],
      telefono1     : ['', [Validators.required, Validators.pattern(this.telefonoRegExp)]],
      telefono2     : ['', Validators.pattern(this.telefonoRegExp)],
      correo_cliente: ['', [Validators.pattern(this.emailRegExp), Validators.required]],
      creado_por    : [this.usuario, Validators.required],
      residencia    : this.fb.group({
        direccion_cliente: ['', [Validators.required, Validators.pattern(this.direccionRegExp)]],
        comuna_cliente   : ['', [Validators.required, Validators.pattern(this.comunaRegExp)]],
        mac_cliente      : ['', [Validators.required, Validators.pattern(this.macRegExp)]],
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
    } else {
      return this.formulario.markAllAsTouched();
    }

    let res = '';

    if (this.reportCliente) {
      // Llama al servicio requerido y envía los datos obtenidos anteriormente a la API:
      this.peticiones.agregarCliente(this.reportCliente).subscribe(data => {
        res = data;
        console.log('res');
        console.log(res);
        this.router.navigate(['/success']);

        if (this.reportResidencia) {
          // Llama al servicio requerido y envía los datos obtenidos anteriormente a la API:
          this.peticiones.agregarResidencia(this.reportResidencia).subscribe(data => {
            res = data;
            console.log('res');
            console.log(res);
            this.router.navigate(['/success']);
          });
        };
      });
    };

    //Se resetean los valores del formulario, dejando por defecto el valor del usuario:
    this.formulario.reset({
      creado_por: this.usuario
    });
  };
};
