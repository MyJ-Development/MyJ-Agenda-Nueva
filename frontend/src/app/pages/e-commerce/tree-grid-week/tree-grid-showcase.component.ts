import { Component, Input,Inject, OnInit,TemplateRef, ViewChild } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder} from '@nebular/theme';
import { NB_WINDOW, NbMenuService } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';
import { NbWindowService } from '@nebular/theme';
import { WindowFormComponent } from '../../modal-overlays/window/window-form/window-form.component';
import { WindowFormComponent2 } from './tree-grid-week-forms/tree-grid-week-forms-windowsformcomponent2';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  Lunes: string;
  Martes: string;
  Miercoles: string;
  Jueves?: string;
  Viernes: string;
  Sabado: string;
}

@Component({
  selector: 'nb-tree-grid-showcase-week',
  templateUrl: './tree-grid-showcase.component.html',
  styleUrls: ['./tree-grid-showcase.component.scss'],
})
export class TreeGridWeekShowcaseComponent {
  items = [{ title: '1234 ,Instalacion, 12345678-9' },
  { title: '1235 ,Instalacion, 12345678-9' },
  { title: '1236 ,Instalacion, 12345678-9' }];

  customColumn = 'Lunes';
  defaultColumns = [ 'Martes', 'Miercoles', 'Jueves' , 'Viernes','Sabado'];
  allColumns = [ this.customColumn, ...this.defaultColumns ];

  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  @ViewChild('escClose', { read: TemplateRef }) escCloseTemplate: TemplateRef<HTMLElement>;
  @ViewChild('contentTemplate') contentTemplate: TemplateRef<any>;

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,
    private nbMenuService: NbMenuService,
    private windowService: NbWindowService,
    @Inject(NB_WINDOW) private window) {
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
      data: { Lunes: 'Jose (3)', Martes: 'Jose (2)', Jueves: 'Jose (1)', Miercoles: 'Jose (3)' , Viernes: 'Jose (4)', Sabado:'Jose (5)' },
    },
    { 
      data: { Lunes: 'Pepito (5)', Martes: 'Pepito (2)', Jueves: 'Pepito (0)', Miercoles: 'Pepito (7)' , Viernes: 'Pepito (2)', Sabado:'Pepito (1)' },
    },
    { 
      data: { Lunes: 'Jorge (3)', Martes: 'Jorge (4)', Jueves: 'Jorge (1)', Miercoles: 'Jorge (3)' , Viernes: 'Jorge (5)', Sabado:'Jorge (3)' },
    },
    { 
      data: { Lunes: 'Felipe (3)', Martes: 'Felipe (1)', Jueves: 'Felipe (1)', Miercoles: 'Felipe (1)' , Viernes: 'Felipe (4)', Sabado:'Felipe (1)' },
    }
  ];

  getShowOn(index: number) {
    const minWithForMultipleColumns = 0;
    const nextColumnStep = 130;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }
  ngOnInit() {
    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'context-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => this.openWindowForm() );
  }
  openWindow(id: string) {
    this.windowService.open(
      this.contentTemplate,
      { title: 'Orden seleccionada: '+id , context: { text: 'Campos de la orden' } },
    );
  }

   openWindowForm() {
    this.windowService.open(WindowFormComponent2, { title: `Orden`},
    );
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
  @Input() Miercoles: string;
  @Input() expanded: boolean;

  isDir(): boolean {
    return true;
  }
}