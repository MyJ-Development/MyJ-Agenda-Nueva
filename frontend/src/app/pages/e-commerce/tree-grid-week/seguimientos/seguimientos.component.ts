import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { peticionesGetService } from '../../../../services/peticionesGet.service';
import { tableService } from '../../../../services/table.service';

@Component({
  selector: 'ngx-seguimientos',
  templateUrl: './seguimientos.component.html',
  styleUrls: ['./seguimientos.component.scss']
})
export class SeguimientosComponent implements OnInit {

    // Estructura de la tabla a mostrar en html:
    settings = {

      pager: {
        display: true,
        perPage: 5
      },

      // Oculta el header de búsqueda por defecto:
      hideSubHeader: true,
  
      // Se define la columna de los botones con acciones a realizar:
      actions: false,
  
      // Define las columnas que queremos mostrar en la tabla (Título/tipo de dato):
      columns: {
        fecha: {
          title: 'Fecha',
          width: '100px'
        },
        descripcion: {
          title: 'Descripción',
        },
        usuario: {
          title: 'Usuario',
          width: '70px',
        },
      },
    };
  
  
    // Variables:
    source           : LocalDataSource = new LocalDataSource();
    data             : any[]           = [];
    seguimientos     : any[];

  constructor(private service: peticionesGetService,
              private tableService: tableService,
              private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.sincronizarSeguimientos();
  }

    // Método que sincroniza los datos del servicio con los del componente actual:
    sincronizarSeguimientos() {

      /* Obtiene la lista de tipos de ordenes desde el servicio
      y los almacena en variable (prioridad): */
      this.service.leerSeguimientos(this.tableService.getID_orden()).subscribe((seguimientosList) => {

        this.seguimientos = seguimientosList;
        
              // Recorre el total de la lista de ordenes:
        for (let i = 0; i < this.seguimientos.length; i++) {

          // Inserta los datos indicados en la variable data:
          this.data.push({
            fecha       : this.datePipe.transform(this.seguimientos[i]['created_at'], 'dd-MM-yyyy, h:mm a') ,
            descripcion: this.seguimientos[i]['comentario'],
            usuario      : this.seguimientos[i]['created_by']['email'],
          });

        };

        // Carga los datos insertados en una estructura del componente html:
        this.source.load(this.data);
        });
    };

}
