/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component } from '@angular/core';
import { NbCalendarRange, NbDateService } from '@nebular/theme';
import { DayCellComponent } from './day-cell/day-cell.component';
import { peticionesGetService } from '../../../services/peticionesGet.service';
import { OrdenesDiarias } from '../../../models/ordenesDiarias';

@Component({
  selector: 'ngx-calendar',
  templateUrl: 'calendar.component.html',
  styleUrls: ['calendar.component.scss'],
  entryComponents: [DayCellComponent],
})
export class CalendarComponent {
  public cont:number= 0; 
  ordenesDiarias: Array<OrdenesDiarias> = new Array<OrdenesDiarias>();
  date = new Date();
  date2 = new Date();
  range: NbCalendarRange<Date>;
  dayCellComponent = DayCellComponent;

  constructor(private peticionesGet: peticionesGetService, private dateService: NbDateService<Date>) {
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
    this.peticionesGet.leerOrdenesDiarias().subscribe((ordenesDiariasdesdeApi) => {
      this.ordenesDiarias = ordenesDiariasdesdeApi;
      
      for(let ordenes of this.ordenesDiarias)
      {
        while (ordenes.tipo == "Instalacion") {
          this.cont = this.cont + 1;
        }
      }
    })
  }
}
