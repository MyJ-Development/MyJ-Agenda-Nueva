
// Angular/core:
import { Component, OnInit } from '@angular/core';

// Angular/common:
import { DatePipe } from '@angular/common';

// Nebular/theme:
import { NbDialogRef } from '@nebular/theme';

// Servicios:
import { tableService } from '../../../../services/table.service';


// Componente decorador:
@Component({
  selector   : 'ngx-mostrar-orden',
  templateUrl: './mostrar-orden.component.html',
  styleUrls  : ['./mostrar-orden.component.scss']
})


// Clase exportable MostrarOrdenComponent que implementa método ngOnInit:
export class MostrarOrdenComponent implements OnInit {

  // Variables:
  ordenCompleta    : any[] = [];
  idOrden          : any;
  numOrden         : any;
  nombreTecnico    : any;
  nombreCliente    : any;
  rutCliente       : any;
  direccionCliente : any;
  comunaCliente    : any;
  telefonoCliente1 : any;
  telefonoCliente2 : any;
  correoCliente    : any;
  comentarioCliente: any;
  fechaCreacion    : any;
  creadoPor        : any;
  fechaEjecucion   : any;
  disponibilidad   : any;
  estadoCliente    : any;
  estadoTicket     : any;
  medioDePago      : any;
  monto            : any;
  prioridad        : any;
  tipoOrden        : any;


  // Constructor:
  constructor(protected ref   : NbDialogRef<MostrarOrdenComponent>,
              private service : tableService,
              private datePipe: DatePipe) {

    this.ordenCompleta = this.service.getOrdenCompleta();
    this.idOrden       = this.service.getIdOrden();

  }


  // Primer método al inciar en el componente:
  ngOnInit(): void {
    this.getOrdenCompleta();
  }


  // Método que obtiene un dato específico del arreglo de ordenes obtenidas del servicio:
  getOrdenCompleta() {

    // Recorre el arreglo de ordenes:
    for (let i = 0; i < this.ordenCompleta.length; i++) {

      // Condición a ejecutar si el id de la orden recorrida, es exactamente igual al seleccionado en el componente anterior:
      if (this.ordenCompleta[i]['id'] === this.idOrden[0].data['id_orden']) {

        // Guarda los datos específicos obtenidos del arreglo, en variables que son llamadas desde el componente html:
        this.numOrden          = this.ordenCompleta[i]['id'];
        this.nombreTecnico     = this.ordenCompleta[i]['encargado']['nombre'];
        this.nombreCliente     = this.ordenCompleta[i]['client_order']['nombre'];
        this.rutCliente        = this.ordenCompleta[i]['client_order']['rut'];
        this.direccionCliente  = this.ordenCompleta[i]['client_residence']['direccion'];
        this.comunaCliente     = this.ordenCompleta[i]['client_residence']['comuna'];
        this.telefonoCliente1  = this.ordenCompleta[i]['client_order']['contacto1'];
        this.telefonoCliente2  = this.ordenCompleta[i]['client_order']['contacto2'];
        this.correoCliente     = this.ordenCompleta[i]['client_order']['email'];
        this.comentarioCliente = this.ordenCompleta[i]['comentario'];
        this.creadoPor         = this.ordenCompleta[i]['created_by']['email'];
        this.fechaEjecucion    = this.ordenCompleta[i]['fechaejecucion'];
        this.disponibilidad    = this.ordenCompleta[i]['disponibilidad'];
        this.estadoCliente     = this.ordenCompleta[i]['estadocliente'];
        this.estadoTicket      = this.ordenCompleta[i]['estadoticket'];
        this.medioDePago       = this.ordenCompleta[i]['mediodepago'];
        this.monto             = this.ordenCompleta[i]['monto'];
        this.prioridad         = this.ordenCompleta[i]['prioridad'];
        this.tipoOrden         = this.ordenCompleta[i]['tipo']['descripcion'];
        this.fechaCreacion     = this.datePipe.
        transform(this.ordenCompleta[i]['created_at'], 'yyyy-MM-dd');

      }

    }
  }


  // Método que cierra el diálogo y lo remueve de la pantalla:
  dismiss() {
    this.ref.close();
  }
}





