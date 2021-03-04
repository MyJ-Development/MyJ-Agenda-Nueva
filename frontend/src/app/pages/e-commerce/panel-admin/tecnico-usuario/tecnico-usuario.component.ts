import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { peticionesGetService } from '../../../../services/peticionesGet.service';
import { tableService } from '../../../../services/table.service';

@Component({
  selector: 'ngx-tecnico-usuario',
  templateUrl: './tecnico-usuario.component.html',
  styleUrls: ['./tecnico-usuario.component.scss']
})
export class TecnicoUsuarioComponent {

  data       : any[] = [];
  tecnicos   : any[];
  report     : any;
  source     : LocalDataSource;
  mostrar    : boolean = false;
  settings   : any;

  constructor(private service: peticionesGetService,
              private router : Router,
              private tableService: tableService) {

    this.datos();

    this.smartTable();
  }


  smartTable() {

    this.settings = {

      hideSubHeader: false,
  
      pager: {
        display: true,
        perPage: 4
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
        usuario: {
          title: 'Usuario',
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
        field : 'usuario',
        search: query
      },
    ], false);
  }

  datos() {

    this.source = new LocalDataSource(this.data);

    this.service.leerTecnicos().subscribe((x) => {

      this.tecnicos = x;

      for (let tecnico of this.tecnicos) {

        for (let usuario of tecnico.assigned_user) {

          this.data.push({
            rut       : tecnico.rut,
            nombre    : tecnico.nombre,
            usuario   : usuario.email,
            id_usuario: usuario.id,
          })
        };
      };

      this.source.load(this.data);
    });
  };


  onCreateConfirm(event) {
    if (window.confirm('Estás seguro que quieres crear este técnico?')) {

      this.report = {
        user_email  : event.newData.usuario,
        tecnico_rut : event.newData.rut,
      };

      let res = '';

      this.service.agregarTecnicoUsuario(this.report).subscribe(data => {
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

      console.log(event);

      this.report = {
        user_email  : event.data.usuario,
        tecnico_rut : event.data.rut,
      };

      let res = '';

      this.service.eliminarTecnicoUsuario(this.report).subscribe(data => {
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
