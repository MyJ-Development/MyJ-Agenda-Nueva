
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
import { peticionesGetService } from '../../../../services/peticionesGet.service';
import { tableService }         from '../../../../services/table.service';
import { MostrarClienteComponent } from '../mostrar-cliente/mostrar-cliente.component';


// Componente decorado:
@Component({
  selector   : 'ngx-orden-completa',
  templateUrl: './orden-completa.component.html',
  styleUrls  : ['./orden-completa.component.scss']
})


// Clase exportable OrdenCompletaComponent implementa ngOnInit:
export class OrdenCompletaComponent implements OnInit {

  // Variables:
  formulario        : FormGroup;
  residencia_cliente: any;
  rut_cliente       : any;
  id_orden          : any;
  ordenCliente      : any;
  report            : any;
  fecha_ejecucion   : any;
  fecha_transform   : any;
  tecnicos          : any[];
  tipoOrdenes       : any[];
  estadoCliente     : any[];
  estadoTicket      : any[];
  medioPago         : any[];
  prioridad         : any[];
  id_estadoCliente  : any;
  id_estadoTicket   : any;
  id_medioPago      : any;
  id_prioridad      : any;
  id_tipoOrden      : any;


  // Constructor:
  constructor(protected ref       : NbDialogRef<OrdenCompletaComponent>,
              private tableService: tableService,
              private service     : peticionesGetService,
              private datePipe    : DatePipe,
              private router      : Router,
              private fb          : FormBuilder,
              private mostrar: NbDialogService) {

    // Obtiene el rut del cliente desde el servicio indicado:
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


  // Método encargado de obtener la orden del cliente desde el servicio indicado:
  orden() {

    // Almacena en variable global la orden obtenida desde el servicio:
    this.ordenCliente = this.tableService.getOrden();

    // Almacena en variable global el id de la orden:
    this.id_orden = this.ordenCliente['id'];

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

    // Formatea y setea la fecha obtenida anteriormente:
    this.fecha_transform = this.datePipe.transform(fecha.setDate(fecha.getDate() + 1));

    // Almacena en variable global la fecha obtenida anteriormente:
    this.fecha_ejecucion = fecha;
  };


  // Método encargado de actualizar la orden obtenida anteriormente:
  actualizarOrden() {

    // Si el formulario es válido, ejecutar:
    if ((this.formulario.valid) || (this.formulario.controls['fecha_ejecucion'].status == "INVALID")) {

      /* Se define la estructura de datos a enviar al servicio y 
      se le asignan los datos obtenidos del formulario: */
      this.report = {
        id            : this.ordenCliente['id'],
        idtipo        : this.formulario.value['tipo_orden'],
        prioridad     : this.formulario.value['prioridad'],
        disponibilidad: this.formulario.value['disponibilidad'],
        comentario    : this.formulario.value['comentario'],
        fechaejecucion: this.datePipe.transform(this.formulario.value['fecha_ejecucion'], 'yyyy-MM-dd'),
        estadocliente : this.formulario.value['estado_cliente'],
        estadoticket  : this.formulario.value['estado_ticket'],
        mediodepago   : this.formulario.value['medio_pago'],
        monto         : this.formulario.value['monto'],
        created_by    : this.ordenCliente['created_by']['email'],
        encargado     : this.formulario.value['encargado'],
        client_order  : this.ordenCliente['client_order']['rut'],
        domicilio     : this.formulario.value['direccion_cliente'],
      };

      let res = '';

      
      // Se envían los datos obtenidos del formulario al servicio para alojarlos en la API.
      this.service.editarOrden(this.report).subscribe(data => {
        res = data;
        console.log('res');
        console.log(res);
        this.router.navigate(['/success']);
      });

      
    } else {
      console.log(this.formulario);
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
      this.tableService.setResidencia(this.residencia_cliente);
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
    sincronizarEstadoCliente(){

      /* Obtiene la lista de tipos de ordenes desde el servicio
      y los almacena en variable (estadoCliente): */
      this.service.leerEstadoCliente().subscribe((estadoClienteList) => {
        this.estadoCliente = estadoClienteList;
      });
    };
  
    // Método que sincroniza los datos del servicio con los del componente actual:
    sincronizarEstadoTicket(){
  
      /* Obtiene la lista de tipos de ordenes desde el servicio
      y los almacena en variable (estadoTicket): */
      this.service.leerEstadoTicket().subscribe((estadoTicketList) => {
        this.estadoTicket = estadoTicketList;
      });
    };
  
    // Método que sincroniza los datos del servicio con los del componente actual:
    sincronizarMedioPago(){
  
      /* Obtiene la lista de tipos de ordenes desde el servicio
      y los almacena en variable (medioPago): */
      this.service.leerMedioPago().subscribe((medioPagoList) => {
        this.medioPago = medioPagoList;
      });
    };
  
    // Método que sincroniza los datos del servicio con los del componente actual:
    sincronizarPrioridad(){
  
      /* Obtiene la lista de tipos de ordenes desde el servicio
      y los almacena en variable (prioridad): */
      this.service.leerPrioridad().subscribe((prioridadList) => {
        this.prioridad = prioridadList;
      });
    };


  // Método encargado de crear el formulario que extrae los datos del componente html:
  crearFormulario() {

    this.formulario = this.fb.group({

      nombre_cliente   :[{value: this.mayus(this.formato(this.ordenCliente
                        ['client_order']['nombre'])), disabled: true}, Validators.required],
      rut_cliente      :[{value: this.rut_cliente, disabled: true}, Validators.required],
      direccion_cliente:[this.ordenCliente['client_residence']['id'], Validators.required],
      comuna_cliente   :[this.ordenCliente['client_residence']['id'], Validators.required],
      telefono1        :[{value: this.ordenCliente['client_order']['contacto1'], 
                          disabled: true}, Validators.required],
      telefono2        :[{value: this.ordenCliente['client_order']['contacto2'], 
                          disabled: true}, Validators.required],
      correo_cliente   :[{value: this.ordenCliente['client_order']['email'], 
                          disabled: true}, Validators.required],
      encargado        :[this.ordenCliente['encargado']['rut'], Validators.required],
      creado_por       :[{value: this.ordenCliente['created_by']['email'], 
                          disabled: true}, Validators.required],
      fecha_ejecucion  :[new Date(this.fecha_ejecucion), Validators.required],
      fecha_creacion   :[{value: this.datePipe.transform(this.ordenCliente
                        ['created_at'], 'yyyy-MM-dd'), disabled: true }, Validators.required],
      disponibilidad   :[this.ordenCliente['disponibilidad'], Validators.required],
      estadoCliente    :[this.id_estadoCliente, Validators.required],
      estadoTicket     :[this.id_estadoTicket, Validators.required],
      medioPago        :[this.id_medioPago, Validators.required],
      monto            :[this.ordenCliente['monto'], Validators.required],
      tipo_orden       :[this.id_medioPago, Validators.required],
      prioridad        :[this.id_prioridad, Validators.required],
      comentario       :[this.formato(this.ordenCliente['comentario']), Validators.required],
    });
  };

    // Método encargado de abrir el componente con los datos del cliente:
  verCliente() {

    // Envía el rut del cliente seleccionado, al servicio indicado:
    this.tableService.setRut_cliente(this.rut_cliente);

    // Envía la orden seleccionada, al servicio indicado:
    this.tableService.setOrden(this.ordenCliente);

    // Cierra el componente actual:
    this.ref.close();

    // Abre el componente indicado:
    this.mostrar.open(MostrarClienteComponent);
  };

  // Método encargado de transformar la primera letra de cada palabra en mayúscula:
  mayus(dato) {
    return String(dato).replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))
  };


  // Método encargado de formatear los carácteres especiales que no son interpretados por el navegador:
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
