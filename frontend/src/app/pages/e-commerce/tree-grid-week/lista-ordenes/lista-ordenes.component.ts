
// Angular/core:
import { Component, OnInit } from '@angular/core';

// Nebular/theme:
import { NbDialogService } from '@nebular/theme';

// Ng2-smart-table:
import { LocalDataSource } from 'ng2-smart-table';

// Servicios:
import { peticionesGetService } from '../../../../services/peticionesGet.service';
import { tableService }         from '../../../../services/table.service';

// Componentes:
import { MostrarOrdenComponent } from '../mostrar-orden/mostrar-orden.component';


// Componente decorado:
@Component({
  selector   : 'ngx-lista-ordenes',
  templateUrl: './lista-ordenes.component.html',
  styleUrls  : ['./lista-ordenes.component.scss']
})


// Clase exportable ListaOrdenesComponent implementa ngOnInit:
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
      add   : false,
      edit  : false,
      delete: false,

      // Acción customizada:
      custom: [
        {
          name : 'mas',
          title: '<i class="icon ion-document" title="mas"></i>'
        }
      ]
    },

    // Define las columnas que queremos mostrar en la tabla (Título/tipo de dato):
    columns: {
      id_orden: {
        title: 'Id orden',
        type : 'string',
      },
      fecha_ejecucion: {
        title: 'Fecha de ejecución',
        type : 'string',
      },
      encargado: {
        title: 'Encargado',
        type : 'string',
      },
      estado_ticket: {
        title: 'Estado ticket',
        type : 'string',
      },
    },
  };


  // Variables:
  source           : LocalDataSource = new LocalDataSource();
  data             : any[]           = [];
  ordenesPorCliente: any[];
  rut_cliente      : any;



  // Constructor:
  constructor(private service     : peticionesGetService,
              private tableService: tableService,
              private mostrar     : NbDialogService) {

  };


  // Método ngOnInit:
  ngOnInit(): void {

    // Obtiene el rut_cliente desde el servicio, enviado previamente desde otro componente:
    this.rut_cliente = this.tableService.getRut_cliente();

    //Llamada de métodos:
    this.sincronizacion();
  };


  // Método que sincroniza los datos del servicio con los del componente actual:
  sincronizacion() {

    this.service.leerOrdenesClientesRut(this.rut_cliente).subscribe((ordenesList) => {
      
      this.ordenesPorCliente = ordenesList;

      // Recorre el total de la lista de ordenes:
      for (let i = 0; i < this.ordenesPorCliente.length; i++) {

        // Inserta los datos indicados en la variable data:
        this.data.push({
          indice         : i,
          objeto         : this.ordenesPorCliente[i],
          id_orden       : this.ordenesPorCliente[i]['id'],
          fecha_ejecucion: this.ordenesPorCliente[i]['fechaejecucion'],
          encargado      : this.ordenesPorCliente[i]['encargado']['nombre'],
          estado_ticket  : this.ordenesPorCliente[i]['estadoticket']['descripcion'],
        });
      };

      // Carga los datos insertados en una estructura del componente html:
      this.source.load(this.data);
    });
  };
  

  // Método encargado de enviar los datos del evento al servicio y abre el componente indicado:
  ordenCompleta(event) {

    // Envía el rur obtenido del evento al servicio indicado:
    this.tableService.setRut_cliente(event['data']['objeto']['client_order']['rut']);

    // Envía el id obtenido del evento, al servicio indicado:
    this.tableService.setIdListaOrden(event['data']['indice']);

    // Envía la orden obtenida del evento, al servicio indicado:
    this.tableService.setOrden(event['data']['objeto']);

    // Abre el componente indicado:
    this.mostrar.open(MostrarOrdenComponent);
  };
};
