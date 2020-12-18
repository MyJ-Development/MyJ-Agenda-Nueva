import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { peticionesGetService } from '../../../../services/peticionesGet.service';
import { tableService } from '../../../../services/table.service';
import { OrdenCompletaComponent } from '../orden-completa/orden-completa.component';

@Component({
  selector: 'ngx-lista-ordenes',
  templateUrl: './lista-ordenes.component.html',
  styleUrls: ['./lista-ordenes.component.scss']
})
export class ListaOrdenesComponent implements OnInit {

  // Estructura de la tabla a mostrar en html:
  settings = {

    // Oculta el header de búsqueda por defecto:
    hideSubHeader: true,

    // Se define la columna de los botones con acciones a realizar:
    actions: {

      // Se define el título que aparecerá en la columna de acciones:
      columnTitle: 'Ver más',

      // Acciones por defecto:
      filter: false,
      add: false,
      edit: false,
      delete: false,

      // Acción customizada:
      custom: [
        {
          name: 'mas',
          title: '<i class="icon ion-document" title="mas"></i>'
        }
      ]
    },

    // Define las columnas que queremos mostrar en la tabla (Título/tipo de dato):
    columns: {
      id_orden: {
        title: 'Id orden',
        type: 'string',
      },
      fecha_ejecucion: {
        title: 'Fecha de ejecución',
        type: 'string',
      },
      encargado: {
        title: 'Encargado',
        type: 'string',
      },
      estado_ticket: {
        title: 'Estado ticket',
        type: 'string',
      },
    },
  };


  source: LocalDataSource = new LocalDataSource();
  data: any[] = [];
  rut_cliente: any;
  ordenesPorCliente: any[];

  constructor(private service: peticionesGetService,
    private tableService: tableService,
    private mostrar: NbDialogService) { }

  ngOnInit(): void {

    this.rut_cliente = this.tableService.getRut_cliente();

    this.sincronizacion();
  }


  sincronizacion() {

    this.service.leerOrdenesClientes(this.rut_cliente).subscribe((ordenesList) => {

      this.ordenesPorCliente = ordenesList;
      console.log(this.ordenesPorCliente);

      for (let i = 0; i < this.ordenesPorCliente.length; i++) {
        this.data.push({
          indice: i,
          id_orden: this.ordenesPorCliente[i]['id'],
          fecha_ejecucion: this.ordenesPorCliente[i]['fechaejecucion'],
          encargado: this.ordenesPorCliente[i]['encargado']['nombre'],
          estado_ticket: this.ordenesPorCliente[i]['estadoticket'],
        });

      }

      // Carga los datos insertados en una estructura del componente html:
      this.source.load(this.data);

    })
  }

  ordenCompleta(event) {

    this.mostrar.open(OrdenCompletaComponent);

    this.tableService.setIdListaOrden(event['data']['indice']);
  }

}
