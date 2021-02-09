import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { peticionesGetService } from '../../../../services/peticionesGet.service';

@Component({
  selector: 'ngx-tecnico-tipo-orden',
  templateUrl: './tecnico-tipo-orden.component.html',
  styleUrls: ['./tecnico-tipo-orden.component.scss']
})
export class TecnicoTipoOrdenComponent {

  settings = {

    hideSubHeader: false,

    pager: {
      display: true,
      perPage: 5
    },
    actions: {
      columnTitle: 'Más',
      filter: true,
      delete: false,
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
    columns: {
      rut: {
        title: 'Rut',
        width: '40px',
      },
      nombre: {
        title: 'Nombre',
        width: '70px',
      },
      tipo_orden: {
        title: 'Tipo de orden',
        width: '70px',
      },
      capacidad: {
        title: 'Capacidad',
        width: '50px',
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
        field: 'rut',
        search: query
      },
      {
        field: 'nombre',
        search: query
      },
      {
        field: 'tipo_orden',
        search: query
      },
      {
        field: 'capacidad',
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
    
          console.log(tipo[i]);
        })

        this.tecnicos[i]['type_orders'].map(x => console.log(x))


        this.data.push({
          rut       : this.tecnicos[i]['rut'],
          nombre    : this.tecnicos[i]['nombre'],
          tipo_orden: this.tecnicos[i]['type_orders'].map(x => x.descripcion),
          capacidad : this.tecnicos[i]['capacidad'],
        });
      };

      this.source.load(this.data);
    });
  };


  onCreateConfirm(event) {
    if (window.confirm('Estás seguro que quieres crear este técnico?')) {

      this.report = {
        rut: event.newData.rut,
        nombre: event.newData.nombre,
        capacidad: event.newData.capacidad,
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
        rut: event.newData.rut,
        nombre: event.newData.nombre,
        capacidad: event.newData.capacidad,
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
