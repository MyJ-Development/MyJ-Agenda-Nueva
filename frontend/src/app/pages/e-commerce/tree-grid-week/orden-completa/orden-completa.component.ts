import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { peticionesGetService } from '../../../../services/peticionesGet.service';
import { tableService } from '../../../../services/table.service';

@Component({
  selector: 'ngx-orden-completa',
  templateUrl: './orden-completa.component.html',
  styleUrls: ['./orden-completa.component.scss']
})
export class OrdenCompletaComponent implements OnInit {

  rut_cliente: any;
  idLista: any;
  ordenesPorCliente: any[];
  orden: any;
  nombre_cliente: any;
  direccion_cliente: any;
  comuna_cliente: any;
  telefono1: any;
  telefono2: any;
  correo_cliente: any;
  encargado: any;
  creado_por: any;
  fecha_creacion: any;
  fecha_ejecucion: any;
  disponibilidad: any;
  estado_cliente: any;
  estado_ticket: any;
  medio_pago: any;
  monto: any;
  tipo_orden: any;
  prioridad: any;
  comentario: any;

  constructor(private tableService: tableService,
    private service: peticionesGetService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {

    this.idLista = this.tableService.getIdListaOrden();
    this.rut_cliente = this.tableService.getRut_cliente();

    this.sincronizar();
  }


  sincronizar() {

    this.service.leerOrdenesClientes(this.rut_cliente).subscribe((ordenesList) => {

      this.ordenesPorCliente = ordenesList;
      this.orden = this.ordenesPorCliente[this.idLista];

      this.nombre_cliente = this.orden['client_order']['nombre'];
      this.direccion_cliente = this.orden['client_residence']['direccion'];
      this.comuna_cliente = this.orden['client_residence']['comuna'];
      this.telefono1 = this.orden['client_order']['contacto1'];
      this.telefono2 = this.orden['client_order']['contacto2'];
      this.correo_cliente = this.orden['client_order']['email'];
      this.encargado = this.orden['encargado']['nombre'];
      this.creado_por = this.orden['created_by']['email'];
      this.fecha_ejecucion = this.orden['fechaejecucion'];
      this.disponibilidad = this.orden['disponibilidad'];
      this.estado_cliente = this.orden['estadocliente'];
      this.estado_ticket = this.orden['estadoticket'];
      this.medio_pago = this.orden['mediodepago'];
      this.monto = this.orden['monto'];
      this.tipo_orden = this.orden['tipo']['descripcion'];
      this.prioridad = this.orden['prioridad'];
      this.comentario = this.orden['comentario'];
      this.fecha_creacion = this.datePipe.transform(this.orden['created_at'], 'yyyy-MM-dd');

    })

  }


}
