
// Angular/ core:
import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

// Angular/forms:
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Nebular/theme:
import { NbDateService, NbDialogService } from '@nebular/theme';

// Ng2-smart-table:
import { LocalDataSource } from 'ng2-smart-table';
import { Observable } from 'rxjs';

// Servicios:
import { peticionesGetService } from '../../../services/peticionesGet.service';
import { tableService }         from '../../../services/table.service';

// Componentes:
import { OrdenCompletaComponent } from '../tree-grid-week/orden-completa/orden-completa.component';


// Componente decorado:
@Component({
  selector   : 'nb-tree-grid-showcase',
  templateUrl: './tree-grid-showcase.component.html',
  styleUrls  : ['./tree-grid-showcase.component.scss'],
})


// Clase exportable TreeGridShowcaseComponent:
export class TreeGridShowcaseComponent {

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
        },
      ]
    },

    // Define las columnas que queremos mostrar en la tabla (Título/tipo de dato):
    columns: {
      id_orden: {
        title: 'Id orden',
        type : 'string',
      },
      nombre: {
        title: 'Nombre',
        type : 'string',
      },
      fecha: {
        title: 'Fecha',
        type : 'string',
      },
      direccion: {
        title: 'Dirección',
        type : 'string',
      },
      tipo: {
        title: 'Tipo orden',
        type : 'string',
      },
    },
  };


  // Variables:
  formulario : FormGroup;
  source     : LocalDataSource = new LocalDataSource();
  aparece    : boolean         = false;
  ver    : boolean         = false;
  data       : any[];
  buscar     : any;
  rut_cliente: any;
  lista      : any;
  servicio   : Observable<any[]>;
  clientes   : any[];
  date_init  : any;
  date_end   : any;
  opciones   : any[];
  opcion_rut_cliente: string = 'Rut cliente';
  opcion_nombre_encargado: string = 'Nombre técnico';
  opcion_id_orden: string = 'Id orden';
  opcion_domicilio: string = 'Domicilio';

  // Constructor:
  constructor(private mostrar     : NbDialogService,
              private service     : peticionesGetService,
              private tableService: tableService,
              private datePipe    : DatePipe,
              private fb          : FormBuilder) {

    this.crearFormulario();

    this.opciones = [
      this.opcion_rut_cliente,
      this.opcion_nombre_encargado,
      this.opcion_id_orden,
      this.opcion_domicilio
    ]

    this.formulario.valueChanges.subscribe(x => {
      
      if ((x.buscar === "Nombre técnico") || (x.buscar === "Domicilio")) {
        
        this.ver = true;
        
      } else {

        this.ver = false;
      }
    })

  }


  // Método encargado de obtener datos del formulario html:
  buscarOrden() {

    this.data = [];

    if (this.formulario.value['buscar'] === 'Rut cliente') {

      // Iguala el dato obtenido del formulario con variable local:
      this.buscar = this.formulario.value['buscador'];    

      this.servicio = this.service.leerOrdenesClientesRut(this.buscar);
  

      // Ejecuta el método seleccionado:
      this.sincronizacionOrdenesClientes();

      // Cambia el estado de la tabla para mostrar la información:
      this.aparece = true;

    } else if (this.formulario.value['buscar'] === 'Id orden') {

      // Iguala el dato obtenido del formulario con variable local:
      this.buscar = this.formulario.value['buscador'];    

      this.servicio = this.service.leerOrdenesClientesId(this.buscar);
  

      // Ejecuta el método seleccionado:
      this.sincronizacionOrdenesClientes();

      // Cambia el estado de la tabla para mostrar la información:
      this.aparece = true;

    } else if ((this.formulario.value['buscar'] === 'Nombre técnico') 
    && (this.formulario.value['calendar'])) {

      // Iguala el dato obtenido del formulario con variable local:
      this.buscar = this.formulario.value['buscador'];    

      this.date_init = this.datePipe.transform(this.formulario.value['calendar']['start'], 'yyyy-MM-dd');

      this.date_end = this.datePipe.transform(this.formulario.value['calendar']['end'], 'yyyy-MM-dd');

      this.servicio = this.service.leerOrdenesClientesTecnico(this.buscar, this.date_init, this.date_end);
  

      // Ejecuta el método seleccionado:
      this.sincronizacionOrdenesClientes();

      // Cambia el estado de la tabla para mostrar la información:
      this.aparece = true;

    } else if ((this.formulario.value['buscar'] === 'Domicilio') 
   ) {

      // Iguala el dato obtenido del formulario con variable local:
      this.buscar = this.formulario.value['buscador'];    

      this.date_init = this.datePipe.transform(this.formulario.value['calendar']['start'], 'yyyy-MM-dd');

      this.date_end = this.datePipe.transform(this.formulario.value['calendar']['end'], 'yyyy-MM-dd');

      this.servicio = this.service.leerOrdenesClientesDomicilio(this.buscar, this.date_init, this.date_end);
  

      // Ejecuta el método seleccionado:
      this.sincronizacionOrdenesClientes();

      // Cambia el estado de la tabla para mostrar la información:
      this.aparece = true;

    }

  }


  // Método que sincroniza los datos del servicio con los del componente actual:
  sincronizacionOrdenesClientes() {

    /* Obtiene la lista de clientes desde el servicio 
    y los almacena en variable (clientes): */
    this.servicio.subscribe((clientesList) => {
      
      this.clientes = clientesList;

      for (let i = 0; i < this.clientes.length; i++) {

        let nombreCli: string = this.clientes[i]['client_order']['nombre'];
        let direccionCli: string = this.clientes[i]['client_residence']['direccion'];
        this.rut_cliente = this.clientes[i]['client_order']['rut'];

        // Inserta los datos del arreglo en la variable data:
        this.data.push({

          // Se inserta un indice para obtener la posicion del click en la tabla de datos:
          indice  : i,

          // Se inserta el objeto para extraer ciertos datos a través del evento:
          objeto: this.clientes[i],

          id_orden: this.clientes[i]['id'],

          // Capitaliza la primera letra de cada palabra:
          nombre  : nombreCli.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
          fecha   : this.clientes[i]['fechaejecucion'],
          direccion   : direccionCli.replace('&ntilde', 'ñ').replace('&aacute', 'á'),
          tipo    : this.clientes[i]['tipo']['descripcion'],
        });
        
      }

      // Carga los datos insertados en una estructura del componente html:
      this.source.load(this.data);

    })
  }


  // Método encargado de enviar los datos del evento al servicio y abre el componente indicado:
  ordenCompleta(event) {

    // Envía el rut del cliente seleccionado, al servicio indicado:
    this.tableService.setRut_cliente(event['data']['objeto']['client_order']['rut']);

    // Envía los datos obtenidos del evento al servicio:
    this.tableService.setIdOrden(event['data']['objeto']['id']);

    // Abre el componente indicado:
    this.mostrar.open(OrdenCompletaComponent);
  }

  
  // Método encargado de crear el formulario que extrae los datos del componente html:
  crearFormulario(){

    this.formulario = this.fb.group({

      buscar: ['', Validators.required],
      buscador: ['', Validators.required],
      calendar: ['', Validators.required],
    })
  }

}


// Componente decorado:
@Component({
  selector: 'nb-fs-icon',
  template: `
    <nb-tree-grid-row-toggle [expanded]="expanded" *ngIf="isDir(); else fileIcon">
    </nb-tree-grid-row-toggle>
    <ng-template #fileIcon>
      <nb-icon icon="file-text-outline"></nb-icon>
    </ng-template>
  `,
})


// Clase exportable FsIconComponent:
export class FsIconComponent {
  @Input() tipo    : string;
  @Input() expanded: boolean;

  isDir(): boolean {
    return true;
  }
}