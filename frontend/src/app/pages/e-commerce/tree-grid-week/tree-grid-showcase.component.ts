
// Angular/core:
import { Component, 
         Input, 
         Inject, 
         TemplateRef, 
         ViewChild } from '@angular/core';

// Angular/common:
import { DatePipe } from '@angular/common';

// Nebular/theme:
import { NbSortDirection, 
         NbSortRequest, 
         NbTreeGridDataSource, 
         NbTreeGridDataSourceBuilder,
         NbDialogService,
         NB_WINDOW, 
         NbMenuService,
         NbWindowService } from '@nebular/theme';

// Componentes:
import { ShowcaseDialogComponent } from './showcase-dialog/showcase-dialog.component';
import { OrdenesDiarias }          from '../../../models/ordenesDiarias';

// Servicios:
import { peticionesGetService } from '../../../services/peticionesGet.service';
import { componentSyncService } from '../../../services/componentSync.service';
import { tableService }         from '../../../services/table.service';


// Interfaces:
interface TreeNode<T> {
  data     : T;
  children?: TreeNode<T>[];
  expanded?: boolean;
};

interface FSEntry {
  Lunes    : string;
  Martes   : string;
  Miercoles: string;
  Jueves?  : string;
  Viernes  : string;
  Sabado   : string;
};


// Componente decorador:
@Component({
  selector   : 'nb-tree-grid-showcase-week',
  templateUrl: './tree-grid-showcase.component.html',
  styleUrls  : ['./tree-grid-showcase.component.scss'],
})


// Clase TreeGridWeekShowcaseComponent:
export class TreeGridWeekShowcaseComponent {

  // Variables:
  public data             : TreeNode<FSEntry>[]   = [];
  public todayFormated    : string                = null;
  defaultColumns          = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
  allColumns              = [...this.defaultColumns];
  ordenesDiarias          : Array<OrdenesDiarias> = new Array<OrdenesDiarias>();
  ordenesDiariasPorTecnico: Array<OrdenesDiarias> = new Array<OrdenesDiarias>();
  ordenesPorFecha         : Array<OrdenesDiarias> = new Array<OrdenesDiarias>();
  sortDirection           : NbSortDirection       = NbSortDirection.NONE;
  ordFechas               : any                   = [];
  dataSource              : NbTreeGridDataSource<FSEntry>;
  tecnicos                : any;
  indice                  : any;
  encargado               : any;
  nuevaFechaFormat        : any;
  ordenesPorTecnico       : any;
  sortColumn              : string;
  newDate                 : any;
  diaFecha                : Date;


  // Propiedad decorada:
  @ViewChild('escClose', { read: TemplateRef }) escCloseTemplate: TemplateRef<HTMLElement>;
  @ViewChild('contentTemplate') contentTemplate: TemplateRef<any>;


  // Constructor:
  constructor(private peticionesGet    : peticionesGetService,
              private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,
              private nbMenuService    : NbMenuService,
              private windowService    : NbWindowService,
              private syncService      : componentSyncService,
              private datePipe         : DatePipe,
              private dialogService    : NbDialogService,
              private tableService     : tableService,
              @Inject(NB_WINDOW) private window,) {

  }


  ngOnInit() {
    this.sincronizar();
  }

  sincronizar() {
    this.syncService.currentMessage.subscribe((message) => {
      this.todayFormated = this.datePipe.transform(message, 'w');
      this.newDate       = this.firstDayOfWeek(2020, Number(this.todayFormated));
      this.updateTreeGrid(this.newDate);
    })
  }

  firstDayOfWeek(year, week) {
    var d = new Date(year, 0, 1),
        offset = d.getTimezoneOffset();
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    d.setTime(d.getTime() + 7 * 24 * 60 * 60 * 1000 * (week + (year == d.getFullYear() ? -1 : 0)));
    d.setTime(d.getTime() + (d.getTimezoneOffset() - offset) * 60 * 1000);
    d.setDate(d.getDate() - 3);
    return d;
  }

  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn     = sortRequest.column;
    this.sortDirection  = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  open(index: any, data: any) {
    this.encargado = data;
    this.indice    = index;
    this.sendIndex(this.indice);
    this.sendEncargado(this.encargado);
    this.dialogService.open(ShowcaseDialogComponent);
  }

  getShowOn(index: number) {
    const minWithForMultipleColumns = 0;
    const nextColumnStep = 130;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }

  sendOrdenesPorFecha(datos) {
    this.tableService.setOrdenesPorFecha(datos);
  }

  sendNuevaFecha(datos) {
    this.tableService.setNuevaFecha(datos);
  }

  sendOrdenesDiariasPorTecnico(datos) {
    this.tableService.setOrdenesDiariasPorTecnico(datos);
  }

  sendIndex(datos) {
    this.tableService.setIndex(datos);
  }

  sendEncargado(datos) {
    this.tableService.setEncargado(datos);
  }

  updateTreeGrid(first_date: Date) {
    this.data = [];

    /*
        this.nbMenuService.onItemClick()
          .pipe(
            filter(({ tag }) => tag === 'context-menu'),
            map(({ item: { title } }) => title),
          )
          .subscribe(title => this.openWindowForm() );
    */

    this.peticionesGet.leerTecnicos().subscribe((TecnicosList) => {this.tecnicos = TecnicosList;})

    let last_date: Date      = first_date;
    let first_date_formatted = this.datePipe.transform(first_date, 'yyyy-MM-dd');
    let date_init: String    = String(first_date_formatted);
    last_date.setDate(last_date.getDate() + 5);
    let last_date_formatted  = this.datePipe.transform(last_date, 'yyyy-MM-dd');
    let date_end: String     = String(last_date_formatted);
    this.diaFecha            = new Date(String(date_init));
    this.sendNuevaFecha(date_init);

    console.log("init: " + date_init);
    console.log("end: "  + date_end);

    let test = [];

    this.peticionesGet.leerOrdenesDiarias(date_init, date_end).subscribe((ordenesDiariasdesdeApi) => {

      this.ordenesDiarias = ordenesDiariasdesdeApi;

      for (let i = 0; i < 6; i++) {
        this.diaFecha         = new Date(this.diaFecha.setDate(this.diaFecha.getDate() + 1));
        this.nuevaFechaFormat = this.datePipe.transform(this.diaFecha, 'yyyy-MM-dd');
        this.ordenesPorFecha  = (this.ordenesDiarias.filter(x =>
          this.datePipe.transform(x.fechaejecucion, 'yyyy-MM-dd') == this.nuevaFechaFormat));
      }

      this.ordFechas.push(this.ordenesPorFecha);
      this.sendOrdenesPorFecha(this.ordFechas);

      let counter: number[] = [0, 0, 0, 0, 0, 0];
      let tec_counter       = 0;

      for (let tecnico of this.tecnicos) {

        this.ordenesPorTecnico = (this.ordenesDiarias.filter(x => 
          x.encargado.nombre   == tecnico.nombre));

        let aux_date: Date = new Date(String(date_init));

        for (let i = -1; i < 5; i++) {
          let row_date    = this.datePipe.transform(aux_date, 'yyyy-MM-dd');
          let aux_counter = (this.ordenesPorTecnico.filter(x =>
            this.datePipe.transform(x.fechaejecucion, 'yyyy-MM-dd') == row_date));
          this.ordenesDiariasPorTecnico = aux_counter;
          aux_date.setDate(aux_date.getDate() + 1);
          counter[i] = aux_counter.length;
          test.push(this.ordenesDiariasPorTecnico);
        }

        this.data.push({
          data: {
            Lunes    : tecnico.nombre + " (" + counter[0] + ")",
            Martes   : tecnico.nombre + " (" + counter[1] + ")",
            Miercoles: tecnico.nombre + " (" + counter[2] + ")",
            Jueves   : tecnico.nombre + " (" + counter[3] + ")",
            Viernes  : tecnico.nombre + " (" + counter[4] + ")",
            Sabado   : tecnico.nombre + " (" + counter[5] + ")"
          }
        });

        tec_counter = tec_counter + 1;
      }

      this.sendOrdenesDiariasPorTecnico(test);
      this.dataSource = this.dataSourceBuilder.create(this.data);
    })
  }

  // openWindow(id: string) {
  //   this.windowService.open(
  //     this.contentTemplate,
  //     { title: 'Orden seleccionada: ' + id, context: { text: 'Campos de la orden' } }
  //   );
  // }

  // openWindowForm() {
  //   this.windowService.open(WindowFormComponent2, { title: `Orden` }
  //   );
  // }
}


// Componente decorador:
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

// Clase FsIconComponent;
export class FsIconComponent {
  @Input() Miercoles: string;
  @Input() expanded : boolean;

  isDir(): boolean {
    return true;
  }
}