
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { peticionesGetService } from '../../../../services/peticionesGet.service';


@Component({
  selector   : 'ngx-estado-ticket',
  templateUrl: './estado-ticket.component.html',
  styleUrls  : ['./estado-ticket.component.scss']
})


export class EstadoTicketComponent {

  settings = {

    hideSubHeader: false,

    pager: {
      display: true,
      perPage: 7
    },
    add: {
      addButtonContent   : '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate      : true,
    },
    edit: {
      editButtonContent  : '<i class="nb-edit"></i>',
      saveButtonContent  : '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete      : true,
    },
    actions: {
      filter: true,
    },
    columns: {
      id: {
        title: 'ID',
      },
      estado: {
        title: 'Estado',
      },
    }
  };

  data   : any[] = [];
  estado : any;
  report : any;
  source : LocalDataSource;
  mostrar: boolean = false;

  constructor(private service: peticionesGetService,
              private router : Router) {

    this.datos();

  };


  datos() {

    this.source = new LocalDataSource(this.data);

    this.service.leerEstadoTicket().subscribe((x) => {

      this.estado = x;

      for (let i = 0; i < this.estado.length; i++) {

        this.data.push({
          id    : this.estado[i]['id'],
          estado: this.estado[i]['descripcion'],
        });
      };

      this.source.load(this.data);
    });
  };


  buscar(query: string = '') {
    this.source.setFilter([
      // datos que se quieren incluir en la busqueda:
      {
        field : 'id',
        search: query
      },
      {
        field : 'estado',
        search: query
      },
    ], false);
  };


  onCreateConfirm(event) {
    if (window.confirm('Estás seguro que quieres crear este estado?')) {

      this.report = {
        descripcion: event.newData.estado,
      };

      let res = '';

      this.service.agregarEstadoTicket(this.report).subscribe(data => {
        res = data;
        console.log('res');
        console.log(res);
        this.router.navigate(['/success']);
      });

      event.confirm.resolve(event.newData);

    } else {
      event.confirm.reject();
    };
  };

  
  onDeleteConfirm(event): void {
    let dato = event.data['tipo_orden'];
    if (window.confirm(`Estás seguro que quieres eliminar ${dato}?`)) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

}
