import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { settings } from 'cluster';
import { LocalDataSource } from 'ng2-smart-table';
import { peticionesGetService } from '../../../../services/peticionesGet.service';

@Component({
  selector: 'ngx-tecnico-tipo-orden',
  templateUrl: './tecnico-tipo-orden.component.html',
  styleUrls: ['./tecnico-tipo-orden.component.scss']
})
export class TecnicoTipoOrdenComponent {



  data       : any[] = [];
  tecnicos   : any[];
  tipoOrdenes: any[] = [];
  tipo       : any;
  report     : any;
  source     : LocalDataSource;
  mostrar    : boolean = false;
  settings   : any;
  objeto: any[] = [];

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
        confirmSave: true,
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
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
          editor: {
            type: 'list',
            config: {
              list: this.tipoOrdenes,
            }
          },
          valuePrepareFunction: (cell, row) => { return console.log(row)},
        },
      }
    };
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
    ], false);
  }

  datos() {


    this.source = new LocalDataSource(this.data);

    this.service.leerTipoOrdenes().subscribe((x) => {

      this.tipoOrdenes = x

      for (let tipo of this.tipoOrdenes) {
        
        // this.settings.columns.tipo_orden.editor.config.list.push({value: tipo.id, title: tipo.descripcion});
        // this.settings = Object.assign({}, this.settings);

        this.tipoOrdenes.push(
          {value: tipo.id,
           title: tipo.descripcion}
        )
      }



      // for (let i = 0; i < this.objeto.length; i++) {
        
        // this.tipoOrdenes.push(
        //   {value: this.objeto.map(x => x.id)[i],
        //    title: this.objeto.map(x => x.descripcion)[i]}
        // )
      // }


      // console.log(this.tipoOrdenes);
    });

    this.service.leerTecnicos().subscribe((x) => {

      this.objeto = x;

      console.log(this.objeto);

      

      // if (this.tecnicos.map(x => x.type_orders).length == 0) {
      //   console.log('oli');
      // }

      // console.log(this.tecnicos.map(x => x.type_orders).length);

      for (let tecnico of this.objeto) {

        // this.tipoOrdenes.push(
        //   {value: tipoOrden.id,
        //    title: tipoOrden.descripcion}
        // )

        this.service.leerTecnicoTipoOrden(tecnico.rut).subscribe((x) => {

          this.tipo = x;

          for (let tecnico of this.tipo) {
            
            console.log(tecnico);

            // this.data.push({
            //   rut       : tecnico.rut,
            //   nombre    : tecnico.nombre,
            //   tipo_orden: tecnico.type_orders,
            // });

            
          }

          // if (this.tipo) {

          //   console.log(this.tipo['type_orders'].length);
            
          //   for (let j = 0; j < this.tipo['type_orders'].length; j++) {
          //     console.log(this.tipo['type_orders'].map(x => x.id)[j]);


              

          //   }
            

          // }
        })

        // this.tecnicos[i]['type_orders'].map(x => console.log(x))



      };

      this.source.load(this.data);
    });
  };


  onCreateConfirm(event) {
    if (window.confirm('Estás seguro que quieres crear este técnico?')) {

      this.report = {
        ordertype_id: event.newData.tipo_orden,
        tecnico_rut: event.newData.rut,
      };

      let res = '';

      console.log(this.report);

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


  onSaveConfirm(event) {
    if (window.confirm('Guardar cambios establecidos?')) {

      this.report = {
        rut: event.newData.rut,
        nombre: event.newData.nombre,
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

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
