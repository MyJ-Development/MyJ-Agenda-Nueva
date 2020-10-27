import { Component, Input,Inject, OnInit,TemplateRef, ViewChild } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder} from '@nebular/theme';
import { NB_WINDOW, NbMenuService } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';
import { NbWindowService } from '@nebular/theme';
import { WindowFormComponent } from '../../modal-overlays/window/window-form/window-form.component';
import { WindowFormComponent2 } from './tree-grid-week-forms/tree-grid-week-forms-windowsformcomponent2';
import { peticionesGetService } from '../../../services/peticionesGet.service';
import { OrdenesDiarias } from '../../../models/ordenesDiarias';
import { TipoOrdenes } from '../../../models/tipoOrdenes';
import { componentSyncService } from '../../../services/componentSync.service';
import { DatePipe } from '@angular/common';

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
  ordenesDiarias: Array<OrdenesDiarias> = new Array<OrdenesDiarias>();
  tecnicos : any;
  message:any;
  tipoOrdenes: Array<TipoOrdenes> = new Array<TipoOrdenes>();
  dataSource: NbTreeGridDataSource<FSEntry>;
  public cont:number= 0; 
  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;
  public todayFormated: string = null
  @ViewChild('escClose', { read: TemplateRef }) escCloseTemplate: TemplateRef<HTMLElement>;
  @ViewChild('contentTemplate') contentTemplate: TemplateRef<any>;

  constructor(private peticionesGet: peticionesGetService,
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,
    private nbMenuService: NbMenuService,
    private windowService: NbWindowService,
    private syncService: componentSyncService,
    private datePipe: DatePipe,
    @Inject(NB_WINDOW) private window) {
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

  
  public data: TreeNode<FSEntry>[] = [];


  getShowOn(index: number) {
    const minWithForMultipleColumns = 0;
    const nextColumnStep = 130;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }
  ngOnInit() {
    this.updateTreeGrid()
  }

  updateTreeGrid(){
    this.syncService.currentMessage.subscribe(message => this.message = message)
    this.todayFormated = this.datePipe.transform(this.message, 'w');
    console.log(this.todayFormated)
    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'context-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => this.openWindowForm() );

    this.peticionesGet.leerTecnicos().subscribe((TecnicosList) => {
      this.tecnicos = TecnicosList;  
    })

    this.peticionesGet.leerOrdenesDiarias("2020-02-10","2020-09-20").subscribe((ordenesDiariasdesdeApi) => {
      this.ordenesDiarias = ordenesDiariasdesdeApi;  

      for(let tecnico of this.tecnicos)
      {
        let OrdenesPorTecnico=(this.ordenesDiarias.filter(x=>x.encargado.nombre == tecnico.nombre))
        console.log(tecnico.nombre);

        this.data.push({
          data: { Lunes: tecnico.nombre +" ("+OrdenesPorTecnico.length+")", Martes: tecnico.nombre+" (1)", Jueves: tecnico.nombre+" (1)", Miercoles: tecnico.nombre +" (1)", Viernes: tecnico.nombre+" (1)", Sabado: tecnico.nombre+" (1)" },
        })
      }
      this.dataSource = this.dataSourceBuilder.create(this.data);
    })
  }

  openWindow(id: string) {
    this.windowService.open(
      this.contentTemplate,
      { title: 'Orden seleccionada: '+id , context: { text: 'Campos de la orden' } },
    );
  }

   openWindowForm() {
    //console.log("Tree grid: "+this.message)
    this.updateTreeGrid()
    console.log(this.firstDayOfWeek(2020, Number(this.todayFormated))); //12-21-2015 to 12-27-2015
    this.windowService.open(WindowFormComponent2, { title: `Orden`},
    );
  }

  firstDayOfWeek (year, week) {
    var d = new Date(year, 0, 1),
        offset = d.getTimezoneOffset();
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    d.setTime(d.getTime() + 7 * 24 * 60 * 60 * 1000 
        * (week + (year == d.getFullYear() ? -1 : 0 )));
    d.setTime(d.getTime() 
        + (d.getTimezoneOffset() - offset) * 60 * 1000);
    d.setDate(d.getDate() - 3);
    return d;
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