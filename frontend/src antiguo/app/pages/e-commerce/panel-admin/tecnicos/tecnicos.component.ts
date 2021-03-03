import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { peticionesGetService } from '../../../../services/peticionesGet.service';

@Component({
  selector   : 'ngx-tecnicos',
  templateUrl: './tecnicos.component.html',
  styleUrls  : ['./tecnicos.component.scss']
})
export class TecnicosComponent {

  settings = {

    hideSubHeader: false,

    pager: {
      display: true,
      perPage: 5
    },
    actions: {
      columnTitle: 'Más',
      filter     : true,
      delete     : false,
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
    columns: {
      id: {
        title: 'ID',
        width: '10px',
      },
      rut: {
        title: 'Rut',
        width: '40px',
      },
      nombre: {
        title: 'Nombre',
        width: '70px',
      },
      comuna: {
        title: 'Comuna',
        width: '50px',
      },
      estado: {
        title: 'Estado',
        width: '50px',
      },
      capacidad: {
        title: 'Capacidad',
        width: '50px',
      },
      activo: {
        title : 'Activo',
        width : '30px',
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
  tecnicos   : any[];
  tipoOrdenes: any[] = [];
  report     : any;
  source     : LocalDataSource;
  mostrar    : boolean = false;

  constructor(private service: peticionesGetService,
              private router: Router) {

    this.datos();
  }


  buscar(query: string = '') {
    this.source.setFilter([
      // datos que se quieren incluir en la busqueda:
      {
        field : 'id',
        search: query
      },
      {
        field : 'rut',
        search: query
      },
      {
        field : 'nombre',
        search: query
      },
      {
        field : 'comuna',
        search: query
      },
      {
        field : 'estado',
        search: query
      },
      {
        field : 'capacidad',
        search: query
      },
      {
        field : 'activo',
        search: query
      },
    ], false);
  }


  datos() {

    let tipo;

    this.source = new LocalDataSource(this.data);

    this.service.leerTecnicos().subscribe((x) => {

      this.tecnicos = x;

      for (let i = 0; i < this.tecnicos.length; i++) {


        this.service.leerTecnicoTipoOrden(this.tecnicos[i]['rut']).subscribe((x) => {

          tipo = x;
        })

        this.data.push({
          id        : this.tecnicos[i]['id'],
          rut       : this.tecnicos[i]['rut'],
          nombre    : this.tecnicos[i]['nombre'],
          comuna    : this.tecnicos[i]['comuna'],
          estado    : this.tecnicos[i]['estado'],
          tipo_orden: this.tecnicos[i]['type_orders'].map(x => x.descripcion),
          capacidad : this.tecnicos[i]['capacidad'],
          activo    : this.tecnicos[i]['active'],
        });
      };

      this.source.load(this.data);
    });
  };


  onCreateConfirm(event) {
    if (window.confirm('Estás seguro que quieres crear este técnico?')) {

      this.report = {
        comuna   : event.newData.comuna,
        rut      : event.newData.rut,
        nombre   : event.newData.nombre,
        capacidad: event.newData.capacidad,
        estado   : event.newData.estado,
        active   : event.newData.activo,
      };

      let res = '';

      this.service.agregarTecnico(this.report).subscribe(data => {
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
        id       : event.newData.id,
        comuna   : event.newData.comuna,
        rut      : event.newData.rut,
        nombre   : event.newData.nombre,
        capacidad: event.newData.capacidad,
        estado   : event.newData.estado,
        active   : event.newData.activo,
      };

      let res = '';

      this.service.editarTecnico(this.report).subscribe(data => {
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
