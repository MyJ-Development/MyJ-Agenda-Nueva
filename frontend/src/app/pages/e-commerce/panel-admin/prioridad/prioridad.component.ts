
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { peticionesGetService } from '../../../../services/peticionesGet.service';

@Component({
  selector: 'ngx-prioridad',
  templateUrl: './prioridad.component.html',
  styleUrls: ['./prioridad.component.scss']
})
export class PrioridadComponent {

  settings = {

    hideSubHeader: false,

    pager: {
      display: true,
      perPage: 7
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
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
    actions: {
      filter: true,
    },
    columns: {
      id: {
        title: 'ID',
      },
      descripcion: {
        title: 'Descripcion',
      },
    }
  };

  data: any[] = [];
  descripcion: any;
  report: any;
  source: LocalDataSource;
  mostrar: boolean = false;

  constructor(private service: peticionesGetService,
              private router: Router) {

    this.datos();

  }

  datos() {

    this.source = new LocalDataSource(this.data);


    // this.service.leerEstadoTicket().subscribe((x) => {
    //   this.descripcion = x;

    //   console.log(this.descripcion);

    //   for (let i = 0; i < this.descripcion.length; i++) {

    //     this.data.push({
    //       id: this.descripcion[i]['id'],
    //       estado: this.descripcion[i]['descripcion'],
    //     })

    //   }


    //   this.source.load(this.data);


    // })
  }


  buscar(query: string = '') {
    this.source.setFilter([
      // datos que se quieren incluir en la busqueda:
      {
        field: 'id',
        search: query
      },
      {
        field: 'descripcion',
        search: query
      },
    ], false);
  }


  onCreateConfirm(event) {
    if (window.confirm('Estás seguro que quieres crear esta prioridad?')) {

      // this.report = {
      //   descripcion: event.newData.descripcion,
      // };

      // let res = '';

      // this.service.agregarEstadoTicket(this.report).subscribe(data => {
      //   res = data;
      //   console.log('res');
      //   console.log(res);
      //   this.router.navigate(['/success']);
      // });

      event.confirm.resolve(event.newData);

    } else {
      event.confirm.reject();
    }
  }

  onDeleteConfirm(event): void {
    let dato = event.data['tipo_orden'];
    if (window.confirm(`Estás seguro que quieres eliminar ${dato}?`)) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

}
