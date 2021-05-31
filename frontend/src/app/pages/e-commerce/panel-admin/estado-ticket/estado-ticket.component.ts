
// Angular/core:
import { Component } from '@angular/core';

// Angular/router:
import { Router } from '@angular/router';

// Ng2 Smart-table:
import { LocalDataSource } from 'ng2-smart-table';

// Servicios:
import { peticionesGetService } from '../../../../services/peticionesGet.service';


// Componente decorado:
@Component({
  selector   : 'ngx-estado-ticket',
  templateUrl: './estado-ticket.component.html',
  styleUrls  : ['./estado-ticket.component.scss']
})


// Clase exportable EstadoTicketComponent:
export class EstadoTicketComponent {

  // Variables:
  mostrar : boolean = false;
  data    : any[]   = [];
  estado  : any;
  report  : any;
  source  : LocalDataSource;
  settings: any;


  // Constructor:
  constructor(private service: peticionesGetService,
              private router : Router) {

    // Llamada de métodos:
    this.datos();
    this.smartTable();
  };


  // Configuración y atributos de smart-table:
  smartTable() {
    this.settings = {

      // Oculta el filtro por defecto:
      hideSubHeader: false,
  
      // Configura las opciones de páginas:
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
        estado: {
          title: 'Estado',
          width: '40px',
        },
        activo: {
          title: 'Activo',
          width: '50px',
          editor: {
            type  : 'checkbox',
            config: {
              true : true,
              false: false,
            },
          },
        },
      },
    };
  };


  // Obtiene los datos del servicio indicado y los inserta en la tabla:
  datos() {

    this.source = new LocalDataSource(this.data);

    this.service.leerEstadoTicket().subscribe((x) => {

      this.estado = x;

      for (let i = 0; i < this.estado.length; i++) {

        this.data.push({
          id    : this.estado[i]['id'],
          estado: this.estado[i]['descripcion'],
          activo: this.estado[i]['active'],
        });
      };

      this.source.load(this.data);
    });
  };


  // Configura las opciones del filtro de la tabla:
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
      {
        field : 'activo',
        search: query
      },
    ], false);
  };


  // Método que crea un nuevo estado a partir de los datos obtenidos del evento:
  onCreateConfirm(event) {

    if (window.confirm('Estás seguro que quieres crear este estado?')) {

      this.report = {
        descripcion: event.newData.estado,
        active     : event.newData.activo,
      };

      let res = '';

      this.service.agregarEstadoTicket(this.report).subscribe(data => {
        res = data;
        this.router.navigate(['/pages/panel-admin']);
      });

      event.confirm.resolve(event.newData);

    } else {
      event.confirm.reject();
    };
  };


  // Método que edita un estado a partir de los datos obtenidos del evento:
  onSaveConfirm(event) {

    if (window.confirm('Guardar cambios establecidos?')) {

      this.report = {
        id         : event.newData.id,
        descripcion: event.newData.estado,
        active     : event.newData.activo,
      };

      let res = '';

      this.service.editarEstadoTicket(this.report).subscribe(data => {
        res = data;
        this.router.navigate(['/pages/panel-admin']);
      });

      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    };
  };
};
