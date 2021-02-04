
// Angular/core:
import { Component, OnInit } from '@angular/core';

// Angular/common:
import { DatePipe } from '@angular/common';

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
  estadoCliente     : any[];
  estadoTicket      : any[];
  medioPago         : any[];
  prioridad         : any[];
  ordenesDiarias    : any[];
  listaTecnicos     : any;
  fechaControl      : any;
  encargadoControl  : any;


  // Constructor:
  constructor(private tableService: tableService,
              private service     : peticionesGetService,
              private router      : Router,
              private fb          : FormBuilder,
              private datePipe    : DatePipe) {

    // Guarda en variable global el rut obtenido del servicio:
    this.rut_cli = this.tableService.getRut_cliente();

    // Guarda en variable global el usuario actual obtenido del servicio:
    this.usuario = this.tableService.getUsuario();

    // Llamada de método:
    this.crearFormulario();

    // Obtiene los cambios instantáneos del formulario:
    this.formulario.controls['rut_cliente'].valueChanges.subscribe(x => {

      // Guarda en variable global el rut obtenido del formulario:
      this.rut_cli = x;
    });

  };


  // Método ngOnInit:
  ngOnInit(): void {

    // Llamada de métodos:
    this.sincronizarTecnicos();
    this.sincronizarTipoOrdenes();
    this.sincronizarEstadoCliente();
    this.sincronizarEstadoTicket();
    this.sincronizarMedioPago();
    this.sincronizarPrioridad();
    this.getOrdenes();
  };

  getOrdenes(){

    this.formulario.valueChanges.subscribe(x => {

      if ((this.formulario.controls['tipo_orden'].value != "") && 
      (this.formulario.controls['fecha_ejecucion'].value != "")) {

        this.fechaControl = this.datePipe.transform(this.formulario.controls['fecha_ejecucion'].value, 'yyyy-MM-dd');

        // this.encargadoControl = this.tecnicos.filter(encargado => 
        //   encargado.rut == this.formulario.controls['encargado'].value).map(x => x.nombre)[0];


        let tipoOrdenControl = this.formulario.controls['tipo_orden'].value;

        // Obtiene el peso de cada tipo de orden seleccionada:
        let capacidad = this.tipoOrdenes.filter(tipo => tipo.id == tipoOrdenControl)
        .map(tipo => tipo.peso)[0];

        // Filtra los tecnicos por capacidad:
        let capacidadTecnico = this.tecnicos.filter(encargado => 
          encargado.capacidad >= capacidad);

          console.log(capacidadTecnico);


        this.service.leerOrdenesDiarias(this.fechaControl, this.fechaControl)
        .subscribe((ordenesList) => {

          this.ordenesDiarias = ordenesList;

          for (let tecnico of capacidadTecnico){

            let orden = this.ordenesDiarias.filter(x => x.encargado.nombre == tecnico.nombre)

            console.log(orden);
          }

          // let todo = this.ordenesDiarias.filter(x => x.encargado.nombre == capacidadTecnico)

          // console.log(todo);

          // let ordenesPorTecnico = this.ordenesDiarias.filter(x => 
          //   x.encargado.nombre == this.encargadoControl)

          // let peso = this.ordenesDiarias.map(x => x.tipo.peso);
          // let suma;

          // for (let i = 0; i < peso.length; i++) {
          //   suma = i + 1;
          // }



            // let nuevaCapacidad = capacidadTecnico - suma;


            // this.listaTecnicos = this.tecnicos.filter(encargado => 
            //   ((encargado.capacidad >= (capacidad + nuevaCapacidad))))

        })
        
      }
      
    })

  }


  // Método que sincroniza los datos del servicio con los del componente actual:
  sincronizarTecnicos() {

    /* Obtiene la lista de técnicos desde el servicio
    y los almacena en variable (tecnicos): */
    this.service.leerTecnicos().subscribe((TecnicosList) => {
      this.tecnicos = TecnicosList;
    });
  };


  // Método que sincroniza los datos del servicio con los del componente actual:
  sincronizarResidencia(){
    
    /* Obtiene la lista de residencias desde el servicio
    y los almacena en variable (residencia_cliente): */
    this.service.leerResidencia(this.rut_cli).subscribe((residenciaList) => {
      this.residencia_cliente = residenciaList;
    });
  };


  // Método que sincroniza los datos del servicio con los del componente actual:
  sincronizarTipoOrdenes(){

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


  // Método encargado de enviar los datos obtenidos al servicio:
  agregarOrden() {

    /* Se define la estructura de datos a enviar al servicio y 
    se le asignan los datos obtenidos del formulario: */
    this.report = {
      idtipo        : this.formulario.value['tipo_orden'],
      prioridad     : this.formulario.value['prioridad'],
      disponibilidad: this.formulario.value['disponibilidad'],
      comentario    : this.formulario.value['comentario'],
      fechaejecucion: this.datePipe.transform(
                      this.formulario.value['fecha_ejecucion'], 'yyyy-MM-dd'),
      estadocliente : this.formulario.value['estado_cliente'],
      estadoticket  : this.formulario.value['estado_ticket'],
      mediodepago   : this.formulario.value['medio_pago'],
      monto         : this.formulario.value['monto'],
      created_by    : this.usuario,
      encargado     : this.formulario.value['encargado'],
      client_order  : this.rut_cli,
      domicilio     : this.formulario.value['direccion_cliente'],
    };

    let res = '';

    // Se envían los datos obtenidos del formulario al servicio para alojarlos en la API.
    this.service.agregarOrden(this.report).subscribe(data => {
      res = data;
      console.log('res');
      console.log(res);
      this.router.navigate(['/success']);
    });
  };


  // Método encargado de crear el formulario que extrae los datos del componente html:
  crearFormulario(){

    this.formulario = this.fb.group({

      rut_cliente      : ['', Validators.required],
      direccion_cliente: ['', Validators.required],
      encargado        : ['', Validators.required],
      creado_por       : [{value: this.usuario, disabled: true}, Validators.required],
      fecha_ejecucion  : ['', Validators.required],
      disponibilidad   : ['', Validators.required],
      estado_cliente   : ['', Validators.required],
      estado_ticket    : ['', Validators.required],
      medioPago        : ['', Validators.required],
      monto            : ['', Validators.required],
      tipo_orden       : ['', Validators.required],
      prioridad        : ['', Validators.required],
      comentario       : ['', Validators.required],
    });
  };
};