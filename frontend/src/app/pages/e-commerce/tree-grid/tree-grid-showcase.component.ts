import { Component, Input } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { peticionesGetService } from '../../../services/peticionesGet.service';
import { MostrarClienteComponent } from '../tree-grid-week/mostrar-cliente/mostrar-cliente.component';
import { NgForm } from "@angular/forms";
import { LocalDataSource } from 'ng2-smart-table';
import { tableService } from '../../../services/table.service';


@Component({
  selector: 'nb-tree-grid-showcase',
  templateUrl: './tree-grid-showcase.component.html',
  styleUrls: ['./tree-grid-showcase.component.scss'],
})


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
      rut: {
        title: 'Rut',
        type: 'string',
      },
      nombre: {
        title: 'Nombre',
        type: 'string',
      },
      telefono: {
        title: 'Teléfono',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  rut_cliente: any;
  lista: any;
  data: any[] = [];
  aparece: boolean = false;

  clientes: any;

  constructor(private mostrar: NbDialogService,
    private service: peticionesGetService,
    private tableService: tableService) {

  }




  guardar(formulario: NgForm) {

    this.rut_cliente = formulario.value['buscar']

    this.sincronizacion();
    this.aparece = true;
  }

  sincronizacion() {

    this.service.leerClientes(this.rut_cliente).subscribe((clientesList) => {

      this.clientes = clientesList;

      this.data.push({
        rut: this.clientes['rut'],
        nombre: this.clientes['nombre'],
        telefono: this.clientes['contacto1'],
      });      

      // Carga los datos insertados en una estructura del componente html:
      this.source.load(this.data);

    })
  }


  datosCliente() {

    this.tableService.setRut_cliente(this.rut_cliente);

    this.mostrar.open(MostrarClienteComponent);

  }


}

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
export class FsIconComponent {
  @Input() tipo: string;
  @Input() expanded: boolean;

  isDir(): boolean {
    return true;
  }
}