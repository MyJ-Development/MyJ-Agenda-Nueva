import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { peticionesGetService } from '../../../../services/peticionesGet.service';

@Component({
  selector: 'ngx-tipo-orden',
  templateUrl: './tipo-orden.component.html',
  styleUrls: ['./tipo-orden.component.scss']
})
export class TipoOrdenComponent implements OnInit {

  settings = {
    pager: {
      display: true,
      perPage: 5
    },
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
      id: {
        title: 'ID',
        filter: false
      },
      tipo_orden: {
        title: 'Tipo orden',
        filter: false
      },
    }
  };

  data: any[] = [];
  tipo_orden: any;
  orden: any;
  source: LocalDataSource;

  constructor(private service: peticionesGetService) {

    this.datos();

  }

  ngOnInit(): void {



  }

  datos() {

    this.source = new LocalDataSource(this.data);


    this.service.leerTipoOrdenes().subscribe((x) => {
      this.tipo_orden = x;

      for (let i = 0; i < this.tipo_orden.length; i++) {
        
        this.data.push({
          id: this.tipo_orden[i]['id'],
          tipo_orden: this.tipo_orden[i]['descripcion']
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
    ], false);
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
