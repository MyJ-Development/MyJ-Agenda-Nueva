import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { peticionesGetService } from '../../../../services/peticionesGet.service';

@Component({
  selector: 'ngx-tipo-orden',
  templateUrl: './tipo-orden.component.html',
  styleUrls: ['./tipo-orden.component.scss']
})
export class TipoOrdenComponent {

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
      tipo_orden: {
        title: 'Tipo orden',
      },
      peso: {
        title: 'Peso',
      },
    }
  };

  data: any[] = [];
  tipo_orden: any;
  report: any;
  source: LocalDataSource;
  mostrar: boolean = false;

  constructor(private service: peticionesGetService,
              private router: Router) {

    this.datos();

  }

  datos() {

    this.source = new LocalDataSource(this.data);


    this.service.leerTipoOrdenes().subscribe((x) => {
      this.tipo_orden = x;

      console.log(this.tipo_orden);

      for (let i = 0; i < this.tipo_orden.length; i++) {

        this.data.push({
          id: this.tipo_orden[i]['id'],
          tipo_orden: this.tipo_orden[i]['descripcion'],
          peso: this.tipo_orden[i]['peso']
        })

      }


      this.source.load(this.data);


    })
  }


  buscar(query: string = '') {
    this.source.setFilter([
      // datos que se quieren incluir en la busqueda:
      {
        field: 'id',
        search: query
      },
      {
        field: 'tipo_orden',
        search: query
      },
      {
        field: 'peso',
        search: query
      },
    ], false);
  }


  onCreateConfirm(event) {
    if (window.confirm('Estás seguro que quieres crear este tipo de orden?')) {

      this.report = {
        descripcion: event.newData.tipo_orden,
        peso: event.newData.peso
      };

      let res = '';

      this.service.agregarTipoOrden(this.report).subscribe(data => {
        res = data;
        console.log('res');
        console.log(res);
        this.router.navigate(['/pages/panel-admin']);
      });

      console.log(this.report);

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
