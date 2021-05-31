import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { peticionesGetService } from '../../../../services/peticionesGet.service';

@Component({
  selector   : 'ngx-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls  : ['./usuarios.component.scss']
})
export class UsuariosComponent {

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
      confirmSave        : true,
    },
    actions: {
      columnTitle: 'Más',
      filter     : true,
      delete     : false
    },
    columns: {
      id: {
        title: 'ID',
        width: '20px',
      },
      nombre: {
        title: 'Nombre',
        width: '100px',
      },
      rut: {
        title: 'Rut',
        width: '80px',
      },
      correo: {
        title: 'Correo',
        width: '50px',
      },
      contraseña: {
        title: 'Contraseña',
        width: '50px',
      },
      rol: {
        title: 'Rol',
        width: '50px',
      },
      activo: {
        title : 'Activo',
        width : '40px',
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

  data    : any[] = [];
  usuarios: any;
  report  : any;
  source  : LocalDataSource;
  mostrar : boolean = false;

  constructor(private service: peticionesGetService,
              private router: Router) {

    this.datos();
  }


  datos() {

    this.source = new LocalDataSource(this.data);

    this.service.leerUsuarios().subscribe((x) => {

      this.usuarios = x;

      for (let i = 0; i < this.usuarios.length; i++) {

        this.data.push({
          id        : this.usuarios[i]['id'],
          nombre    : this.usuarios[i]['name'],
          rut       : this.usuarios[i]['rut'],
          correo    : this.usuarios[i]['email'],
          contraseña: this.usuarios[i]['password'],
          rol       : this.usuarios[i]['role'],
          activo    : this.usuarios[i]['active'],
        })
      }

      this.source.load(this.data);
    })
  }


  buscar(query: string = '') {
    this.source.setFilter([
      // datos que se quieren incluir en la busqueda:
      {
        field : 'id',
        search: query
      },
      {
        field : 'nombre',
        search: query
      },
      {
        field : 'rut',
        search: query
      },
      {
        field : 'correo',
        search: query
      },
      {
        field : 'rol',
        search: query
      },
      {
        field : 'activo',
        search: query
      },
    ], false);
  }


  onCreateConfirm(event) {

    if (window.confirm('Estás seguro que quieres crear este usuario?')) {

      this.report = {
        name    : event.newData.nombre,
        rut     : event.newData.rut,
        email   : event.newData.correo,
        password: event.newData.contraseña,
        role    : event.newData.rol,
        active  : event.newData.activo,
      };

      let res = '';

      this.service.agregarUsuario(this.report).subscribe(data => {
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
        id      : event.newData.id,
        name    : event.newData.nombre,
        rut     : event.newData.rut,
        email   : event.newData.correo,
        password: event.newData.contraseña,
        role    : event.newData.rol,
        active  : event.newData.activo,
      };

      let res = '';

      this.service.editarUsuario(this.report).subscribe(data => {
        res = data;
        this.router.navigate(['/pages/panel-admin']);
      });

      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }
}