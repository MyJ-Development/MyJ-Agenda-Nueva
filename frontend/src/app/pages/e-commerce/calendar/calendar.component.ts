import { Component, TemplateRef, ViewChild, } from '@angular/core';
import { NbDateService, NbWindowService } from '@nebular/theme';
import { DayCellComponent } from './day-cell/day-cell.component';
import { peticionesGetService } from '../../../services/peticionesGet.service';
import { componentSyncService } from '../../../services/componentSync.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-calendar',
  templateUrl: 'calendar.component.html',
  styleUrls: ['calendar.component.scss'],
  entryComponents: [DayCellComponent],
})
export class CalendarComponent {
  @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;
  @ViewChild('disabledEsc', { read: TemplateRef, static: true }) disabledEscTemplate: TemplateRef<HTMLElement>;
  dayCellComponent = DayCellComponent;
  cont: number;
  date = new Date();
  message: any;
  data: any[] = [];
  fecha: any;
  tecnicos: any;
  ordenes: any;
  ordenesPorTecnico: any[];
  sumando: number;


  constructor(private windowService: NbWindowService,
    private syncService: componentSyncService,
    private datePipe: DatePipe,
    private service: peticionesGetService) {

  }

  ngOnInit(): void {
    
    this.syncService.currentMessage.subscribe(message => this.message = message);

    this.syncService.changeMessage(this.date);
    
  }


  cambioFecha(event) {

    this.syncService.changeMessage(this.date);

    this.date = event;
  }


  contador() {

    this.cont = 0;

    this.data = [];
    
    this.fecha = this.datePipe.transform(this.date, "yyyy-MM-dd")

    this.service.leerTecnicos().subscribe((tecnicosList) => { this.tecnicos = tecnicosList });   

    this.service.leerOrdenesDiarias(this.fecha, this.fecha).subscribe((x) => {

      this.ordenes = x

      console.log(this.ordenes);

      let counter: number = 0;

      for (let tecnico of this.tecnicos) {

        // Filtra las ordenes diarias por el nombre de cada técnico:
        this.ordenesPorTecnico = (this.ordenes.filter(x =>
          x.encargado.nombre == tecnico.nombre));

        let aux_date: Date = new Date(this.fecha);

        // Realiza un conteo de las ordenes filtradas por fecha de ejecución y la inserta en arreglo:
          let row_date = this.datePipe.transform(aux_date.setDate(aux_date.getDate() + 1), 'yyyy-MM-dd');
          let aux_counter = (this.ordenesPorTecnico.filter(x =>
            this.datePipe.transform(x.fechaejecucion, 'yyyy-MM-dd') == row_date));

          counter = aux_counter.length;

        // Inserta en cada día de la semana, un técnico y el número de ordenes diarias:
        this.data.push(counter);

      }

      for (let i = 0; i < this.data.length; i++) {

        if (this.data[i] > 0) {
  
          this.sumando = 0;
          this.data.forEach(dia => this.sumando += dia);
        }
      }

      if (!this.sumando) {
        this.sumando = 0;
      }

      this.cont = this.sumando;
      
      this.openWindow(this.contentTemplate);
    });
  }


  openWindow(contentTemplate) {

    this.windowService.open(
      contentTemplate,
      {
        title: 'Cantidad de Ordenes del dia: ' + this.cont,
        context: {},
      }

    );

  }
}
