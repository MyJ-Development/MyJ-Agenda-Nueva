/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { NgModule } from '@angular/core';
import { ShowcaseDialogComponent } from './tree-grid-week/showcase-dialog/showcase-dialog.component';
import { DialogNamePromptComponent } from './tree-grid-week/dialog-name-prompt/dialog-name-prompt.component';
import {
  NbButtonModule,
  NbCardModule,
  NbProgressBarModule,
  NbTabsetModule,
  NbUserModule,
  NbIconModule,
  NbSelectModule,
  NbListModule,
  NbSpinnerModule,
  NbDatepickerModule,
  NbPopoverModule,
  NbToastrModule,
  
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ThemeModule } from '../../@theme/theme.module';
import { ECommerceComponent } from './e-commerce.component';
import { ProfitCardComponent } from './profit-card/profit-card.component';
import { CalendarComponent } from './calendar/calendar.component';
import { TreeGridShowcaseComponent } from './tree-grid/tree-grid-showcase.component';
import { TreeGridWeekShowcaseComponent } from './tree-grid-week/tree-grid-showcase.component';
import { ECommerceChartsPanelComponent } from './charts-panel/charts-panel.component';
import { OrdersChartComponent } from './charts-panel/charts/orders-chart.component';
import { ProfitChartComponent } from './charts-panel/charts/profit-chart.component';
import { ChartPanelHeaderComponent } from './charts-panel/chart-panel-header/chart-panel-header.component';
import { ChartPanelSummaryComponent } from './charts-panel/chart-panel-summary/chart-panel-summary.component';
import { ChartModule } from 'angular2-chartjs';
import { StatsCardBackComponent } from './profit-card/back-side/stats-card-back.component';
import { StatsAreaChartComponent } from './profit-card/back-side/stats-area-chart.component';
import { StatsBarAnimationChartComponent } from './profit-card/front-side/stats-bar-animation-chart.component';
import { StatsCardFrontComponent } from './profit-card/front-side/stats-card-front.component';
import { TrafficRevealCardComponent } from './traffic-reveal-card/traffic-reveal-card.component';
import { TrafficBarComponent } from './traffic-reveal-card/front-side/traffic-bar/traffic-bar.component';
import { TrafficFrontCardComponent } from './traffic-reveal-card/front-side/traffic-front-card.component';
import { TrafficCardsHeaderComponent } from './traffic-reveal-card/traffic-cards-header/traffic-cards-header.component';
import { TrafficBackCardComponent } from './traffic-reveal-card/back-side/traffic-back-card.component';
import { TrafficBarChartComponent } from './traffic-reveal-card/back-side/traffic-bar-chart.component';
import {
  ECommerceVisitorsAnalyticsComponent,
} from './visitors-analytics/visitors-analytics.component';
import {
  ECommerceVisitorsAnalyticsChartComponent,
} from './visitors-analytics/visitors-analytics-chart/visitors-analytics-chart.component';
import {
  ECommerceVisitorsStatisticsComponent,
} from './visitors-analytics/visitors-statistics/visitors-statistics.component';
import { ECommerceLegendChartComponent } from './legend-chart/legend-chart.component';
import { ECommerceUserActivityComponent } from './user-activity/user-activity.component';
import { ECommerceProgressSectionComponent } from './progress-section/progress-section.component';
import { SlideOutComponent } from './slide-out/slide-out.component';

import { CountryOrdersComponent } from './country-orders/country-orders.component';
import { CountryOrdersMapComponent } from './country-orders/map/country-orders-map.component';
import { CountryOrdersMapService } from './country-orders/map/country-orders-map.service';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { CountryOrdersChartComponent } from './country-orders/chart/country-orders-chart.component';
import { EarningCardComponent } from './earning-card/earning-card.component';
import { EarningCardBackComponent } from './earning-card/back-side/earning-card-back.component';
import { EarningPieChartComponent } from './earning-card/back-side/earning-pie-chart.component';
import { EarningCardFrontComponent } from './earning-card/front-side/earning-card-front.component';
import { EarningLiveUpdateChartComponent } from './earning-card/front-side/earning-live-update-chart.component';

import { FsIconComponent } from './tree-grid/tree-grid-showcase.component';
import { NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { DayCellComponent } from './calendar/day-cell/day-cell.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  NbActionsModule,
  NbAlertModule,
  NbCalendarKitModule,
  NbCalendarModule,
  NbCalendarRangeModule,
  NbChatModule,
  NbTooltipModule,
  NbContextMenuModule,
  NbWindowModule
} from '@nebular/theme';
import { MostrarOrdenComponent } from './tree-grid-week/mostrar-orden/mostrar-orden.component';
import { MostrarClienteComponent } from './tree-grid-week/mostrar-cliente/mostrar-cliente.component';
import { OrdenCompletaComponent } from './tree-grid-week/orden-completa/orden-completa.component';
import { AgregarOrdenComponent } from './tree-grid-week/agregar-orden/agregar-orden.component';
import { ListaOrdenesComponent } from './tree-grid-week/lista-ordenes/lista-ordenes.component';
import { CaracteresPipe } from './pipes/caracteres.pipe';
import { MayusPipe } from './pipes/mayus.pipe';
import { AgregarClienteComponent } from './tree-grid-week/agregar-cliente/agregar-cliente.component';
import { AgregarDireccionComponent } from './tree-grid-week/agregar-direccion/agregar-direccion.component';
import { PanelAdminComponent } from './panel-admin/panel-admin.component';
import { TipoOrdenComponent } from './panel-admin/tipo-orden/tipo-orden.component';
import { TecnicosComponent } from './panel-admin/tecnicos/tecnicos.component';
import { EstadoClienteComponent } from './panel-admin/estado-cliente/estado-cliente.component';
import { EstadoTicketComponent } from './panel-admin/estado-ticket/estado-ticket.component';
import { MedioPagoComponent } from './panel-admin/medio-pago/medio-pago.component';
import { PrioridadComponent } from './panel-admin/prioridad/prioridad.component';
import { UsuariosComponent } from './panel-admin/usuarios/usuarios.component';
import { SeguimientosComponent } from './tree-grid-week/seguimientos/seguimientos.component';
import { TecnicoTipoOrdenComponent } from './panel-admin/tecnico-tipo-orden/tecnico-tipo-orden.component';
import { CambiosComponent } from './tree-grid-week/cambios/cambios.component';
import { TecnicoUsuarioComponent } from './panel-admin/tecnico-usuario/tecnico-usuario.component';
import { MisOrdenesComponent } from './mis-ordenes/mis-ordenes.component';
@NgModule({
  imports: [
    ThemeModule,
    NbWindowModule,
    NbTooltipModule,
    NbCardModule,
    NbUserModule,
    NbContextMenuModule,
    NbButtonModule,
    NbIconModule,
    NbTabsetModule,
    NbSelectModule,
    NbListModule,
    ChartModule,
    NbProgressBarModule,
    NgxEchartsModule,
    NgxChartsModule,
    NbSpinnerModule,
    LeafletModule,
    NbActionsModule,
    NbAlertModule,
    NbCalendarKitModule,
    NbCalendarModule,
    NbCalendarRangeModule,
    NbChatModule,
    Ng2SmartTableModule,
    NbInputModule, 
    NbTreeGridModule,
    FormsModule,
    ReactiveFormsModule,
    NbDatepickerModule,
    NbPopoverModule,
    NbToastrModule.forRoot(),
  ],
  declarations: [
    ECommerceComponent,
    FsIconComponent,
    TreeGridWeekShowcaseComponent,
    TreeGridShowcaseComponent,
    DayCellComponent,
    StatsCardFrontComponent,
    CalendarComponent,
    StatsAreaChartComponent,
    StatsBarAnimationChartComponent,
    ProfitCardComponent,
    ECommerceChartsPanelComponent,
    ChartPanelHeaderComponent,
    ChartPanelSummaryComponent,
    OrdersChartComponent,
    ProfitChartComponent,
    StatsCardBackComponent,
    TrafficRevealCardComponent,
    TrafficBarChartComponent,
    TrafficFrontCardComponent,
    TrafficBackCardComponent,
    TrafficBarComponent,
    TrafficCardsHeaderComponent,
    CountryOrdersComponent,
    CountryOrdersMapComponent,
    CountryOrdersChartComponent,
    ECommerceVisitorsAnalyticsComponent,
    ECommerceVisitorsAnalyticsChartComponent,
    ECommerceVisitorsStatisticsComponent,
    ECommerceLegendChartComponent,
    ECommerceUserActivityComponent,
    ECommerceProgressSectionComponent,
    SlideOutComponent,
    EarningCardComponent,
    EarningCardFrontComponent,
    EarningCardBackComponent,
    EarningPieChartComponent,
    EarningLiveUpdateChartComponent,
    ShowcaseDialogComponent,
    DialogNamePromptComponent,
    MostrarOrdenComponent,
    MostrarClienteComponent,
    OrdenCompletaComponent,
    AgregarOrdenComponent,
    ListaOrdenesComponent,
    CaracteresPipe,
    MayusPipe,
    AgregarClienteComponent,
    AgregarDireccionComponent,
    PanelAdminComponent,
    TipoOrdenComponent,
    TecnicosComponent,
    EstadoClienteComponent,
    EstadoTicketComponent,
    MedioPagoComponent,
    PrioridadComponent,
    UsuariosComponent,
    SeguimientosComponent,
    TecnicoTipoOrdenComponent,
    CambiosComponent,
    TecnicoUsuarioComponent,
    MisOrdenesComponent,
  ],
  providers: [
    CountryOrdersMapService,
  ],
})
export class ECommerceModule { }
