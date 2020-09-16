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
  range: NbCalendarRange<Date>;
  dayCellComponent = DayCellComponent;

  constructor(private peticionesGet: peticionesGetService, private dateService: NbDateService<Date>, private windowService: NbWindowService) {
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
    this.peticionesGet.leerOrdenesDiarias("2020-02-10","2020-09-20").subscribe((ordenesDiariasdesdeApi) => {
      this.ordenesDiarias = ordenesDiariasdesdeApi;
      console.log(this.ordenesDiarias);
      
      for(let ordenes of this.ordenesDiarias)
      {
          if(ordenes.tipo.descripcion=="Instalacion"){
            this.cont = this.cont + 1;
          }
      }
      console.log(this.cont);
    })
  }

  openWindow(contentTemplate) {
    this.windowService.open(
      contentTemplate,
      { 
        title: 'Cantidad de Ordenes del dia: ' + this.cont,
        context: {},
      },
    );
  }
  
}
