
// Angular/core:
import { Component, OnInit } from '@angular/core';

// Angular/common:
import { DatePipe } from '@angular/common';

// Angular/forms:
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Angular/router:
import { Router } from '@angular/router';
import { debounceTime } from "rxjs/operators";
import { NbDateService, NbDialogRef, NbToastrService } from '@nebular/theme';

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
  listaTecnicos     : any[];
  fechaControl      : any;
  tecnicoCapacidad  : any[] = [];
  rutRegExp         = new RegExp('^([0-9]+-[0-9k_K])$');
  montoRegExp       = new RegExp(/^\d+$/);
  min               : Date;
  max               : Date;
  rol               : any;
  loading           = false;
  showField         : any = true;  

  // Constructor:
  constructor(private tableService : tableService,
              private service      : peticionesGetService,
              private router       : Router,
              private fb           : FormBuilder,
              private datePipe     : DatePipe,
              private toastrService: NbToastrService,
              protected ref        : NbDialogRef<AgregarOrdenComponent>,
              protected dateService: NbDateService<Date>) {

    // Guarda en variable global el rut obtenido del servicio:
    this.rut_cli = this.tableService.getRut_cliente();

    // Guarda en variable global el usuario actual obtenido del servicio:
    this.usuario = this.tableService.getUsuario();

    this.rol = this.tableService.getRolUsuario();

    // Llamada de método:
    this.crearFormulario();

    // Obtiene los cambios instantáneos del formulario:
    this.formulario.controls['rut_cliente'].valueChanges.subscribe(x => {

      // Guarda en variable global el rut obtenido del formulario:
      this.rut_cli = x;
    });

    // Establece el mínimo y el máximo de rangos de fecha a escoger.
    this.min = this.dateService.addDay(this.dateService.today(), 0);
    this.max = this.dateService.addYear(this.dateService.today(), +1);
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


  get rutNoValido() {
    return this.formulario.get('rut_cliente').invalid &&
    this.formulario.get('rut_cliente').touched;
  };

  get direccionNoValido() {
    return this.formulario.get('direccion_cliente').invalid &&
    this.formulario.get('direccion_cliente').touched;
  };

  get encargadoNoValido() {
    return this.formulario.get('encargado').invalid &&
    this.formulario.get('encargado').touched;
  };

  get disponibilidadNoValido() {
    return this.formulario.get('disponibilidad').invalid &&
    this.formulario.get('disponibilidad').touched;
  };

  get estadoClienteNoValido() {
    return this.formulario.get('estado_cliente').invalid &&
    this.formulario.get('estado_cliente').touched;
  };

  get estadoTicketNoValido() {
    return this.formulario.get('estado_ticket').invalid &&
    this.formulario.get('estado_ticket').touched;
  };

  get medioPagoNoValido() {
    return this.formulario.get('medioPago').invalid &&
    this.formulario.get('medioPago').touched;
  };

  get montoNoValido() {
    return this.formulario.get('monto').invalid &&
    this.formulario.get('monto').touched;
  };

  get tipoOrdenNoValido() {
    return this.formulario.get('tipo_orden').invalid &&
    this.formulario.get('tipo_orden').touched;
  };

  get prioridadNoValido() {
    return this.formulario.get('prioridad').invalid &&
    this.formulario.get('prioridad').touched;
  };

  get comentarioNoValido() {
    return this.formulario.get('comentario').invalid &&
    this.formulario.get('comentario').touched;
  };


  // Método encargado de crear el formulario que extrae los datos del componente html:
  crearFormulario(){
    this.formulario = this.fb.group({

      rut_cliente      : ['', [Validators.required, Validators.pattern(this.rutRegExp)]],
      direccion_cliente: ['', Validators.required],
      encargado        : ['', Validators.required],
      creado_por       : [{value: this.usuario, disabled: true}, Validators.required],
      fecha_ejecucion  : ['', Validators.required],
      disponibilidad   : ['', Validators.required],
      estado_cliente   : ['', Validators.required],
      estado_ticket    : ['', Validators.required],
      medioPago        : ['', Validators.required],
      monto            : ['', [Validators.required, Validators.pattern(this.montoRegExp)]],
      tipo_orden       : ['', Validators.required],
      prioridad        : ['', Validators.required],
      comentario       : ['', Validators.required],
    });
  };


  getOrdenes(){

    if (this.rol !== 'super') {
      this.showField = false
      this.formulario.valueChanges.pipe(debounceTime(1500)).subscribe(x => {

        if ((this.formulario.controls['tipo_orden'].value != "") && 
        (this.formulario.controls['fecha_ejecucion'].value != "")) {
  
          this.fechaControl = this.datePipe.transform(this.formulario.controls['fecha_ejecucion'].value, 'yyyy-MM-dd');
  
          let tipoOrdenControl = this.formulario.controls['tipo_orden'].value;
  
          // Obtiene el peso de cada tipo de orden seleccionada:
          let pesoOrden = this.tipoOrdenes.filter(tipo => tipo.id == tipoOrdenControl)
          .map(tipo => tipo.peso)[0];
  
          // Filtra los tecnicos por capacidad:
          // let capacidadTecnico = this.tecnicos.filter(encargado => encargado.capacidad >= capacidad);
  
          this.service.leerOrdenesDiarias(this.fechaControl, this.fechaControl)
          .subscribe((ordenesList) => {
  
            this.ordenesDiarias = ordenesList;
  
            let capacidadTotal;
  
            this.listaTecnicos = [];
  
            for (let tecnico of this.tecnicos){
  
              if (tecnico.active) {
                
                // Filtra las ordenes por nombre del tecnico.
                let orden = this.ordenesDiarias.filter(x => x.encargado.nombre == tecnico.nombre);
  
                // Mapea las ordenes del tecnico por el peso.
                let mapeo = orden.map(x => x.tipo.peso);
  
                let suma: number = 0;
  
                // Suma el peso de cada orden diaria del tecnico y lo almacena en variable.
                for (let i = 0; i < mapeo.length; i++) {
                  suma = mapeo[i] + suma
                };
  
                capacidadTotal = suma + pesoOrden;
  
                if (suma >= 1) {
  
                  this.tecnicoCapacidad.push({
                    tecnico  : tecnico.nombre,
                    capacidad: suma,
                  });
  
                } else {
  
                  suma = 0;
  
                  this.tecnicoCapacidad.push({
                    tecnico  : tecnico.nombre,
                    capacidad: suma,
                  });
                };
  
                for (let tipo of tecnico.type_orders) {
                  if ((tecnico.capacidad >= capacidadTotal) && (tipo.id === tipoOrdenControl) && 
                  (tecnico.active)) {
  
                    let capRestante = tecnico.capacidad - capacidadTotal;
                  
                    this.listaTecnicos.push({
                      id       : tecnico.id,
                      rut      : tecnico.rut,
                      nombre   : `(${capRestante}) ${tecnico.nombre}`,
                      comuna   : tecnico.comuna,
                      estado   : tecnico.estado,
                      capacidad: tecnico.capacidad,
                      active   : tecnico.active,
                    });
                  };
                };
              }
            };
          });
        };
      });
    };
  };


  // Método que sincroniza los datos del servicio con los del componente actual:
  sincronizarTecnicos() {

    if (this.rol === 'super') {

      /* Obtiene la lista de técnicos desde el servicio
      y los almacena en variable (tecnicos): */
      this.service.leerTecnicos().subscribe((TecnicosList) => {
        this.tecnicos = TecnicosList.filter((tecnico) => tecnico.active == true);
        this.listaTecnicos = this.tecnicos;
      });
      
    } else if (this.rol === 'vendedor') {

      /* Obtiene la lista de técnicos desde el servicio
      y los almacena en variable (tecnicos): */
      this.service.leerTecnicoUsuario(this.usuario).subscribe((TecnicosList) => {
        this.tecnicos = TecnicosList.filter((tecnico) => tecnico.active == true);
      });

    } else {

      this.service.leerTecnicos().subscribe((TecnicosList) => {
        this.tecnicos = TecnicosList.filter((tecnico) => tecnico.active == true);
      });
    };
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
      this.tipoOrdenes = tipoOrdenesList.filter((tipo) => tipo.active === true);
    });
  };


  // Método que sincroniza los datos del servicio con los del componente actual:
  sincronizarEstadoCliente(){

    /* Obtiene la lista de tipos de ordenes desde el servicio
    y los almacena en variable (estadoCliente): */
    this.service.leerEstadoCliente().subscribe((estadoClienteList) => {
      this.estadoCliente = estadoClienteList.filter((estado) => estado.active === true);
    });
  };


  // Método que sincroniza los datos del servicio con los del componente actual:
  sincronizarEstadoTicket(){

    /* Obtiene la lista de tipos de ordenes desde el servicio
    y los almacena en variable (estadoTicket): */
    this.service.leerEstadoTicket().subscribe((estadoTicketList) => {
      this.estadoTicket = estadoTicketList.filter((estado) => estado.active === true);
    });
  };


  // Método que sincroniza los datos del servicio con los del componente actual:
  sincronizarMedioPago(){

    /* Obtiene la lista de tipos de ordenes desde el servicio
    y los almacena en variable (medioPago): */
    this.service.leerMedioPago().subscribe((medioPagoList) => {
      this.medioPago = medioPagoList.filter((medio) => medio.active === true);
    });
  };


  // Método que sincroniza los datos del servicio con los del componente actual:
  sincronizarPrioridad(){

    /* Obtiene la lista de tipos de ordenes desde el servicio
    y los almacena en variable (prioridad): */
    this.service.leerPrioridad().subscribe((prioridadList) => {
      this.prioridad = prioridadList.filter((prioridad) => prioridad.active === true);
    });
  };


/*
  showToast(icono,text?) {
    //const iconConfig: NbIconConfig = { icon: icono, pack: 'eva' };
    this.toastrService.show(
      '',
      text)
  }
*/

  showToast(destroyByClick,duration,id) {
    this.toastrService.show(
      'Orden creada exitosamente!',
      `ID Orden: `+id,
      { destroyByClick,duration });
  };

  showToastFail(destroyByClick,duration) {
    this.toastrService.show(
      'Fallo en la creación de la orden!',
      `Cliente ya posee una orden abierta agendada`,
      { destroyByClick,duration });
  };
  

  // Método encargado de enviar los datos obtenidos al servicio:
  agregarOrden() {
    
    // let dia = this.tableService.getFechaClick();

    // this.syncService.changeMessage(dia);

    this.formulario.controls['fecha_ejecucion'].setErrors(null);

    if (this.formulario.valid) {

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
        mediodepago   : this.formulario.value['medioPago'],
        monto         : this.formulario.value['monto'],
        created_by    : this.usuario,
        encargado     : this.formulario.value['encargado'],
        client_order  : this.rut_cli,
        domicilio     : this.formulario.value['direccion_cliente'],
      };

      this.loading = true
    } else {
      this.formulario.markAllAsTouched();
    };

    let res = '';

    if (this.report) {
      
      // Se envían los datos obtenidos del formulario al servicio para alojarlos en la API.

      //this.service.verificarOrden()

      this.service.verificarOrden(this.report.client_order).subscribe(data => {
        this.loading = false
        let res :any;
        res = data;
        if(res['response'] == 1){
          this.service.agregarOrden(this.report).subscribe(data => {
            this.loading = false
            res = data;
            this.router.navigate(['/success']);
            this.showToast(false,15000,res['id']);
            this.ref.close();
          });
        } else {
          this.showToastFail(false,5000)
        }
        

      });

    };
  };
};