/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { DatePipe } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { OrdenesDiarias } from '../../../../models/ordenesDiarias';
import { tableService } from '../../../../services/table.service';


@Component({
  selector: 'ngx-showcase-dialog',
  templateUrl: './showcase-dialog.component.html',
  styleUrls: ['./showcase-dialog.component.scss'],
})


export class ShowcaseDialogComponent {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
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
    },
  };

  ordenesDiariasPorTecnico: any = [];
  source: LocalDataSource = new LocalDataSource();
  data: any[] = [];
  index: any;
  encargado: any;
  dia: any;
  encargadoNombre: any;
  ordDiarias: any[] = [];
  fecha: any;
  numeroDia: number;
  semana: any;
  counter: number[] = [0, 0, 0, 0, 0, 0];
  tecnicos: any;

  constructor(protected ref: NbDialogRef<ShowcaseDialogComponent>,
    private service: tableService,
    private datePipe: DatePipe,) {

    this.index = this.service.getIndex();
    this.encargado = this.service.getEncargado();
    this.dia = this.service.getDia();
    this.ordenesDiariasPorTecnico = this.service.getOrdenesDiariasPorTecnico();
    this.fecha = this.service.getNuevaFecha();
    this.semana = this.service.getSemana();
    this.tecnicos = this.service.getTecnicos();

    console.log('index');
    console.log(this.index);

    console.log('encargado');
    this.encargadoNombre = this.encargado.slice(0, -4);
    console.log(this.encargadoNombre);

    console.log('dia');
    console.log(this.dia);

    console.log('Nueva fecha');
    console.log(this.fecha);

    console.log('semana');
    console.log(this.semana);





    for (let tecnico of this.tecnicos) {

      console.log(`tecnico`);
      // for (let i = 0; i < 6; i++) {
      //   // this.counter.push(this.semana[i])
      //   console.log('counter');
      //   console.log(this.counter[i]);

      // }
      for (let i = 0; i < 6; i++) {
        // console.log('ordentec');
        // console.log(this.ordenesDiariasPorTecnico[i].length);
        for (let i = 0; i < this.ordenesDiariasPorTecnico.length; i++) {
          this.counter[i] = this.ordenesDiariasPorTecnico[i].length;
          
        }
        
        console.log('counter');
        console.log(this.counter[i]);
      }

    }



    // Imprime las ordenes de cada técnico por día.
    for (let i = 0; i < this.ordenesDiariasPorTecnico.length; i++) {
      if (this.ordenesDiariasPorTecnico[i] != 0) {
        console.log('ordenes diarias por tecnico');
        console.log(this.ordenesDiariasPorTecnico[i]);
        this.ordDiarias.push(this.ordenesDiariasPorTecnico[i]);
      }
    }

    console.log('ordDiarias');
    console.log(this.ordDiarias);


    if (this.dia === 'Lunes') {
      this.numeroDia = 0;
    } else if (this.dia === 'Martes') {
      this.numeroDia = 1;
    } else if (this.dia === 'Miercoles') {
      this.numeroDia = 2;
    } else if (this.dia === 'Jueves') {
      this.numeroDia = 3;
    } else if (this.dia === 'Viernes') {
      this.numeroDia = 4;
    } else if (this.dia === 'Sabado') {
      this.numeroDia = 5;
    }


    try {
      for (let i = 0; i < this.ordDiarias.length; i++) {
        for (let j = 0; j < this.ordDiarias.length; j++) {

          if ((this.ordDiarias[j][i])) {

            if ((this.encargadoNombre === this.ordDiarias[j][i]['encargado']['nombre'])
              && (this.index === this.numeroDia)) {

              console.log('numeroDia');
              console.log(this.numeroDia);
              console.log('index');
              console.log(this.index);

              console.log('Arr');
              console.log(this.ordDiarias[j][i]['encargado']['nombre']);

              this.data = [{
                id_orden: this.ordDiarias[j][i]['id'],
                tecnico: this.ordDiarias[j][i]['encargado']['nombre'],
                localizacion: this.ordDiarias[j][i]['client_residence']['direccion'],
                tipo_orden: this.ordDiarias[j][i]['tipo']['descripcion']
              }];
            }

            this.source.load(this.data);

          }
        }
      }
    } catch (error) {
      console.log("No existe")
    }

  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  dismiss() {
    this.ref.close();
  }

}
