import { Component, Input } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
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
  customColumn = 'nombre';
  defaultColumns = [ 'ubicacion','estado', 'tipo', 'rut' , 'fecha'];
  allColumns = [ this.customColumn, ...this.defaultColumns ];

  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>) {
    this.dataSource = this.dataSourceBuilder.create(this.data);
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

  private data: TreeNode<FSEntry>[] = [
    {
      data: { nombre: 'Jose', ubicacion:'-',estado: '3', rut: '-', tipo: '-' , fecha: '-' },
      children: [
        { data: { nombre: 'ID: 1234', tipo: 'Instalacion', ubicacion: 'Santa Luisa' ,estado: 'Terminada', rut: '12345678-9', fecha: '21-8-2020' } },
        { data: { nombre: 'ID: 1235', tipo: 'Instalacion', ubicacion: 'Lo Cruzat' ,estado: 'En proceso', rut: '98765432-4', fecha: '22-8-2020' } },
        { data: { nombre: 'ID: 1236', tipo: 'Reparacion', ubicacion: 'Lo Marcoleta' ,estado: 'Pendiente', rut: '14362456-2', fecha: '23-8-2020' } },
      ],
    },
    {
      data: { nombre: 'Jose', ubicacion:'-',estado: '3', rut: '-', tipo: '-' , fecha: '-' },
      children: [
        { data: { nombre: 'ID: 1237', tipo: 'Instalacion',ubicacion: 'Estadio Monumental' , estado: 'Terminada', rut: '12345678-9', fecha: '21-8-2020' } },
        { data: { nombre: 'ID: 1238', tipo: 'Instalacion',ubicacion: 'Verdi' , estado: 'En proceso', rut: '98765432-4', fecha: '22-8-2020' } },
        { data: { nombre: 'ID: 1239', tipo: 'Reparacion',ubicacion: 'Santa Laura' , estado: 'Pendiente', rut: '14362456-2', fecha: '23-8-2020' } },
      ],
    },
    {
      data: { nombre: 'Jose', ubicacion:'-',estado: '3', rut: '-', tipo: '-' , fecha: '-' },
      children: [
        { data: { nombre: 'ID: 1240', tipo: 'Instalacion',ubicacion: 'Manuel antonio matta' , estado: 'Terminada', rut: '12345678-9', fecha: '21-8-2020' } },
        { data: { nombre: 'ID: 1241', tipo: 'Instalacion',ubicacion: 'Vergara' , estado: 'En proceso', rut: '98765432-4', fecha: '22-8-2020' } },
        { data: { nombre: 'ID: 1242', tipo: 'Reparacion',ubicacion: 'Santa Luisa' , estado: 'Pendiente', rut: '14362456-2', fecha: '23-8-2020' } },
      ],
    }
  ];

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