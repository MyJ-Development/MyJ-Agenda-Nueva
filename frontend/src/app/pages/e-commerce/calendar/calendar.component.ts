/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NbCalendarRange, NbDateService, NbWindowService } from '@nebular/theme';
import { DayCellComponent } from './day-cell/day-cell.component';
import { peticionesGetService } from '../../../services/peticionesGet.service';
import { OrdenesDiarias } from '../../../models/ordenesDiarias';
import { WeekDay } from '@angular/common';
import { TipoOrdenes } from '../../../models/tipoOrdenes';
import { componentSyncService } from '../../../services/componentSync.service';

@Component({
  selector: 'ngx-calendar',
  templateUrl: 'calendar.component.html',
  styleUrls: ['calendar.component.scss'],
  entryComponents: [DayCellComponent],
})
export class CalendarComponent {
  @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;
  @ViewChild('disabledEsc', { read: TemplateRef, static: true }) disabledEscTemplate: TemplateRef<HTMLElement>;
  public cont:number= 0; 
  ordenesDiarias: Array<OrdenesDiarias> = new Array<OrdenesDiarias>();
  tipoOrdenes: Array<TipoOrdenes> = new Array<TipoOrdenes>();
  date = new Date();
  date2 = new Date();
  message:any;
  range: NbCalendarRange<Date>;
  dayCellComponent = DayCellComponent;

  constructor(private peticionesGet: peticionesGetService,
              private dateService: NbDateService<Date>,
              private windowService: NbWindowService,
              private syncService: componentSyncService) {
    this.range = {
      start: this.dateService.addDay(this.monthStart, 3),
      end: this.dateService.addDay(this.monthEnd, -3), 
    };
  }

  get monthStart(): Date {
    return this.dateService.getMonthStart(new Date());
  }

  get monthEnd(): Date {
    return this.dateService.getMonthEnd(new Date());
  }

  ngOnInit(): void {
    this.syncService.currentMessage.subscribe(message => this.message = message)
  }

  openWindow(contentTemplate) {
    this.windowService.open(
      contentTemplate,
      { 
        title: 'Cantidad de Ordenes del dia: ' + this.cont,
        context: {},
      },
    );
    this.syncService.changeMessage(this.date)
    console.log("Calendar: "+this.message)
  }
  
}
