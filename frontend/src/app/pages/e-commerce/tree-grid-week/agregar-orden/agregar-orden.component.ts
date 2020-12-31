
// Angular/core:
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

// Angular/forms:
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Angular/router:
import { Router } from '@angular/router';

// Servicios:
import { peticionesGetService } from '../../../../services/peticionesGet.service';
import { tableService }         from '../../../../services/table.service';


// Componente decorado:
@Component({
  selector   : 'ngx-agregar-orden',
  templateUrl: './agregar-orden.component.html',
  styleUrls  : ['./agregar-orden.component.scss']
})


// Clase exportable AgregarOrdenComponent implementa ngOnInit:
export class AgregarOrdenComponent implements OnInit {

  // Variables:
  formulario        : FormGroup;
  residencia_cliente: any;
  report            : any;
  rut_cli           : any;
  cliente           : any;
  usuario           : any;
  tecnicos          : any[];
  tipoOrdenes       : any[];


  // Constructor:
  constructor(private tableService: tableService,
              private service     : peticionesGetService,
              private router      : Router,
              private fb          : FormBuilder,
              private datePipe    : DatePipe) {

    this.rut_cli = this.tableService.getRut_cliente();
    this.usuario = this.tableService.getUsuario();
    this.crearFormulario();

  }


  // Método ngOnInit:
  ngOnInit(): void {

    // Llamada de métodos:
    this.sincronizarResidencia();
    this.sincronizarTecnicos();
    this.sincronizarTipoOrdenes();
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
    this.service.leerResidencia(this.rut_cli).subscribe((residenciaList) => {
      this.residencia_cliente = residenciaList;
    })
  }


  // Método que sincroniza los datos del servicio con los del componente actual:
  sincronizarTipoOrdenes(){

    /* Obtiene la lista de tipos de ordenes desde el servicio
    y los almacena en variable (tipoOrdenes): */
    this.service.leerTipoOrdenes().subscribe((tipoOrdenesList) => {
      this.tipoOrdenes = tipoOrdenesList;
    })
  }


  // Método encargado de enviar los datos obtenidos al servicio:
  agregarOrden() {

    /* Se define la estructura de datos a enviar al servicio y 
    se le asignan los datos obtenidos del formulario: */
    this.report = {
      idtipo        : this.formulario.value['tipo_orden'],
      prioridad     : this.formulario.value['prioridad'],
      disponibilidad: this.formulario.value['disponibilidad'],
      comentario    : this.formulario.value['comentario'],
      fechaejecucion: this.datePipe.transform(this.formulario.value['fecha_ejecucion'], 'yyyy-MM-dd'),
      estadocliente : this.formulario.value['estado_cliente'],
      estadoticket  : this.formulario.value['estado_ticket'],
      mediodepago   : this.formulario.value['medio_pago'],
      monto         : this.formulario.value['monto'],
      created_by    : this.usuario,
      encargado     : this.formulario.value['encargado'],
      client_order  : this.rut_cli,
      domicilio     : this.formulario.value['direccion_cliente'],
    };

    console.log(this.report);

    let res = '';

    // Se envían los datos obtenidos del formulario al servicio para alojarlos en la API.
    // this.service.agregarOrden(this.report).subscribe(data => {
    //   res = data;
    //   console.log('res');
    //   console.log(res);
    //   this.router.navigate(['/success']);
    // });
  }


  // Método encargado de crear el formulario que extrae los datos del componente html:
  crearFormulario(){

    this.formulario = this.fb.group({

      rut_cliente      : [{value: this.rut_cli, disabled: true}, Validators.required],
      direccion_cliente: ['', Validators.required],
      encargado        : ['', Validators.required],
      creado_por       : [{value: this.usuario, disabled: true}, Validators.required],
      fecha_ejecucion  : ['', Validators.required],
      disponibilidad   : ['', Validators.required],
      estado_cliente   : ['', Validators.required],
      estado_ticket    : ['', Validators.required],
      medio_pago       : ['', Validators.required],
      monto            : ['', Validators.required],
      tipo_orden       : ['', Validators.required],
      prioridad        : ['', Validators.required],
      comentario       : ['', Validators.required],
    })
  }
}
