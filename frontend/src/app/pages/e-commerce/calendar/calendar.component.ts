
// Angular/core:
import { Component, TemplateRef, ViewChild, } from '@angular/core';

//Angular/common:
import { DatePipe } from '@angular/common';

// Nebular/theme:
import { NbWindowService } from '@nebular/theme';

// Servicios:
import { peticionesGetService } from '../../../services/peticionesGet.service';
import { componentSyncService } from '../../../services/componentSync.service';

// Componentes:
import { DayCellComponent } from './day-cell/day-cell.component';
import { tableService } from '../../../services/table.service';


// Componente decorado:
@Component({
  selector       : 'ngx-calendar',
  templateUrl    : 'calendar.component.html',
  styleUrls      : ['calendar.component.scss'],
  entryComponents: [DayCellComponent],
})


// Clase exportable CalendarComponent:
export class CalendarComponent {

  // Propiedad decorada:
  @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;
  @ViewChild('disabledEsc', { read: TemplateRef, static: true }) disabledEscTemplate: TemplateRef<HTMLElement>;

  // Variables:
  dayCellComponent = DayCellComponent;
  date             = new Date();
  ordenesPorTecnico: any[];
  data             : any[]  = [];
  cont             : number;
  message          : any;
  fecha            : any;
  tecnicos         : any;
  ordenes          : any;
  sumando          : number;


  // Constructor:
  constructor(private windowService: NbWindowService,
              private syncService  : componentSyncService,
              private datePipe     : DatePipe,
              private service      : peticionesGetService,
              private tableService : tableService) {

  };


  // Método ngOnInit;
  ngOnInit(): void {
    // this.syncService.currentMessage.subscribe(message => this.message = message);

    // Sincroniza las ordenes del día con la fecha actual:
    this.syncService.changeMessage(this.date);

    this.tableService.setFechaClick(this.date);
  };


  // Método que actualiza la fecha seleccionada en calendario y la envía al servicio:
  cambioFecha(event) {

    // Obtiene la fecha seleccionada en el calendario y la almacena en variable date:
    this.date = event;

    this.tableService.setFechaClick(this.date)

    // Llamada de método
    //this.contador();

    // Actualiza la fecha seleccionada en el servicio:
    this.syncService.changeMessage(this.date);
  };


  // Método encargado de contar las ordenes diarias para luego mostrarlas en el díalogo:
  contador() {

    // Inicia el contador en cero:
    this.cont = 0;

    // Inicia el arreglo vacío:
    this.data = [];

    // Formatea la fecha en formato standard para las ordenes:
    this.fecha = this.datePipe.transform(this.date, "yyyy-MM-dd");

    // Llamada del servicio para obtener la lista de técnicos:
    this.service.leerTecnicos().subscribe((tecnicosList) => { this.tecnicos = tecnicosList });

    // Llamada del servicio para obtener la lista de ordenes diarias:
    this.service.leerOrdenesDiarias(this.fecha, this.fecha).subscribe((x) => {

      // Almacena en variable global la lista obtenida:
      this.ordenes = x;

      // Contador para obtener el número de ordenes diarias de cada técnico:
      let counter: number = 0;

      // Si las ordenes son distintas de cero, iniciar:
      if (this.ordenes != 0) {

        // leer para cada técnico de la lista de técnicos:
        for (let tecnico of this.tecnicos) {

          // Filtra las ordenes diarias por el nombre de cada técnico:
          this.ordenesPorTecnico = (this.ordenes.filter(x => x.encargado.nombre == tecnico.nombre));

          // Se guarda la fecha en una variable global de tipo fecha para ser seteada:
          let aux_date: Date = new Date(this.fecha);

          // Realiza un conteo de las ordenes filtradas por fecha de ejecución y la inserta en arreglo:
          let row_date    = this.datePipe.transform(aux_date.setDate(aux_date.getDate() + 1), 'yyyy-MM-dd');
          let aux_counter = (this.ordenesPorTecnico.filter(x =>
            this.datePipe.transform(x.fechaejecucion, 'yyyy-MM-dd') == row_date));

          // Iguala el contador al largo de la cantidad de ordenes diarias del técnico:
          counter = aux_counter.length;

          // Inserta en cada día de la semana, un técnico y el número de ordenes diarias:
          this.data.push(counter);
        };

        // Bucle para leer el largo del arreglo de ordenes obtenidas:
        for (let i = 0; i < this.data.length; i++) {

          // Si el contador del día es mayor a cero, iniciar:
          if (this.data[i] > 0) {

            // Inicia el contador en cero:
            this.sumando = 0;

            // Suma el numero de ordenes de cada técnico, para guardarlas en una sola variable:
            this.data.forEach(dia => this.sumando += dia);
          };
        };

        // Se iguala la suma con el contador:
        this.cont = this.sumando;

        // Si la suma se obtiene como undefined, dejar el contador en cero:
        if (!this.sumando) {
          this.sumando = 0;
        };

      } else {

        // Si no se obtiene ninguna orden, el contador queda en cero:
        this.cont = 0;
      };

      // Llamada de método:
      this.openWindow(this.contentTemplate);
    });
  };


  // Método que llama al contenido del template:
  openWindow(contentTemplate) {

    this.windowService.open(
      contentTemplate,
      {
        title  : 'Cantidad de Ordenes del dia: ' + this.cont,
        context: {},
      }
    );
  };
};
