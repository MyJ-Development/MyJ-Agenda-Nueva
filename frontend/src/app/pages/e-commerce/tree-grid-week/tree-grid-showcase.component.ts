import { Component, Input, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';
import { ShowcaseDialogComponent } from './showcase-dialog/showcase-dialog.component';

import { NB_WINDOW, NbMenuService } from '@nebular/theme';
import { NbWindowService } from '@nebular/theme';
import { WindowFormComponent2 } from './tree-grid-week-forms/tree-grid-week-forms-windowsformcomponent2';
import { peticionesGetService } from '../../../services/peticionesGet.service';
import { OrdenesDiarias } from '../../../models/ordenesDiarias';
import { TipoOrdenes } from '../../../models/tipoOrdenes';
import { componentSyncService } from '../../../services/componentSync.service';
import { DatePipe } from '@angular/common';
import { tableService } from '../../../services/table.service';

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

  items: OrdenesDiarias[];


  //customColumn = 'Lunes';
  defaultColumns = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
  allColumns = [...this.defaultColumns];
  ordenesDiarias: Array<OrdenesDiarias> = new Array<OrdenesDiarias>();
  tecnicos: any;
  message: any;
  indice: any;
  encargado: any;
  nuevaFecha: any;
  nuevaFechaFormat: any;
  ordDiarias: any;
  ordenesPorFecha: Array<OrdenesDiarias> = new Array<OrdenesDiarias>();
  ordenesDiariasPorTecnico: Array<OrdenesDiarias> = new Array<OrdenesDiarias>();
  ordenesPorTecnico: any;
  tipoOrdenes: Array<TipoOrdenes> = new Array<TipoOrdenes>();
  dataSource: NbTreeGridDataSource<FSEntry>;
  public cont: number = 0;
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
    @Inject(NB_WINDOW) private window,
    private dialogService: NbDialogService,
    private tableService: tableService) {

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

  open(index: any, data: any) {

    this.encargado = data;
    this.indice = index;

    this.sendIndex(this.indice);
    this.sendEncargado(this.encargado);

    this.dialogService.open(ShowcaseDialogComponent)

  };


  public data: TreeNode<FSEntry>[] = [];

  getShowOn(index: number) {
    const minWithForMultipleColumns = 0;
    const nextColumnStep = 130;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }

  ngOnInit() {
    //this.syncService.currentMessage.subscribe(message => this.message = message)
    this.syncService.currentMessage.subscribe((message) => {
      this.todayFormated = this.datePipe.transform(message, 'w');
      let newDate = this.firstDayOfWeek(2020, Number(this.todayFormated))
      this.updateTreeGrid(newDate)
      this.nuevaFecha = newDate;
    })

  }

  sendOrdenesPorFecha(datos){
    this.tableService.setOrdenesPorFecha(datos);
  }

  sendNuevaFecha(datos){
    this.tableService.setNuevaFecha(datos);
  }

  sendOrdenesDiarias(datos) {
    this.tableService.setOrdenesDiarias(datos);
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
    this.peticionesGet.leerTecnicos().subscribe((TecnicosList) => {
      this.tecnicos = TecnicosList;

    })

    let last_date: Date = first_date
    let first_date_formatted = this.datePipe.transform(first_date, 'yyyy-MM-dd');
    let date_init: String = String(first_date_formatted)
    last_date.setDate(last_date.getDate() + 5)
    let last_date_formatted = this.datePipe.transform(last_date, 'yyyy-MM-dd');
    let date_end: String = String(last_date_formatted)
    console.log("init: " + date_init)
    console.log("end: " + date_end)
    let test = [];
    let ordFechas = [];

    this.peticionesGet.leerOrdenesDiarias(date_init, date_end).subscribe((ordenesDiariasdesdeApi) => {

      this.ordenesDiarias = ordenesDiariasdesdeApi;

      for (let i = 0; i < 6; i++) {

        this.nuevaFecha[i] = this.nuevaFecha.setDate(this.nuevaFecha.getDate() - 1)
        this.nuevaFechaFormat = this.datePipe.transform(this.nuevaFecha, 'yyyy-MM-dd');

        this.ordenesPorFecha = (this.ordenesDiarias.filter(x => this.datePipe.transform(x.fechaejecucion, 'yyyy-MM-dd') == this.nuevaFechaFormat))

        console.log('fecha');
        console.log(this.nuevaFechaFormat);

        console.log('ordenes');
        console.log(this.ordenesPorFecha);
        console.log(this.ordenesPorFecha.length);
        ordFechas.push(this.ordenesPorFecha);

      }


      this.sendNuevaFecha(this.nuevaFechaFormat);

      let counter = [0, 0, 0, 0, 0, 0];
      let tec_counter = 0;

      for (let tecnico of this.tecnicos) {

        this.ordenesPorTecnico = (this.ordenesDiarias.filter(x => x.encargado.nombre == tecnico.nombre))

        console.log('o-tecnico');
        console.log(tecnico.nombre);
        console.log(this.ordenesPorTecnico);

        let aux_date: Date = new Date(String(date_init))

        for (let i = 0; i < 6; i++) {

          let row_date = this.datePipe.transform(aux_date, 'yyyy-MM-dd');
          let aux_counter = (this.ordenesPorTecnico.filter(x => this.datePipe.transform(x.fechaejecucion, 'yyyy-MM-dd') == row_date))

          this.ordenesDiariasPorTecnico = aux_counter;
          aux_date.setDate(aux_date.getDate() + 1)
          counter[i] = aux_counter.length
          test.push(this.ordenesDiariasPorTecnico)

        }

        this.data.push({
          data: { Lunes: tecnico.nombre + " (" + counter[0] + ")", Martes: tecnico.nombre + " (" + counter[1] + ")", Miercoles: tecnico.nombre + " (" + counter[2] + ")", Jueves: tecnico.nombre + " (" + counter[3] + ")", Viernes: tecnico.nombre + " (" + counter[4] + ")", Sabado: tecnico.nombre + " (" + counter[5] + ")" },
        })

        tec_counter = tec_counter + 1

        this.sendOrdenesDiarias(this.ordenesDiarias);


      }

      this.dataSource = this.dataSourceBuilder.create(this.data);

      this.sendOrdenesPorFecha(ordFechas);
      console.log('ordDiaria');
      console.log(ordFechas);

    })

    console.log("TEST")
    console.log(test)
    this.sendOrdenesDiariasPorTecnico(test);


  }
  

  openWindow(id: string) {
    this.windowService.open(
      this.contentTemplate,
      { title: 'Orden seleccionada: ' + id, context: { text: 'Campos de la orden' } }
    );
  }

  openWindowForm() {
    this.windowService.open(WindowFormComponent2, { title: `Orden` }
    );
  }

  firstDayOfWeek(year, week) {
    var d = new Date(year, 0, 1),
      offset = d.getTimezoneOffset();
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    d.setTime(d.getTime() + 7 * 24 * 60 * 60 * 1000
      * (week + (year == d.getFullYear() ? -1 : 0)));
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