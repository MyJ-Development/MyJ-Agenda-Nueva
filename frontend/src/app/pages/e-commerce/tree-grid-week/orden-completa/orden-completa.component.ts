
// Angular/core:
import { Component, OnInit } from '@angular/core';

// Angular/common:
import { DatePipe } from '@angular/common';

// Servicios:
import { peticionesGetService } from '../../../../services/peticionesGet.service';
import { tableService }         from '../../../../services/table.service';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


// Compontente decorado:
@Component({
  selector   : 'ngx-orden-completa',
  templateUrl: './orden-completa.component.html',
  styleUrls  : ['./orden-completa.component.scss']
})


// Clase exportable OrdenCompletaComponent implementa ngOnInit:
export class OrdenCompletaComponent implements OnInit {

  // Variables:
  ordenesPorCliente: any[];
  cliente          : any;
  tecnicos         : any[];
  tipoOrdenes      : any[];
  residencia_cliente: any;
  formulario       : FormGroup;
  rut_cliente      : any;
  idOrden          : any;
  orden            : any;
  nombre_cliente   : any;
  direccion_cliente: any;
  comuna_cliente   : any;
  telefono1        : any;
  telefono2        : any;
  correo_cliente   : any;
  encargado        : any;
  creado_por       : any;
  fecha_creacion   : any;
  fecha_ejecucion  : any;
  disponibilidad   : any;
  estado_cliente   : any;
  estado_ticket    : any;
  medio_pago       : any;
  monto            : any;
  tipo_orden       : any;
  prioridad        : any;
  comentario       : any;
  id_orden         : any;


  // Constructor:
  constructor(protected ref   : NbDialogRef<OrdenCompletaComponent>,
              private tableService: tableService,
              private service     : peticionesGetService,
              private datePipe    : DatePipe,
              private mostrar     : NbDialogService,
              private fb          : FormBuilder) {



                
                


            
  }


  // Método ngOnInit:
  ngOnInit() {

    // Obtiene el rut del cliente seleccionado, al servicio indicado:
    this.rut_cliente = this.tableService.getRut_cliente();
    // Obtiene el id seleccionado de la lista, al servicio indicado:
    this.idOrden     = this.tableService.getIdOrden();

    // Llamada de métodos:
    // this.sincronizarResidencia();
    // this.sincronizarTecnicos();
    // this.sincronizarTipoOrdenes();
    
    this.sincronizarClientes();
    this.crearFormulario();
    

    console.log('id');
    console.log(this.idOrden);

    console.log('clientes');
    console.log(this.sincronizarClientes());

    console.log('nombre');
    console.log(this.nombre_cliente);

  }


  actualizarOrden(){

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

  // Método que sincroniza los datos del servicio con los del componente actual:
  sincronizarClientes() {

    /* Obtiene la lista de clientes desde el servicio 
    y los almacena en variable (cliente): */
    this.service.leerOrdenesClientesRut(this.rut_cliente).subscribe((ordenesList) => {

      this.ordenesPorCliente = ordenesList;

      for (let i = 0; i < this.ordenesPorCliente.length; i++) {
        
        if (this.idOrden === this.ordenesPorCliente[i]['id']) {
          
          // Almacena en variables locales, los datos obtenidos del objeto orden:
          this.id_orden          = this.ordenesPorCliente[i]['id'];
          this.nombre_cliente    = this.ordenesPorCliente[i]['client_order']['nombre'];
          this.direccion_cliente = this.ordenesPorCliente[i]['client_residence']['direccion'];
          this.comuna_cliente    = this.ordenesPorCliente[i]['client_residence']['comuna'];
          this.telefono1         = this.ordenesPorCliente[i]['client_order']['contacto1'];
          this.telefono2         = this.ordenesPorCliente[i]['client_order']['contacto2'];
          this.correo_cliente    = this.ordenesPorCliente[i]['client_order']['email'];
          this.encargado         = this.ordenesPorCliente[i]['encargado']['nombre'];
          this.creado_por        = this.ordenesPorCliente[i]['created_by']['email'];
          this.fecha_ejecucion   = this.ordenesPorCliente[i]['fechaejecucion'];
          this.disponibilidad    = this.ordenesPorCliente[i]['disponibilidad'];
          this.estado_cliente    = this.ordenesPorCliente[i]['estadocliente'];
          this.estado_ticket     = this.ordenesPorCliente[i]['estadoticket'];
          this.medio_pago        = this.ordenesPorCliente[i]['mediodepago'];
          this.monto             = this.ordenesPorCliente[i]['monto'];
          this.tipo_orden        = this.ordenesPorCliente[i]['tipo']['descripcion'];
          this.prioridad         = this.ordenesPorCliente[i]['prioridad'];
          this.comentario        = this.ordenesPorCliente[i]['comentario'];
          this.fecha_creacion    = this.datePipe.transform(this.ordenesPorCliente[i]['created_at'], 'yyyy-MM-dd');
        }
        
      }
    })
  }


  // Método encargado de crear el formulario que extrae los datos del componente html:
  crearFormulario(){

    this.formulario = this.fb.group({

      nombre_cliente   : [this.nombre_cliente, Validators.required],
      rut_cliente      : [this.rut_cliente, Validators.required],
      direccion_cliente: ['', Validators.required],
      comuna_cliente   : ['', Validators.required],
      telefono1        : ['', Validators.required],
      telefono2        : ['', Validators.required],
      correo_cliente   : ['', Validators.required],
      nombre_encargado : ['', Validators.required],
      creado_por       : ['', Validators.required],
      fecha_ejecucion  : ['', Validators.required],
      fecha_creacion   : ['', Validators.required],
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
