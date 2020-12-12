/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NbCalendarRange, NbDateService, NbWindowService } from '@nebular/theme';
import { DayCellComponent } from './day-cell/day-cell.component';
import { peticionesGetService } from '../../../services/peticionesGet.service';
import { componentSyncService } from '../../../services/componentSync.service';
import { tableService } from '../../../services/table.service';

@Component({
  selector: 'ngx-calendar',
  templateUrl: 'calendar.component.html',
  styleUrls: ['calendar.component.scss'],
  entryComponents: [DayCellComponent],
})
export class CalendarComponent {
  @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;
  @ViewChild('disabledEsc', { read: TemplateRef, static: true }) disabledEscTemplate: TemplateRef<HTMLElement>;
  cont: number = 0;
  longitud = 6;
  ordenesPorFecha: any = [];
  date = new Date();
  message: any;
  range: NbCalendarRange<Date>;
  dayCellComponent = DayCellComponent;

  constructor(private peticionesGet: peticionesGetService,
    private dateService: NbDateService<Date>,
    private windowService: NbWindowService,
    private syncService: componentSyncService,
    private tableService: tableService) {
    this.range = {
      start: this.dateService.addDay(this.monthStart, 3),
      end: this.dateService.addDay(this.monthEnd, -3),
    };

  }

  ngOnInit(): void {
    
    this.syncService.currentMessage.subscribe(message => this.message = message);

  }


  get monthStart(): Date {
    return this.dateService.getMonthStart(new Date());
  }

  get monthEnd(): Date {
    return this.dateService.getMonthEnd(new Date());
  }

  openWindow(contentTemplate) {
    
    this.syncService.changeMessage(this.date);
    
    //console.log("Calendar: "+this.message)


    // this.ordenesPorFecha = this.tableService.getOrdenesPorFecha();



    // for (let i = 0; i < 6; i++) {
    //   this.ordenesPorFecha = []
    //   console.log('ordenes');
    //   console.log(this.ordenesPorFecha);
    //   console.log(this.ordenesPorFecha.length);
      
    // }

    this.cont = this.ordenesPorFecha.length;

    this.windowService.open(
      contentTemplate,
      {
        title: 'Cantidad de Ordenes del dia: ' + this.cont,
        context: {},
      }

    );

  }

}
