
// Angular/core:
import { Component, OnInit } from '@angular/core';

// Angular/common:
import { DatePipe } from '@angular/common';

// Servicios:
import { peticionesGetService } from '../../../../services/peticionesGet.service';
import { tableService }         from '../../../../services/table.service';
import { NbDialogRef, NbDialogService } from '@nebular/theme';


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
  rut_cliente      : any;
  idLista          : any;
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
              private mostrar : NbDialogService) {
            
  }


  // Método ngOnInit:
  ngOnInit(): void {

    // Obtiene el id seleccionado de la lista, al servicio indicado:
    this.idLista     = this.tableService.getIdListaOrden();

    // Obtiene el rut del cliente seleccionado, al servicio indicado:
    this.rut_cliente = this.tableService.getRut_cliente();

    // Llamada de métodos:
    this.sincronizarClientes();
  }


  // Método que sincroniza los datos del servicio con los del componente actual:
  sincronizarClientes() {

    /* Obtiene la lista de clientes desde el servicio 
    y los almacena en variable (cliente): */
    this.service.leerOrdenesClientes(this.rut_cliente).subscribe((ordenesList) => {

      this.ordenesPorCliente = ordenesList;

      // Obtiene una orden de la lista, ingresando como parámetro el id seleccionado:
      this.orden = this.ordenesPorCliente[this.idLista];

      // Almacena en variables locales, los datos obtenidos del objeto orden:
      this.id_orden          = this.orden['id'];
      this.nombre_cliente    = this.orden['client_order']['nombre'];
      this.direccion_cliente = this.orden['client_residence']['direccion'];
      this.comuna_cliente    = this.orden['client_residence']['comuna'];
      this.telefono1         = this.orden['client_order']['contacto1'];
      this.telefono2         = this.orden['client_order']['contacto2'];
      this.correo_cliente    = this.orden['client_order']['email'];
      this.encargado         = this.orden['encargado']['nombre'];
      this.creado_por        = this.orden['created_by']['email'];
      this.fecha_ejecucion   = this.orden['fechaejecucion'];
      this.disponibilidad    = this.orden['disponibilidad'];
      this.estado_cliente    = this.orden['estadocliente'];
      this.estado_ticket     = this.orden['estadoticket'];
      this.medio_pago        = this.orden['mediodepago'];
      this.monto             = this.orden['monto'];
      this.tipo_orden        = this.orden['tipo']['descripcion'];
      this.prioridad         = this.orden['prioridad'];
      this.comentario        = this.orden['comentario'];
      this.fecha_creacion    = this.datePipe.transform(this.orden['created_at'], 'yyyy-MM-dd');
    })
  }
}
