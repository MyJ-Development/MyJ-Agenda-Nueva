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
      perPage: 4
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
      confirmSave: true,
    },
    actions: {
      columnTitle: 'Más',
      filter: true,
      delete: false
    },
    columns: {
      id: {
        title: 'ID',
        type: 'html',
        width: '10px',
      },
      tipo_orden: {
        title: 'Tipo orden',
        width: '40px',
      },
      peso: {
        title: 'Peso',
        width: '30px',
      },
      activo: {
        title: 'Activo',
        width: '40px',
        editor: {
          type: 'checkbox',
          config: {
            true: true,
            false: false,
          },
        },
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

      for (let i = 0; i < this.tipo_orden.length; i++) {

        this.data.push({
          id: this.tipo_orden[i]['id'],
          tipo_orden: this.tipo_orden[i]['descripcion'],
          peso: this.tipo_orden[i]['peso'],
          activo: this.tipo_orden[i]['active']
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
      {
        field: 'activo',
        search: query
      },
    ], false);
  }


  onCreateConfirm(event) {
    if (window.confirm('Estás seguro que quieres crear este tipo de orden?')) {

      this.report = {
        descripcion: event.newData.tipo_orden,
        peso: event.newData.peso,
        active: event.newData.activo,
      };

      let res = '';

      this.service.agregarTipoOrden(this.report).subscribe(data => {
        res = data;
        console.log('res');
        console.log(res);
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
        id: event.newData.id,
        descripcion: event.newData.tipo_orden,
        peso: event.newData.peso,
        active: event.newData.activo,
      };

      let res = '';

      this.service.editarTipoOrden(this.report).subscribe(data => {
        res = data;
        console.log('res');
        console.log(res);
        this.router.navigate(['/pages/panel-admin']);
      });

      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }

}
