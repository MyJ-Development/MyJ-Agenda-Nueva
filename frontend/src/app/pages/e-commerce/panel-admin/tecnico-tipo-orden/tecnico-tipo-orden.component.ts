import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { peticionesGetService } from '../../../../services/peticionesGet.service';

@Component({
  selector   : 'ngx-tecnico-tipo-orden',
  templateUrl: './tecnico-tipo-orden.component.html',
  styleUrls  : ['./tecnico-tipo-orden.component.scss']
})
export class TecnicoTipoOrdenComponent {



  data       : any[] = [];
  tecnicos   : any[];
  tipo       : any[] = [];
  report     : any;
  source     : LocalDataSource;
  mostrar    : boolean = false;
  settings   : any;

  constructor(private service: peticionesGetService,
              private router: Router) {

    this.datos();

    this.estructura();
  }


  estructura() {

    this.settings = {

      hideSubHeader: false,
  
      pager: {
        display: true,
        perPage: 5
      },
      actions: {
        columnTitle: 'Más',
        filter     : true,
        edit       : false,
        width      : '10px',
      },
      add: {
        addButtonContent   : '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmCreate      : true,
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete      : true,
      },
      columns: {
        rut: {
          title: 'Rut',
          width: '80px',
        },
        nombre: {
          title: 'Nombre',
          width: '70px',
        },
        tipo_orden: {
          title: 'Tipo orden',
          width: '60px',
        },
      }
    };
  }

  buscar(query: string = '') {
    this.source.setFilter([
      // datos que se quieren incluir en la busqueda:
      {
        field : 'rut',
        search: query
      },
      {
        field : 'nombre',
        search: query
      },
      {
        field : 'tipo_orden',
        search: query
      },
    ], false);
  }

  datos() {

    this.source = new LocalDataSource(this.data);

    this.service.leerTecnicos().subscribe((x) => {

      this.tecnicos = x;

      for (let tecnico of this.tecnicos) {

        this.tipo = [];

        for (let tipo of tecnico.type_orders) {

          this.data.push({
            rut       : tecnico.rut,
            nombre    : tecnico.nombre,
            tipo_orden: tipo.descripcion,
            id_tipo   : tipo.id,
          })
        };
      };

      this.source.load(this.data);
    });
  };


  onCreateConfirm(event) {
    if (window.confirm('Estás seguro que quieres crear este técnico?')) {

      this.report = {
        ordertype_id: event.newData.tipo_orden,
        tecnico_rut : event.newData.rut,
      };

      let res = '';

      this.service.agregarTecnicoTipoOrden(this.report).subscribe(data => {
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

  onDeleteConfirm(event): void {
    if (window.confirm('Estás seguro que quieres eliminar este tipo de orden?')) {

      this.report = {
        ordertype_id: event.data.id_tipo,
        tecnico_rut : event.data.rut,
      };

      let res = '';

      this.service.eliminarTecnicoTipoOrden(this.report).subscribe(data => {
        res = data;
        console.log('res');
        console.log(res);
        this.router.navigate(['/pages/panel-admin']);
      });

      event.confirm.resolve();

    } else {
      event.confirm.reject();
    }
  }
}
