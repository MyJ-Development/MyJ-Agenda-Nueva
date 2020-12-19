
// Angular/ core:
import { Component, Input } from '@angular/core';

// Angular/forms:
import { NgForm } from "@angular/forms";

// Nebular/theme:
import { NbDialogService } from '@nebular/theme';

// Ng2-smart-table:
import { LocalDataSource } from 'ng2-smart-table';

// Servicios:
import { peticionesGetService } from '../../../services/peticionesGet.service';
import { tableService } from '../../../services/table.service';

// Componentes:
import { MostrarClienteComponent } from '../tree-grid-week/mostrar-cliente/mostrar-cliente.component';


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
      rut: {
        title: 'Rut',
        type : 'string',
      },
      nombre: {
        title: 'Nombre',
        type : 'string',
      },
      telefono: {
        title: 'Teléfono',
        type : 'string',
      },
    },
  };


  // Variables:
  source     : LocalDataSource = new LocalDataSource();
  aparece    : boolean         = false;
  data       : any[]           = [];
  rut_cliente: any;
  lista      : any;
  clientes   : any;


  // Constructor:
  constructor(private mostrar     : NbDialogService,
              private service     : peticionesGetService,
              private tableService: tableService) {

  }



  // Método encargado de obtener datos del formulario html:
  guardar(formulario: NgForm) {

    // Iguala el dato obtenido del formulario con variable local:
    this.rut_cliente = formulario.value['buscar']

    // Ejecuta el método seleccionado:
    this.sincronizacion();

    // Cambia el estado de la tabla para mostrar la información:
    this.aparece = true;
  }


  // Método que sincroniza los datos del servicio con los del componente actual:
  sincronizacion() {

    /* Obtiene la lista de clientes desde el servicio 
    y los almacena en variable (clientes): */
    this.service.leerClientes(this.rut_cliente).subscribe((clientesList) => {
      this.clientes = clientesList;

      // Inserta los datos del arreglo en la variable data:
      this.data.push({
        rut: this.clientes['rut'],
        nombre: this.clientes['nombre'],
        telefono: this.clientes['contacto1'],
      });

      // Carga los datos insertados en una estructura del componente html:
      this.source.load(this.data);

    })
  }


  // Método encargado de enviar el dato obtenido al servicio y abre el componente seleccionado:
  datosCliente() {

    // Envía el dato obtenido al servicio:
    this.tableService.setRut_cliente(this.rut_cliente);

    // Abre el componente seleccionado:
    this.mostrar.open(MostrarClienteComponent);
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
  @Input() tipo: string;
  @Input() expanded: boolean;

  isDir(): boolean {
    return true;
  }
}