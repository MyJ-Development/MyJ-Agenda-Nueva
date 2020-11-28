/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

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

  ordenesDiarias: Array<OrdenesDiarias> = new Array<OrdenesDiarias>();
  ordenesDiariasPorTecnico: any = [];
  source: LocalDataSource = new LocalDataSource();
  data: any;
  index: any;
  encargado: any;
  encargadoNombre: string;
  ordDiarias: any[] = [];
  tecnico: any;
  fecha: any;
  filtroDia: any;

  constructor(protected ref: NbDialogRef<ShowcaseDialogComponent>,
    private service: tableService) {

    this.ordenesDiarias = this.service.getOrdenesDiarias();
    this.index = this.service.getIndex();
    this.encargado = this.service.getEncargado();
    this.ordenesDiariasPorTecnico = this.service.getOrdenesDiariasPorTecnico();
    this.fecha = this.service.getNuevaFecha();

    console.log('orden');
    console.log(this.ordenesDiarias);

    console.log('index');
    console.log(this.index);

    console.log('encargado');
    this.encargadoNombre = this.encargado.slice(0, -3);
    console.log(this.encargadoNombre);

    console.log('Nueva fecha');
    console.log(this.fecha);

    if (this.ordenesDiariasPorTecnico != 0) {
      console.log('ordenes diarias');
      console.log(this.ordenesDiariasPorTecnico);
    }

    // for (let i = 0; i < this.ordenesDiarias.length; i++) {
    //   this.data = [{
    //     id_orden: this.ordenesDiarias[i]['id'],
    //     tecnico: this.encargadoNombre,
    //     localizacion: this.ordenesDiarias[i]['client_residence']['direccion'],
    //     // tipo_orden: this.ordenesDiariasPorTecnico[this.index]['tipo']['descripcion']
    //   }];

    //   this.source.load(this.data);

    // }

    // Imprime las ordenes de cada técnico por día.
    for (let i = 0; i < this.ordenesDiariasPorTecnico.length; i++) {
      if (this.ordenesDiariasPorTecnico[i] != 0) {
        console.log('ordenes diarias por tecnico');
        console.log(this.ordenesDiariasPorTecnico[i]);
        this.ordDiarias.push(this.ordenesDiariasPorTecnico[i]);
      }

    }



    console.log('ord diarias');
    console.log(this.ordDiarias);

    


    try {
      for (let i = 0; i < this.ordDiarias.length; i++) {
        for (let j = 0; j < this.ordDiarias.length; j++) {

          if ((this.ordDiarias[j][i])) {
            this.data = [{
              id_orden: this.ordDiarias[j][i]['id'],
              tecnico: this.encargadoNombre,
              localizacion: this.ordDiarias[j][i]['client_residence']['direccion'],
              tipo_orden: this.ordDiarias[j][i]['tipo']['descripcion']
            }];
            
          }
          this.source.load(this.data);
          this.filtroDia = this.ordDiarias.filter(this.fecha = this.ordDiarias[j][i]['fechaejecucion'])
          console.log('filtro dia');
          console.log(this.filtroDia);
        }
      }

      
    } catch (error) {
      console.log("No existe")
    }


    // this.ordDiarias = (this.ordenesDiarias.filter(x => x.encargado.nombre == this.encargadoNombre))



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
