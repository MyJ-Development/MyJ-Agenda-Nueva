
// Angular/core:
import { Component, OnInit } from '@angular/core';

// Nebular/theme:
import { NbDialogRef, NbDialogService } from '@nebular/theme';

// Servicios:
import { peticionesGetService } from '../../../../services/peticionesGet.service';
import { tableService }         from '../../../../services/table.service';

// Componentes:
import { AgregarOrdenComponent } from '../agregar-orden/agregar-orden.component';
import { ListaOrdenesComponent } from '../lista-ordenes/lista-ordenes.component';

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


// Componente decorador:
@Component({
  selector: 'ngx-ver-cliente',
  templateUrl: './ver-cliente.component.html',
  styleUrls: ['./ver-cliente.component.scss']
})


// Clase exportable MostrarClienteComponent implementa ngOnInit:
export class VerClienteComponent implements OnInit {

  // Variables:
  formulario         : FormGroup;
  ordenCliente       : any;
  rut_cliente        : any;
  direccionArray     : any;
  comunaArray        : any;
  macArray           : any;
  pppoeArray         : any;
  report             : any;
  usuario            : any;
  residencia_clientes: any[];
  

  // Constructor:
  constructor(protected ref       : NbDialogRef<VerClienteComponent>,
              private mostrar     : NbDialogService,
              private tableService: tableService,
              private service     : peticionesGetService,
              private fb          : FormBuilder,
              private router      : Router) {

  }


  // Método ngOnInit:
  ngOnInit(){

    /* Obtiene el rut_cliente desde el servicio,
    enviado previamente desde otro componente: */
    this.rut_cliente = this.tableService.getRut_cliente();

    /* Obtiene la orden completa del cliente desde el servicio,
    enviada previamente desde otro componente: */
    this.ordenCliente = this.tableService.getOrden();
    console.log(this.ordenCliente);

    this.usuario = this.tableService.getUsuario();

    // Llamada de métodos:
    this.residencia();
    this.crearFormulario();
  }


  get direccion(){
    return this.formulario.get('direccion_cliente') as FormArray;
  }

  get comuna(){
    return this.formulario.get('comuna_cliente') as FormArray;
  }

  get mac(){
    return this.formulario.get('mac_cliente') as FormArray;
  }

  get pppoe(){
    return this.formulario.get('pppoe_cliente') as FormArray;
  }


  // Método encargado de actualizar datos obtenidos desde la API:
  actualizarDatos() {

    if (this.formulario.valid) {

      /* Se define la estructura de datos a enviar al servicio y 
      se le asignan los datos obtenidos del formulario: */
      this.report = {
        rut       : this.formulario.value['rut_cliente'],
        email     : this.formulario.value['correo_cliente'],
        nombre    : this.formulario.value['nombre_cliente'],
        contacto1 : this.formulario.value['telefono1'],
        contacto2 : this.formulario.value['telefono2'],
        created_by: this.ordenCliente['created_by']['email'],
        updated_by: this.usuario
    };

    console.log(this.report);

    let res = '';

    // Se envían los datos obtenidos del formulario al servicio para alojarlos en la API.
    this.service.editarCliente(this.report).subscribe(data => {
      res = data;
      console.log('res');
      console.log(res);
      this.router.navigate(['/success']);
    });
    }
    else {
      alert("Revisa los campos")
    }
  }


  residencia(){

    this.residencia_clientes = this.tableService.getResidencia();
    
    let direccion = this.residencia_clientes.map((x) => [x.direccion]);
    this.direccionArray = this.fb.array(direccion);

    let comuna = this.residencia_clientes.map((x) => [x.comuna]);
    this.comunaArray = this.fb.array(comuna);
   
    let mac = this.residencia_clientes.map((x) => [x.mac]);
    this.macArray = this.fb.array(mac);
   
    let pppoe = this.residencia_clientes.map((x) => [x.pppoe]);
    this.pppoeArray = this.fb.array(pppoe);
    
  }


  // Método encargado de abrir el componente indicado y cerrar el actual:
  listaOrdenes() {

    // Envía el rut del cliente seleccionado, al servicio indicado:
    this.tableService.setRut_cliente(this.rut_cliente);

    // Abre el componente indicado:
    this.mostrar.open(ListaOrdenesComponent);

    // Cierra el componente actual almacenado en una referencia:
    this.ref.close();
  }


  // Método encargado de abrir el componente indicado y cerrar el actual:
  agregarOrden() {

    // Abre el componente indicado:
    this.mostrar.open(AgregarOrdenComponent);

    // Cierra el componente actual almacenado en una referencia:
    this.ref.close();
  }


  // Método encargado de crear el formulario que extrae los datos del componente html:
  crearFormulario() {

    this.formulario = this.fb.group({

      rut_cliente      : [this.rut_cliente, Validators.required],
      nombre_cliente   : [this.mayus(this.formato(this.ordenCliente['client_order']['nombre'])), 
                          Validators.required],
      telefono1        : [this.ordenCliente['client_order']['contacto1'], Validators.required],
      telefono2        : [this.ordenCliente['client_order']['contacto2'], Validators.required],
      correo_cliente   : [this.ordenCliente['client_order']['email'], Validators.required],
      creado_por       : [{value: this.ordenCliente['created_by']['email'], disabled: true}, 
                          Validators.required],
      actualizado_por  : [{value: this.usuario, disabled: true}, Validators.required],
      direccion_cliente:  this.direccionArray,
      comuna_cliente   :  this.comunaArray,
      mac_cliente      :  this.macArray,
      pppoe_cliente    :  this.pppoeArray
    })
  }

  mayus(dato){
    return String(dato).replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))
  }

  formato(dato) {
    return String(dato)
      .replace('&ntilde', 'ñ')
      .replace('&Ntilde', 'Ñ')
      .replace('&amp', '&')
      .replace('&Ntilde', 'Ñ')
      .replace('&ntilde', 'ñ')
      .replace('&Ntilde', 'Ñ')
      .replace('&Agrave', 'À')
      .replace('&Aacute', 'Á')
      .replace('&Acirc', 'Â')
      .replace('&Atilde', 'Ã')
      .replace('&Auml', 'Ä')
      .replace('&Aring', 'Å')
      .replace('&AElig', 'Æ')
      .replace('&Ccedil', 'Ç')
      .replace('&Egrave', 'È')
      .replace('&Eacute', 'É')
      .replace('&Ecirc', 'Ê')
      .replace('&Euml', 'Ë')
      .replace('&Igrave', 'Ì')
      .replace('&Iacute', 'Í')
      .replace('&Icirc', 'Î')
      .replace('&Iuml', 'Ï')
      .replace('&ETH', 'Ð')
      .replace('&Ntilde', 'Ñ')
      .replace('&Ograve', 'Ò')
      .replace('&Oacute', 'Ó')
      .replace('&Ocirc', 'Ô')
      .replace('&Otilde', 'Õ')
      .replace('&Ouml', 'Ö')
      .replace('&Oslash', 'Ø')
      .replace('&Ugrave', 'Ù')
      .replace('&Uacute', 'Ú')
      .replace('&Ucirc', 'Û')
      .replace('&Uuml', 'Ü')
      .replace('&Yacute', 'Ý')
      .replace('&THORN', 'Þ')
      .replace('&szlig', 'ß')
      .replace('&agrave', 'à')
      .replace('&aacute', 'á')
      .replace('&acirc', 'â')
      .replace('&atilde', 'ã')
      .replace('&auml', 'ä')
      .replace('&aring', 'å')
      .replace('&aelig', 'æ')
      .replace('&ccedil;', 'ç')
      .replace('&egrave', 'è')
      .replace('&eacute', 'é')
      .replace('&ecirc', 'ê')
      .replace('&euml', 'ë')
      .replace('&igrave', 'ì')
      .replace('&iacute', 'í')
      .replace('&icirc', 'î')
      .replace('&iuml', 'ï')
      .replace('&eth', 'ð')
      .replace('&ntilde', 'ñ')
      .replace('&ograve', 'ò')
      .replace('&oacute', 'ó')
      .replace('&ocirc', 'ô')
      .replace('&otilde', 'õ')
      .replace('&ouml', 'ö')
      .replace('&oslash', 'ø')
      .replace('&ugrave', 'ù')
      .replace('&uacute', 'ú')
      .replace('&ucirc', 'û')
      .replace('&uuml', 'ü')
      .replace('&yacute', 'ý')
      .replace('&thorn', 'þ')
      .replace('&yuml', 'ÿ');
  }

}
