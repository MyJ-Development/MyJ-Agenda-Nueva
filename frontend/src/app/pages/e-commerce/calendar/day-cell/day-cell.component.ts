/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */
import { NbWindowService, NbDateService } from '@nebular/theme';
import { Component } from '@angular/core';
import { NbCalendarDayCellComponent } from '@nebular/theme';
import { Input,Inject, OnInit,TemplateRef, ViewChild } from '@angular/core';
import { NbComponentShape, NbComponentSize, NbComponentStatus } from '@nebular/theme';
import { peticionesGetService } from '../../../../services/peticionesGet.service';
@Component({
  selector: 'ngx-day-cell',
  templateUrl: 'day-cell.component.html',
  styleUrls: ['day-cell.component.scss'],
  host: { '(click)': 'onClick()', 'class': 'day-cell' },
})

export class DayCellComponent extends NbCalendarDayCellComponent<Date> {
}
