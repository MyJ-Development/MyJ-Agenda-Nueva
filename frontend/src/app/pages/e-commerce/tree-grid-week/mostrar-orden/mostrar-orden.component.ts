
// Angular/core:
import { Component, OnInit } from '@angular/core';

// Angular/common:
import { DatePipe } from '@angular/common';

// Angular/forms:
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Angular/router:
import { Router } from '@angular/router';

// Nebular/theme:
import { NbDialogRef, NbDialogService } from '@nebular/theme';

// Servicios:
import { tableService } from '../../../../services/table.service';
import { peticionesGetService } from '../../../../services/peticionesGet.service';
import { SeguimientosComponent } from '../seguimientos/seguimientos.component';


// Componente decorador:
@Component({
  selector: 'ngx-mostrar-orden',
  templateUrl: './mostrar-orden.component.html',
  styleUrls: ['./mostrar-orden.component.scss']
})


// Clase exportable MostrarOrdenComponent que implementa método ngOnInit:
export class MostrarOrdenComponent implements OnInit {

  // Variables:
  tecnicos: any[];
  tipoOrdenes: any[];
  residencia_cliente: any;
  formulario: FormGroup;
  rut_cliente: any;
  id_orden: any;
  ordenCliente: any;
  report: any;
  reportEventos: any;
  fecha_ejecucion: Date;
  fecha_transform: any;
  estadoCliente: any[];
  estadoTicket: any[];
  medioPago: any[];
  prioridad: any[];
  id_estadoCliente: any;
  id_estadoTicket: any;
  id_medioPago: any;
  id_prioridad: any;
  id_tipoOrden: any;
  id_residencia: any;


  // Constructor:
  constructor(protected ref: NbDialogRef<MostrarOrdenComponent>,
    private tableService: tableService,
    private service: peticionesGetService,
    private datePipe: DatePipe,
    private router: Router,
    private fb: FormBuilder,
    private mostrar: NbDialogService) {

    // Obtiene el rut del cliente seleccionado, al servicio indicado:
    this.rut_cliente = this.tableService.getRut_cliente();
  };


  // Método ngOnInit:
  ngOnInit() {

    // Llamada de métodos:
    this.orden();
    this.sincronizarResidencia();
    this.sincronizarTecnicos();
    this.sincronizarTipoOrdenes();
    this.crearFormulario();
    this.sincronizarEstadoCliente();
    this.sincronizarEstadoTicket();
    this.sincronizarMedioPago();
    this.sincronizarPrioridad();
  };


  // Método encargado de obtener los datos del servicio indicado y almacenarlos en variables:
  orden() {

    // Almacena en variable global la orden obtenida del servicio indicado:
    this.ordenCliente = this.tableService.getOrden();

    // Almacena en variable global el id de la orden:
    this.id_orden = this.ordenCliente['id'];

    // Almacena en variable global el id de la residencia:
    this.id_residencia = this.ordenCliente['client_residence']['id'];

    // Almacena en variable global el id del tipo de orden:
    this.id_tipoOrden = this.ordenCliente['tipo']['id'];

    // Almacena en variable global el id del estado del cliente:
    this.id_estadoCliente = this.ordenCliente['estadocliente']['id'];

    // Almacena en variable global el id del estado del ticket:
    this.id_estadoTicket = this.ordenCliente['estadoticket']['id'];

    // Almacena en variable global el id del estado del medio de pago:
    this.id_medioPago = this.ordenCliente['mediodepago']['id'];

    // Almacena en variable global el id del estado de la prioridad:
    this.id_prioridad = this.ordenCliente['prioridad']['id'];

    // Almacena en variable local la fecha de ejecución de la orden:
    let fecha = new Date(this.ordenCliente['fechaejecucion']);

    // Transforma, setea y almacena la fecha obtenida anteriormente:
    this.fecha_transform = this.datePipe.transform(fecha.setDate(fecha.getDate() + 1));

    // Guarda en variable global la fecha obtenida:
    this.fecha_ejecucion = fecha;
  };

  eventos(){

    let res = '';
    let mensaje;

    let montoPristine= this.formulario.controls['monto'].pristine;
    let direccionPristine= this.formulario.controls['direccion_cliente'].pristine;
    let comunaPristine= this.formulario.controls['comuna_cliente'].pristine;
    let tecnicoPristine= this.formulario.controls['encargado'].pristine;
    let fechaPristine= this.formulario.controls['fecha_ejecucion'].pristine;
    let disponibilidadPristine= this.formulario.controls['disponibilidad'].pristine;
    let estadoClientePristine= this.formulario.controls['estadoCliente'].pristine;
    let estadoTicketPristine= this.formulario.controls['estadoTicket'].pristine;
    let tipoOrdenPristine= this.formulario.controls['tipo_orden'].pristine;
    let medioPagoPristine= this.formulario.controls['medioPago'].pristine;
    let prioridadPristine= this.formulario.controls['prioridad'].pristine;
    let comentarioPristine= this.formulario.controls['comentario'].pristine;




    if ((montoPristine === false) && (this.ordenCliente['monto'] =! this.formulario.value['monto'])) {

      mensaje = `Se modifica el monto de $${this.ordenCliente['monto']} a $${this.formulario.value['monto']}`;

      this.reportEventos = {
        order_id: this.ordenCliente['id'],
        comentario: mensaje,
        user_email: this.tableService.getUsuario(),
      }
  
      this.service.agregarSeguimiento(this.reportEventos).subscribe(data => {
        res = data;
        console.log('res');
        console.log(res);
        this.router.navigate(['/success']);
      });
    }


    if ((direccionPristine === false) && (this.ordenCliente['client_residence']['direccion'] != 
    this.residencia_cliente.filter(x => x.id == this.formulario.value['direccion_cliente'])[0]['direccion'])) {

      mensaje = `Se modifica el domicilio '${this.ordenCliente['client_residence']['direccion']}' a 
      '${this.residencia_cliente.filter(x => x.id == this.formulario.value['direccion_cliente'])[0]['direccion']}'`;

      this.reportEventos = {
        order_id: this.ordenCliente['id'],
        comentario: mensaje,
        user_email: this.tableService.getUsuario(),
      }

      this.service.agregarSeguimiento(this.reportEventos).subscribe(data => {
        res = data;
        console.log('res');
        console.log(res);
        this.router.navigate(['/success']);
      });
    }


    if ((comunaPristine === false) && (this.ordenCliente['client_residence']['comuna'] != 
    this.residencia_cliente.filter(x => x.id == this.formulario.value['comuna_cliente'])[0]['comuna'])) {

      mensaje = `Se modifica la comuna '${this.ordenCliente['client_residence']['comuna']}' a 
      '${this.residencia_cliente.filter(x => x.id == this.formulario.value['comuna_cliente'])[0]['comuna']}'`;

      this.reportEventos = {
        order_id: this.ordenCliente['id'],
        comentario: mensaje,
        user_email: this.tableService.getUsuario(),
      }

      this.service.agregarSeguimiento(this.reportEventos).subscribe(data => {
        res = data;
        console.log('res');
        console.log(res);
        this.router.navigate(['/success']);
      });
    }


    if ((tecnicoPristine === false) && (this.ordenCliente['encargado']['nombre'] != 
    this.tecnicos.filter(x => x.rut ==this.formulario.value['encargado'])[0]['nombre'])) {

      mensaje = `Se re-asigna técnico '${this.ordenCliente['encargado']['nombre']}' por 
      '${this.tecnicos.filter(x => x.rut ==this.formulario.value['encargado'])[0]['nombre']}'`;

      this.reportEventos = {
        order_id: this.ordenCliente['id'],
        comentario: mensaje,
        user_email: this.tableService.getUsuario(),
      }
  
      this.service.agregarSeguimiento(this.reportEventos).subscribe(data => {
        res = data;
        console.log('res');
        console.log(res);
        this.router.navigate(['/success']);
      });
    }


    if ((fechaPristine === false) && (this.datePipe.transform(this.ordenCliente['fechaejecucion'], 'dd-MM-yyyy') != this.datePipe.transform(this.formulario.value['fecha_ejecucion'], 'dd-MM-yyy'))) {

      mensaje = `Se re-agenda visita del ${this.datePipe.transform(this.ordenCliente['fechaejecucion'], 'dd-MM-yyyy')} para el ${this.datePipe.transform(this.formulario.value['fecha_ejecucion'], 'dd-MM-yyy')}`;

      this.reportEventos = {
        order_id: this.ordenCliente['id'],
        comentario: mensaje,
        user_email: this.tableService.getUsuario(),
      }
  
      this.service.agregarSeguimiento(this.reportEventos).subscribe(data => {
        res = data;
        console.log('res');
        console.log(res);
        this.router.navigate(['/success']);
      });
    }


    if ((disponibilidadPristine === false) && (this.ordenCliente['disponibilidad'] != 
    this.formulario.value['disponibilidad'])) {

      mensaje = `Se modifica la disponibilidad de '${this.ordenCliente['disponibilidad']}' a 
      '${this.formulario.value['disponibilidad']}'`;

      this.reportEventos = {
        order_id: this.ordenCliente['id'],
        comentario: mensaje,
        user_email: this.tableService.getUsuario(),
      }
  
      this.service.agregarSeguimiento(this.reportEventos).subscribe(data => {
        res = data;
        console.log('res');
        console.log(res);
        this.router.navigate(['/success']);
      });
    }


    if ((estadoClientePristine === false) && (this.ordenCliente['estadocliente']['descripcion'] != 
    this.estadoCliente.filter(x => x.id == this.formulario.value['estadoCliente'])[0]['descripcion'])) {
      
      mensaje = `Se modifica el estado del cliente '${this.ordenCliente['estadocliente']['descripcion']}' a '${this.estadoCliente.filter(x => x.id == this.formulario.value['estadoCliente'])[0]['descripcion']}'`;

      this.reportEventos = {
        order_id: this.ordenCliente['id'],
        comentario: mensaje,
        user_email: this.tableService.getUsuario(),
      }
  
      this.service.agregarSeguimiento(this.reportEventos).subscribe(data => {
        res = data;
        console.log('res');
        console.log(res);
        this.router.navigate(['/success']);
      });
    }


    if ((estadoTicketPristine === false) && (this.ordenCliente['estadoticket']['descripcion'] != 
    this.estadoTicket.filter(x => x.id == this.formulario.value['estadoTicket'])[0]['descripcion'])) {

      mensaje = `Se modifica el estado del ticket '${this.ordenCliente['estadoticket']['descripcion']}' a 
      '${this.estadoTicket.filter(x => x.id == this.formulario.value['estadoTicket'])[0]['descripcion']}'`;

      this.reportEventos = {
        order_id: this.ordenCliente['id'],
        comentario: mensaje,
        user_email: this.tableService.getUsuario(),
      }
  
      this.service.agregarSeguimiento(this.reportEventos).subscribe(data => {
        res = data;
        console.log('res');
        console.log(res);
        this.router.navigate(['/success']);
      });
    }


    if ((tipoOrdenPristine === false) && (this.ordenCliente['tipo']['descripcion'] != 
    this.tipoOrdenes.filter(x => x.id == this.formulario.value['tipo_orden'])[0]['descripcion'])) {

      mensaje = `Se modifica el tipo de orden '${this.ordenCliente['tipo']['descripcion']}' a 
      '${this.tipoOrdenes.filter(x => x.id == this.formulario.value['tipo_orden'])[0]['descripcion']}'`;

      this.reportEventos = {
        order_id: this.ordenCliente['id'],
        comentario: mensaje,
        user_email: this.tableService.getUsuario(),
      }
  
      this.service.agregarSeguimiento(this.reportEventos).subscribe(data => {
        res = data;
        console.log('res');
        console.log(res);
        this.router.navigate(['/success']);
      });
    }


    if ((medioPagoPristine === false) && (this.ordenCliente['mediodepago']['descripcion'] != 
    this.medioPago.filter(x => x.id == this.formulario.value['medioPago'])[0]['descripcion'])) {

      mensaje = `Se modifica el medio de pago '${this.ordenCliente['mediodepago']['descripcion']}' a
       '${this.medioPago.filter(x => x.id == this.formulario.value['medioPago'])[0]['descripcion']}'`;

      this.reportEventos = {
        order_id: this.ordenCliente['id'],
        comentario: mensaje,
        user_email: this.tableService.getUsuario(),
      }
  
      this.service.agregarSeguimiento(this.reportEventos).subscribe(data => {
        res = data;
        console.log('res');
        console.log(res);
        this.router.navigate(['/success']);
      });
    }


    if ((prioridadPristine === false) && (this.ordenCliente['prioridad']['descripcion'] != 
    this.prioridad.filter(x => x.id == this.formulario.value['prioridad'])[0]['descripcion'])) {

      mensaje = `Se modifica prioridad '${this.ordenCliente['prioridad']['descripcion']}' a 
      '${this.prioridad.filter(x => x.id == this.formulario.value['prioridad'])[0]['descripcion']}'`;

      this.reportEventos = {
        order_id: this.ordenCliente['id'],
        comentario: mensaje,
        user_email: this.tableService.getUsuario(),
      }
  
      this.service.agregarSeguimiento(this.reportEventos).subscribe(data => {
        res = data;
        console.log('res');
        console.log(res);
        this.router.navigate(['/success']);
      });
    }


    if ((comentarioPristine === false) && (this.ordenCliente['comentario'] != 
    this.formulario.value['comentario'])) {

      mensaje = `Se agrega comentario: ${this.formulario.value['comentario']}`;

      this.reportEventos = {
        order_id: this.ordenCliente['id'],
        comentario: mensaje,
        user_email: this.tableService.getUsuario(),
      }
  
      this.service.agregarSeguimiento(this.reportEventos).subscribe(data => {
        res = data;
        console.log('res');
        console.log(res);
        this.router.navigate(['/success']);
      });
    }

  }

  // Método encargado de actualizar la orden obtenida desde el servicio:
  actualizarOrden() {

    // Si el formulario es válido, ejecutar:
    if ((this.formulario.valid) || (this.formulario.controls['fecha_ejecucion'].status == "INVALID")) {

      /* Se define la estructura de datos a enviar al servicio y 
      se le asignan los datos obtenidos del formulario: */
      this.report = {
        id: this.ordenCliente['id'],
        idtipo: this.formulario.value['tipo_orden'],
        prioridad: this.formulario.value['prioridad'],
        disponibilidad: this.formulario.value['disponibilidad'],
        comentario: this.formulario.value['comentario'],
        fechaejecucion: this.datePipe.transform(this.formulario.value['fecha_ejecucion'], 'yyyy-MM-dd'),
        estadocliente: this.formulario.value['estadoCliente'],
        estadoticket: this.formulario.value['estadoTicket'],
        mediodepago: this.formulario.value['medioPago'],
        monto: this.formulario.value['monto'],
        created_by: this.ordenCliente['created_by']['email'],
        encargado: this.formulario.value['encargado'],
        client_order: this.ordenCliente['client_order']['rut'],
        domicilio: this.formulario.value['direccion_cliente'],
      };

      let res = '';

      console.log(this.report);

      // Se envían los datos obtenidos del formulario al servicio para alojarlos en la API.
      this.service.editarOrden(this.report).subscribe(data => {
        res = data;
        console.log('res');
        console.log(res);
        this.router.navigate(['/success']);
      });
    } else {
      alert("Revisa los campos")
    };
  };


  // Método que sincroniza los datos del servicio con los del componente actual:
  sincronizarTecnicos() {

    /* Obtiene la lista de técnicos desde el servicio
    y los almacena en variable (tecnicos): */
    this.service.leerTecnicos().subscribe((TecnicosList) => {
      this.tecnicos = TecnicosList;
    });


  };


  // Método que sincroniza los datos del servicio con los del componente actual:
  sincronizarResidencia() {

    /* Obtiene la lista de residencias desde el servicio
    y los almacena en variable (residencia_cliente): */
    this.service.leerResidencia(this.rut_cliente).subscribe((residenciaList) => {
      this.residencia_cliente = residenciaList;
    });
  };


  // Método que sincroniza los datos del servicio con los del componente actual:
  sincronizarTipoOrdenes() {

    /* Obtiene la lista de tipos de ordenes desde el servicio
    y los almacena en variable (tipoOrdenes): */
    this.service.leerTipoOrdenes().subscribe((tipoOrdenesList) => {
      this.tipoOrdenes = tipoOrdenesList;
    });
  };


  // Método que sincroniza los datos del servicio con los del componente actual:
  sincronizarEstadoCliente() {

    /* Obtiene la lista de tipos de ordenes desde el servicio
    y los almacena en variable (estadoCliente): */
    this.service.leerEstadoCliente().subscribe((estadoClienteList) => {
      this.estadoCliente = estadoClienteList;
    });
  };

  // Método que sincroniza los datos del servicio con los del componente actual:
  sincronizarEstadoTicket() {

    /* Obtiene la lista de tipos de ordenes desde el servicio
    y los almacena en variable (estadoTicket): */
    this.service.leerEstadoTicket().subscribe((estadoTicketList) => {
      this.estadoTicket = estadoTicketList;
    });
  };

  // Método que sincroniza los datos del servicio con los del componente actual:
  sincronizarMedioPago() {

    /* Obtiene la lista de tipos de ordenes desde el servicio
    y los almacena en variable (medioPago): */
    this.service.leerMedioPago().subscribe((medioPagoList) => {
      this.medioPago = medioPagoList;
    });
  };

  // Método que sincroniza los datos del servicio con los del componente actual:
  sincronizarPrioridad() {

    /* Obtiene la lista de tipos de ordenes desde el servicio
    y los almacena en variable (prioridad): */
    this.service.leerPrioridad().subscribe((prioridadList) => {
      this.prioridad = prioridadList;
    });
  };



  verSeguimientos(){

    this.tableService.setId_orden(this.ordenCliente['id']);

    this.mostrar.open(SeguimientosComponent);

  }

  // Método encargado de crear el formulario que extrae los datos del componente html:
  crearFormulario() {

    this.formulario = this.fb.group({

      nombre_cliente: [{
        value: this.mayus(this.formato(this.ordenCliente
        ['client_order']['nombre'])), disabled: true
      }, Validators.required],

      rut_cliente: [{ value: this.rut_cliente, disabled: true }, Validators.required],

      direccion_cliente: [this.id_residencia, Validators.required],

      comuna_cliente: [this.id_residencia, Validators.required],

      telefono1: [{
        value: this.ordenCliente['client_order']['contacto1'],
        disabled: true
      }, Validators.required],

      telefono2: [{
        value: this.ordenCliente['client_order']['contacto1'],
        disabled: true
      }, Validators.required],

      correo_cliente: [{
        value: this.ordenCliente['client_order']['email'],
        disabled: true
      }, Validators.required],

      encargado: [this.ordenCliente['encargado']['rut'], Validators.required],

      creado_por: [{
        value: this.ordenCliente['created_by']['email'],
        disabled: true
      }, Validators.required],

      fecha_ejecucion: [new Date(this.fecha_ejecucion), Validators.required],

      fecha_creacion: [{
        value: this.datePipe.transform(this.ordenCliente
        ['created_at'], 'yyyy-MM-dd'), disabled: true
      }, Validators.required],

      disponibilidad: [this.ordenCliente['disponibilidad'], Validators.required],

      estadoCliente: [this.id_estadoCliente, Validators.required],

      estadoTicket: [this.id_estadoTicket, Validators.required],

      medioPago: [this.id_medioPago, Validators.required],

      monto: [this.ordenCliente['monto'], Validators.required],

      tipo_orden: [this.id_tipoOrden, Validators.required],

      prioridad: [this.id_prioridad, Validators.required],

      comentario: [this.formato(this.ordenCliente['comentario']), Validators.required],
    });
  };


  // Método encargado de transformar la primera letra de cada palabra en mayúscula:
  mayus(dato) {
    return String(dato).replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))
  };


  // Método encargado de formatear los caracteres especiales que no son interpretados por el navegador:
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
  };

};






