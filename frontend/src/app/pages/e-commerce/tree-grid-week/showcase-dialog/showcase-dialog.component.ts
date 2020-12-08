/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { tableService } from '../../../../services/table.service';
import { MostrarOrdenComponent } from '../mostrar-orden/mostrar-orden.component';


@Component({
  selector: 'ngx-showcase-dialog',
  templateUrl: './showcase-dialog.component.html',
  styleUrls: ['./showcase-dialog.component.scss'],
})


export class ShowcaseDialogComponent implements OnInit {

  settings = {
    hideSubHeader: true,
    actions: {
      columnTitle: 'Ver más',
      filter: false,
      add: false,
      edit: false,
      delete: false,
      custom: [
        {
          name: 'mas',
          title: '<i class="icon ion-document" title="mas"></i>'
        }
      ]
    },
    columns: {
      id_orden: {
        title: 'ID Orden',
        type: 'number',
      },
      tecnico: {
        title: 'Encargado',
        type: 'string',
      },
      localizacion: {
        title: 'Localización',
        type: 'string',
      },
      tipo_orden: {
        title: 'Tipo orden',
        type: 'string',
      },
      fecha: {
        title: 'Fecha',
        type: 'string',
      },
    },
  };

  ordenesDiariasPorTecnico: any = [];
  source: LocalDataSource = new LocalDataSource();
  data: any[] = [];
  index: any = this.service.getIndex();
  encargado: any = this.service.getEncargado();
  dia: any = this.service.getDia();
  encargadoNombre: any;
  ordDiarias: any[] = [];
  fecha: Date = this.service.getNuevaFecha();
  semana: any = this.service.getSemana();
  ordenesSemanales = [];
  longitud = 6;
  tecnico: any = this.service.getTecnico();

  constructor(protected ref: NbDialogRef<ShowcaseDialogComponent>,
    private service: tableService,
    private datePipe: DatePipe,
    private mostrar: NbDialogService) {

    this.ordenesDiariasPorTecnico = this.service.getOrdenesDiariasPorTecnico();
    this.encargadoNombre = this.encargado.slice(0, -4);

  }

  ngOnInit() {
    this.newFecha(this.index);
    this.getOrdenes();
  }

  mostrarOrden(orden) {

    this.mostrar.open(MostrarOrdenComponent);
    this.ref.close();


    console.log(orden.data);

  }

  getOrdenes() {

    // Separa cantidad de ordenes de un tecnico por semana.
    for (let i = 0; i < this.semana.length; i += this.longitud) {
      let extracto = this.semana.slice(i, i + this.longitud);
      this.ordenesSemanales.push(extracto);

    }

    // Imprime las ordenes de cada técnico por día.
    for (let i = 0; i < this.ordenesDiariasPorTecnico.length; i++) {
      if (this.ordenesDiariasPorTecnico[i] != 0) {
        this.ordDiarias.push(this.ordenesDiariasPorTecnico[i]);
      }
    }

    try {
      for (let i = 0; i < this.ordDiarias.length; i++) {
        for (let j = 0; j < this.ordDiarias.length; j++) {

          if ((this.ordDiarias[j][i])) {

            if ((this.encargadoNombre === this.ordDiarias[j][i]['encargado']['nombre'])
              && (this.newFecha(this.index) == this.ordDiarias[j][i]['fechaejecucion'])) {

              this.data.push({
                id_orden: this.ordDiarias[j][i]['id'],
                tecnico: this.ordDiarias[j][i]['encargado']['nombre'],
                localizacion: this.ordDiarias[j][i]['client_residence']['direccion'],
                tipo_orden: this.ordDiarias[j][i]['tipo']['descripcion'],
                fecha: this.ordDiarias[j][i]['fechaejecucion']
              });
            }

            this.source.load(this.data);

          }
        }
      }
    } catch (error) {
      console.log("No existe")
    }
  }

  newFecha(index: any) {

    if (index === 0) {

      let fechaAux = new Date(this.service.getNuevaFecha());
      let fechaFormat = this.datePipe.transform((fechaAux.setDate(fechaAux.getDate() + 1)), 'yyyy-MM-dd')

      return fechaFormat;

    } else if (index === 1) {

      let fechaAux = new Date(this.service.getNuevaFecha());
      let fechaFormat = this.datePipe.transform((fechaAux.setDate(fechaAux.getDate() + 2)), 'yyyy-MM-dd')

      return fechaFormat;

    } else if (index === 2) {

      let fechaAux = new Date(this.service.getNuevaFecha());
      let fechaFormat = this.datePipe.transform((fechaAux.setDate(fechaAux.getDate() + 3)), 'yyyy-MM-dd')

      return fechaFormat;

    } else if (index === 3) {

      let fechaAux = new Date(this.service.getNuevaFecha());
      let fechaFormat = this.datePipe.transform((fechaAux.setDate(fechaAux.getDate() + 4)), 'yyyy-MM-dd')

      return fechaFormat;

    } else if (index === 4) {

      let fechaAux = new Date(this.service.getNuevaFecha());
      let fechaFormat = this.datePipe.transform((fechaAux.setDate(fechaAux.getDate() + 5)), 'yyyy-MM-dd')

      return fechaFormat;

    } else if (index === 5) {

      let fechaAux = new Date(this.service.getNuevaFecha());
      let fechaFormat = this.datePipe.transform((fechaAux.setDate(fechaAux.getDate() + 6)), 'yyyy-MM-dd')

      return fechaFormat;

    }

  }

  onDeleteConfirm(event): void {
    if (window.confirm('Seguro que quieres eliminar la orden?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  dismiss() {
    this.ref.close();
  }

}
