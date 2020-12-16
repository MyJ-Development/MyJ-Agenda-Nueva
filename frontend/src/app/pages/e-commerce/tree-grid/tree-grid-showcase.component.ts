import { Component, Input } from '@angular/core';
import { NbDialogService, NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { MostrarClienteComponent } from '../tree-grid-week/mostrar-cliente/mostrar-cliente.component';


interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface Orden {

  tipo: string;
  prioridad: string;
  disponibilidad: string;
  comentario: string;
  fechaejecucion: string;
  estadocliente: string;
  estadoticket: string;
  mediodepago: string;
  monto: string;
  created_by: string;
  encargado: string;
  client_order: string;
  domicilio: string;

}

interface Cliente {
  contacto1: string;
  contacto2: string;
  created_at: string;
  created_by: string;
  email: string;
  nombre: string;
  rut: string;
  updated_at: string;
  updated_by: string;
}

interface FSEntry {
  nombre: string;
  estado: string;
  tipo: string;
  rut?: string;
  fecha: string;
  ubicacion: string;
}

@Component({
  selector: 'nb-tree-grid-showcase',
  templateUrl: './tree-grid-showcase.component.html',
  styleUrls: ['./tree-grid-showcase.component.scss'],
})


export class TreeGridShowcaseComponent {

  columnaNombre = 'nombre';
  columnaBoton = 'ver mas';
  defaultColumns = ['ubicacion', 'estado', 'tipo', 'rut', 'fecha'];
  allColumns = [this.columnaNombre, ...this.defaultColumns, this.columnaBoton];
  aparece: boolean = false;
  dataSource: NbTreeGridDataSource<FSEntry>;
  data: TreeNode<FSEntry>[];
  datitos: Orden;
  cliente: Cliente;


  nombre: string;
  ubicacion: string;
  estado: string;
  rut: string;
  tipo: string;
  fecha: string;


  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,
    private mostrar: NbDialogService,) {




    this.datitos = {
      tipo: "Instalación",
      prioridad: "Primera del dia",
      disponibilidad: "despues 10 am",
      comentario: "comentario 2",
      fechaejecucion: "2020-11-17",
      estadocliente: "No aplicable",
      estadoticket: "Pendiente",
      mediodepago: "Imported",
      monto: "0",
      created_by: "test@test.test",
      encargado: "987654321",
      client_order: "987654321",
      domicilio: "San Martin 345"
    }

    this.cliente = {
      contacto1: "995515509",
      contacto2: "995515509",
      created_at: "2020-12-11T21:38:24.301277",
      created_by: "test@test.test",
      email: "sc",
      nombre: "claudia cecilia cid navia",
      rut: "16656041-1",
      updated_at: "2020-12-11T21:38:24.301291",
      updated_by: "test@test.test"
    }

  }

  ngOnInit(): void {
    
    this.cargarData();

  }

  cargarData() {

    this.data = [
      {
        data: {
          nombre: this.cliente['nombre'],
          ubicacion: this.datitos['domicilio'],
          estado: this.datitos['estadoticket'],
          rut: this.cliente['rut'],
          tipo: this.datitos['tipo'],
          fecha: this.datitos['fechaejecucion']
        },
      },
    ];

    this.nombre = this.data[0].data.nombre;
    console.log('nombre');
    console.log(this.nombre);
    this.ubicacion = this.data[0]['data']['ubicacion'];
    this.estado = this.data[0]['data']['estado'];
    this.rut = this.data[0]['data']['rut'];
    this.tipo = this.data[0]['data']['tipo'];
    this.fecha = this.data[0]['data']['fecha'];


    console.log(this.data[0]['data']);

    this.dataSource = this.dataSourceBuilder.create(this.data);
  }

  datosCliente() {
    this.mostrar.open(MostrarClienteComponent);

  }

  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }



  getShowOn(index: number) {
    const minWithForMultipleColumns = 0;
    const nextColumnStep = 200;
    return minWithForMultipleColumns + (nextColumnStep * index);
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