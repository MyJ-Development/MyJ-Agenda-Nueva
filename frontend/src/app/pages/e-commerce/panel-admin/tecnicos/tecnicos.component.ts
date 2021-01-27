import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { peticionesGetService } from '../../../../services/peticionesGet.service';

@Component({
  selector: 'ngx-tecnicos',
  templateUrl: './tecnicos.component.html',
  styleUrls: ['./tecnicos.component.scss']
})
export class TecnicosComponent {

  settings = {

    hideSubHeader: false,

    pager: {
      display: true,
      perPage: 5
    },
    actions: {
      filter: true,
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
    columns: {
      id: {
        title: 'ID',
      },
      rut: {
        title: 'Rut',
      },
      nombre: {
        title: 'Nombre',
      },
      comuna: {
        title: 'Comuna',
      },
      estado: {
        title: 'Estado',
      },
      capacidad: {
        title: 'Capacidad',
      },
      activo: {
        title: 'Activo',
      },
    }
  };

  data: any[] = [];
  tecnicos: any;
  report: any;
  source: LocalDataSource;
  mostrar: boolean = false;

  constructor(private service: peticionesGetService,
    private router: Router) {

    this.datos();
  }



  datos() {

    this.source = new LocalDataSource(this.data);

    this.service.leerTecnicos().subscribe((x) => {
      this.tecnicos = x;
      console.log(this.tecnicos);

      for (let i = 0; i < this.tecnicos.length; i++) {

        this.data.push({
          id: this.tecnicos[i]['id'],
          rut: this.tecnicos[i]['rut'],
          nombre: this.tecnicos[i]['nombre'],
          comuna: this.tecnicos[i]['comuna'],
          estado: this.tecnicos[i]['estado'],
          capacidad: this.tecnicos[i]['capacidad'],
          activo: this.tecnicos[i]['active'],
        });
      };

      this.source.load(this.data);
    });
  };

  onCreateConfirm(event) {
    if (window.confirm('Estás seguro que quieres crear este técnico?')) {

      this.report = {
        comuna: event.newData.comuna,
        rut: event.newData.rut,
        nombre: event.newData.nombre,
        capacidad: event.newData.capacidad,
        estado: event.newData.estado
      };

      let res = '';

      this.service.agregarTecnico(this.report).subscribe(data => {
        res = data;
        console.log('res');
        console.log(res);
        this.router.navigate(['/success']);
      });

      event.confirm.resolve(event.newData);

    } else {
      event.confirm.reject();
    }
  }

  onDeleteConfirm(event): void {
    let dato = event.data['nombre'];
    if (window.confirm(`Estás seguro que quieres eliminar a ${dato}?`)) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
