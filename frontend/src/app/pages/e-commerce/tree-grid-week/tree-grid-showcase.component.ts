
// Angular/core:
import { Component, 
         Input,
         TemplateRef, 
         ViewChild } from '@angular/core';

// Angular/common:
import { DatePipe } from '@angular/common';

// Nebular/theme:
import { NbSortDirection, 
         NbSortRequest, 
         NbTreeGridDataSource, 
         NbTreeGridDataSourceBuilder,
         NbDialogService,} from '@nebular/theme';

// Componentes:
import { ShowcaseDialogComponent } from './showcase-dialog/showcase-dialog.component';
import { OrdenesDiarias }          from '../../../models/ordenesDiarias';

// Servicios:
import { peticionesGetService } from '../../../services/peticionesGet.service';
import { componentSyncService } from '../../../services/componentSync.service';
import { tableService }         from '../../../services/table.service';
import { Router } from '@angular/router';


// Interfaces:
interface TreeNode<T> {
  data     : T;
  children?: TreeNode<T>[];
  expanded?: boolean;
};

interface FSEntry {
  objeto?  : any;
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


// Clase exportable TreeGridWeekShowcaseComponent:
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
  year                    : any;
  result                  : any[] = [];
  pendiente               : any[] = [];
  loading                 : any = false;
  orden                   : any[];


  // Propiedad decorada:
  @ViewChild('escClose', { read: TemplateRef }) escCloseTemplate: TemplateRef<HTMLElement>;
  @ViewChild('contentTemplate') contentTemplate: TemplateRef<any>;


  // Constructor:
  constructor(private peticionesGet    : peticionesGetService,
              private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,
              private syncService      : componentSyncService,
              private datePipe         : DatePipe,
              private dialogService    : NbDialogService,
              private tableService     : tableService,
              private router           : Router) {

    // save current route first
    const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentRoute]); // navigate to same route
    }); 
  };


  // Método ngOnInit:
  ngOnInit() {

    // Llamada de métodos:
    this.sincronizar();
    this.forceUpdate();
    setInterval(()=> { this.forceUpdate() }, 60000 );
  };  


  // Sincroniza los datos del servicio con el primer día de la semana:
  sincronizar() {
    this.syncService.currentMessage.subscribe((message) => {
      this.todayFormated = this.datePipe.transform(message, 'w');
      let año            = new Date(message);
      this.year          = año.getFullYear();
      this.newDate       = this.firstDayOfWeek(this.year, Number(this.todayFormated));
    });
  };


  forceUpdate(){
    this.loading = true;
    this.newDate = this.firstDayOfWeek(this.year, Number(this.todayFormated));
    this.updateTreeGrid(this.newDate);
  };
  

  // Obtiene el primer día de la semana:
  firstDayOfWeek(year, week) {
    var d = new Date(year, 0, 1),
        offset = d.getTimezoneOffset();
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    d.setTime(d.getTime() + 7 * 24 * 60 * 60 * 1000 * (week + (year == d.getFullYear() ? -1 : 0)));
    d.setTime(d.getTime() + (d.getTimezoneOffset() - offset) * 60 * 1000);
    d.setDate(d.getDate() - 3);
    return d;
  };


  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn     = sortRequest.column;
    this.sortDirection  = sortRequest.direction;
  };


  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    };
    return NbSortDirection.NONE;
  };


  // Método que al ejecutarse, obtiene y envía datos al servicio:
  open(index: any, data: any) {

    this.encargado = data;
    this.indice    = index;
    this.sendIndex(this.indice);
    this.sendEncargado(this.encargado);
    this.dialogService.open(ShowcaseDialogComponent);
  };


  getShowOn(index: number) {
    const minWithForMultipleColumns  = 0;
    const nextColumnStep             = 130;
    return minWithForMultipleColumns + (nextColumnStep * index);
  };


  // Los métodos sendXXXX enlazan datos del componente actual, con los metodos del servicio:
  sendOrdenesPorFecha(datos) {
    this.tableService.setOrdenesPorFecha(datos);
  };

  sendNuevaFecha(datos) {
    this.tableService.setNuevaFecha(datos);
  };

  sendOrdenesDiariasPorTecnico(datos) {
    this.tableService.setOrdenesDiariasPorTecnico(datos);
  };

  sendIndex(datos) {
    this.tableService.setIndex(datos);
  };

  sendEncargado(datos) {
    this.tableService.setEncargado(datos);
  };


  // Método principal encargado de obtener y enlazar datos para mostrarlos en el componente html:
  updateTreeGrid(date_aux: Date) {
    
    // Inicia la variable con un objeto vacío.
    this.data = [];

    // Obtiene los datos de los técnicos del servicio y los guarda en una variable:
    this.peticionesGet.leerTecnicos().subscribe((TecnicosList) => {
      this.tecnicos = TecnicosList.filter((tecnico) => tecnico.active == true);
    });

    // Obtiene la fecha del primer día de semana, lo formatea y determina el último día de la semana:
    let first_date = date_aux;
    let last_date: Date      = first_date;
    let first_date_formatted = this.datePipe.transform(first_date, 'yyyy-MM-dd');
    let date_init: String    = String(first_date_formatted);
    last_date.setDate(last_date.getDate() + 5);
    let last_date_formatted  = this.datePipe.transform(last_date, 'yyyy-MM-dd');
    let date_end: String     = String(last_date_formatted);
    this.diaFecha            = new Date(String(date_init));
    this.sendNuevaFecha(date_init);

    // Imprime el inicio y término de semana:
    //console.log("init: " + date_init);
    //console.log("end: "  + date_end);

    // Inicia la variable con un objeto vacío:
    let test = [];

    // Obtiene los datos de las ordenes de la API y los enlaza en variable:
    this.peticionesGet.leerOrdenesDiarias(date_init, date_end).subscribe((ordenesDiariasdesdeApi) => {

      this.ordenesDiarias = ordenesDiariasdesdeApi;
      
      // Filtra las ordenes diarias por fecha:
      for (let i = 0; i < 6; i++) {
        this.diaFecha         = new Date(this.diaFecha.setDate(this.diaFecha.getDate() + 1));
        this.nuevaFechaFormat = this.datePipe.transform(this.diaFecha, 'yyyy-MM-dd');
        this.ordenesPorFecha  = (this.ordenesDiarias.filter(x =>
          this.datePipe.transform(x.fechaejecucion, 'yyyy-MM-dd') == this.nuevaFechaFormat));
      };

      // Inserta las ordenes filtradas en un arreglo:
      this.ordFechas.push(this.ordenesPorFecha);

      // Envía las ordenes filtradas al método que enlaza el servicio:
      this.sendOrdenesPorFecha(this.ordFechas);

      // Crea e inicia un contador de la semana en cero:
      let counter: number[] = [0, 0, 0, 0, 0, 0];
      let orden  : any[]    = ['', '', '', '', '', ''];
      this.orden            = ['', '', '', '', '', ''];
      let tec_counter       = 0;

      // Crea un bucle para cada técnico de la lista de técnicos:
      for (let tecnico of this.tecnicos) {

        if (tecnico.active) {
          
          // Filtra las ordenes diarias por el nombre de cada técnico:
          this.ordenesPorTecnico = (this.ordenesDiarias.filter(x => 
            x.encargado.nombre   == tecnico.nombre));

          let aux_date: Date = new Date(String(date_init));
          aux_date.setDate(aux_date.getDate() + 1);
          

          // Realiza un conteo de las ordenes filtradas por fecha de ejecución y la inserta en arreglo:
          for (let i = 0; i < 6; i++) {

            let row_date    = this.datePipe.transform(aux_date, 'yyyy-MM-dd');

            let aux_counter = (this.ordenesPorTecnico.filter(x =>
              this.datePipe.transform(x.fechaejecucion, 'yyyy-MM-dd') == row_date));

            this.ordenesDiariasPorTecnico = aux_counter;

            aux_date.setDate(aux_date.getDate() + 1);
            counter[i] = aux_counter.length;
            test.push(this.ordenesDiariasPorTecnico);
            
            let ins: any[] = [];
            let ordUnit: any[] = [];


            for (let ord of aux_counter) {
              // ins.push(ord.estadoticket.id);
              ordUnit.push(ord);
            };

            orden[i] = ins;
            this.orden[i] =  ordUnit;
          };

          let completado : any[] = [];
          let fechaPasada: any[] = [];

          for (let i = 0; i < 6; i++) {

            this.result = [];
            this.pendiente = [];

            for (let ord of this.orden[i]) {

              if (ord.estadoticket.id === 4) {

                this.result.push(ord.estadoticket.id)

              } else {

                let fechaCreacionParse = this.datePipe.transform(ord.created_at, 'yyyy-MM-dd');
                let fechaEjecucionParse = ord.fechaejecucion;
  
                let fechaCreacion  = new Date(fechaCreacionParse).getTime();
                let fechaEjecucion = new Date(fechaEjecucionParse).getTime();
  
                let dias = (fechaEjecucion - fechaCreacion) / (1000*60*60*24);


                if (dias > 3) {

                  this.pendiente.push(ord.id);
                };
              };
            };


            if ((this.result.length === this.orden[i].length) && (this.result.length !== 0)) {

              completado[i] = true;
              fechaPasada[i] = false;

            } else if ((this.result.length === 0) && (this.pendiente.length === 0)) {

              fechaPasada[i] = false;
              completado[i] = false; 

            } else if (this.pendiente.length != 0){

              fechaPasada[i] = true;
              completado[i] = null;

            } else {

              fechaPasada[i] = false;
              completado[i] = false;
            };
          };
          

          // Inserta en cada día de la semana, un técnico y el número de ordenes diarias:
          this.data.push({
            data: {
              objeto:{
                objeto   : {
                  objeto: {
                    Lunes    : fechaPasada[0],
                    Martes   : fechaPasada[1],
                    Miercoles: fechaPasada[2],
                    Jueves   : fechaPasada[3],
                    Viernes  : fechaPasada[4],
                    Sabado   : fechaPasada[5],
                  },
                  Lunes    : completado[0],
                  Martes   : completado[1],
                  Miercoles: completado[2],
                  Jueves   : completado[3],
                  Viernes  : completado[4],
                  Sabado   : completado[5],
                },
                Lunes    : counter[0],
                Martes   : counter[1],
                Miercoles: counter[2],
                Jueves   : counter[3],
                Viernes  : counter[4],
                Sabado   : counter[5],
              },
              Lunes    : tecnico.nombre,
              Martes   : tecnico.nombre,
              Miercoles: tecnico.nombre,
              Jueves   : tecnico.nombre,
              Viernes  : tecnico.nombre,
              Sabado   : tecnico.nombre,
            }
          });

          tec_counter = tec_counter + 1;
        };
      };

      this.sendOrdenesDiariasPorTecnico(test);

      // Construye la estructura de datos a mostrar, en base a la interfaz definida:
      this.dataSource = this.dataSourceBuilder.create(this.data);
      //console.log(this.data)
      this.loading = false;
      first_date = this.newDate;
    });
  };
};


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

// Clase exportable FsIconComponent:
export class FsIconComponent {
  @Input() Miercoles: string;
  @Input() expanded : boolean;

  isDir(): boolean {
    return true;
  };
};