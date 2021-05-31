
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { peticionesGetService } from '../../../../services/peticionesGet.service';


@Component({
  selector   : 'ngx-medio-pago',
  templateUrl: './medio-pago.component.html',
  styleUrls  : ['./medio-pago.component.scss']
})


export class MedioPagoComponent {

  settings = {

    hideSubHeader: false,

    pager: {
      display: true,
      perPage: 5
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
      confirmSave        : true,
    },
    actions: {
      columnTitle: 'Más',
      filter     : true,
      delete     : false,
    },
    columns: {
      id: {
        title: 'ID',
        width: '10px',
      },
      descripcion: {
        title: 'Descripcion',
        width: '40px',
      },
      activo: {
        title : 'Activo',
        width : '50px',
        editor: {
          type  : 'checkbox',
          config: {
            true : true,
            false: false,
          },
        },
      },
    }
  };

  data       : any[] = [];
  descripcion: any;
  report     : any;
  source     : LocalDataSource;
  mostrar    : boolean = false;


  constructor(private service: peticionesGetService,
              private router: Router) {

    this.datos();
  };


  datos() {

    this.source = new LocalDataSource(this.data);

    this.service.leerMedioPago().subscribe((x) => {

      this.descripcion = x;

      for (let i = 0; i < this.descripcion.length; i++) {

        this.data.push({
          id         : this.descripcion[i]['id'],
          descripcion: this.descripcion[i]['descripcion'],
          activo     : this.descripcion[i]['active'],
        });
      };

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
        field : 'descripcion',
        search: query
      },
      {
        field : 'activo',
        search: query
      },
    ], false);
  };


  onCreateConfirm(event) {
    if (window.confirm('Estás seguro que quieres crear esta forma de pago?')) {

      this.report = {
        descripcion: event.newData.descripcion,
        active     : event.newData.activo,
      };

      let res = '';

      this.service.agregarMedioPago(this.report).subscribe(data => {
        res = data;
        this.router.navigate(['/pages/panel-admin']);
      });

      event.confirm.resolve(event.newData);

    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm(event) {
    if (window.confirm('Guardar cambios establecidos?')) {

      this.report = {
        id         : event.newData.id,
        descripcion: event.newData.descripcion,
        active     : event.newData.activo,
      };

      let res = '';

      this.service.editarMedioPago(this.report).subscribe(data => {
        res = data;
        this.router.navigate(['/pages/panel-admin']);
      });

      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }

}
