
// Angular/core:
import { Component, OnInit } from '@angular/core';

// Angular/common:
import { DatePipe } from '@angular/common';

// Nebular/theme:
import { NbDialogRef, NbDialogService } from '@nebular/theme';

// Servicios:
import { tableService }            from '../../../../services/table.service';
import { MostrarClienteComponent } from '../mostrar-cliente/mostrar-cliente.component';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { peticionesGetService } from '../../../../services/peticionesGet.service';
import { Router } from '@angular/router';


// Componente decorador:
@Component({
  selector   : 'ngx-mostrar-orden',
  templateUrl: './mostrar-orden.component.html',
  styleUrls  : ['./mostrar-orden.component.scss']
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
  fecha_ejecucion: Date;
  fecha_transform: any;


  // Constructor:
  constructor(protected ref: NbDialogRef<MostrarOrdenComponent>,
    private tableService: tableService,
    private service: peticionesGetService,
    private datePipe: DatePipe,
    private router: Router,
    private mostrar: NbDialogService,
    private fb: FormBuilder) {

    // Obtiene el rut del cliente seleccionado, al servicio indicado:
    this.rut_cliente = this.tableService.getRut_cliente();

  }


  // Método ngOnInit:
  ngOnInit() {

    // Llamada de métodos:
    this.orden();
    this.sincronizarResidencia();
    this.sincronizarTecnicos();
    this.sincronizarTipoOrdenes();
    this.crearFormulario();
  }


  orden(){
    this.ordenCliente = this.tableService.getOrden();
    this.id_orden = this.ordenCliente['id'];
    let fecha = new Date(this.ordenCliente['fechaejecucion']);
    this.fecha_transform = this.datePipe.transform(fecha.setDate(fecha.getDate() +1));
    this.fecha_ejecucion = fecha;
  }


  actualizarOrden() {


    if (this.formulario.valid) {

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

    //Se envían los datos obtenidos del formulario al servicio para alojarlos en la API.
    this.service.editarOrden(this.report).subscribe(data => {
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


  // Método que sincroniza los datos del servicio con los del componente actual:
  sincronizarTecnicos() {

    /* Obtiene la lista de técnicos desde el servicio
    y los almacena en variable (tecnicos): */
    this.service.leerTecnicos().subscribe((TecnicosList) => {
      this.tecnicos = TecnicosList;
    })
  }


  // Método que sincroniza los datos del servicio con los del componente actual:
  sincronizarResidencia() {

    /* Obtiene la lista de residencias desde el servicio
    y los almacena en variable (residencia_cliente): */
    this.service.leerResidencia(this.rut_cliente).subscribe((residenciaList) => {
      this.residencia_cliente = residenciaList;
      this.tableService.setResidencia(this.residencia_cliente);
    })
  }


  // Método que sincroniza los datos del servicio con los del componente actual:
  sincronizarTipoOrdenes() {

    /* Obtiene la lista de tipos de ordenes desde el servicio
    y los almacena en variable (tipoOrdenes): */
    this.service.leerTipoOrdenes().subscribe((tipoOrdenesList) => {
      this.tipoOrdenes = tipoOrdenesList;
    })
  }


  // Método encargado de crear el formulario que extrae los datos del componente html:
  crearFormulario() {

    this.formulario = this.fb.group({

      nombre_cliente   : [{value: this.mayus(this.formato(this.ordenCliente['client_order']['nombre'])),
                          disabled: true}, Validators.required],
      rut_cliente      : [{value: this.rut_cliente, disabled: true}, Validators.required],
      direccion_cliente: [this.ordenCliente['client_residence']['id'], Validators.required],
      comuna_cliente   : [this.ordenCliente['client_residence']['id'], Validators.required],
      telefono1        : [{value: this.ordenCliente['client_order']['contacto1'], disabled: true}, 
                          Validators.required],
      telefono2        : [{value: this.ordenCliente['client_order']['contacto1'], disabled: true}, 
                          Validators.required],
      correo_cliente   : [{value: this.ordenCliente['client_order']['email'], disabled: true},
                          Validators.required],
      encargado        : [this.ordenCliente['encargado']['rut'], Validators.required],
      creado_por       : [{value: this.ordenCliente['created_by']['email'], disabled: true}, 
                          Validators.required],
      fecha_ejecucion  : [new Date(this.fecha_ejecucion), Validators.required],
      fecha_creacion   : [{value: this.datePipe.transform(this.ordenCliente['created_at'], 'yyyy-MM-dd'),                   disabled: true}, Validators.required],
      disponibilidad   : [this.ordenCliente['disponibilidad'], Validators.required],
      estado_cliente   : [this.ordenCliente['estadocliente'], Validators.required],
      estado_ticket    : [this.ordenCliente['estadoticket'], Validators.required],
      medio_pago       : [this.ordenCliente['mediodepago'], Validators.required],
      monto            : [this.ordenCliente['monto'], Validators.required],
      tipo_orden       : [this.ordenCliente['tipo']['id'], Validators.required],
      prioridad        : [this.ordenCliente['prioridad'], Validators.required],
      comentario       : [this.formato(this.ordenCliente['comentario']), Validators.required],
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


  // Método encargado de abrir el componente con los datos del cliente:
  verCliente(){

    // Envía el rut del cliente seleccionado, al servicio indicado:
    this.tableService.setRut_cliente(this.rut_cliente);

    this.tableService.setOrden(this.ordenCliente);

    // Cierra el componente actual:
    this.ref.close();

    // Abre el componente indicado:
    this.mostrar.open(MostrarClienteComponent);
  }

}






