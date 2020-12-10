import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { tableService } from '../../../../services/table.service';

@Component({
  selector: 'ngx-mostrar-orden',
  templateUrl: './mostrar-orden.component.html',
  styleUrls: ['./mostrar-orden.component.scss']
})

export class MostrarOrdenComponent implements OnInit {

  ordenCompleta: any[] = [];
  idOrden: any;
  numOrden: any;
  nombreTecnico: any;
  nombreCliente: any;
  rutCliente: any;
  direccionCliente: any;
  comunaCliente: any;
  telefonoCliente1: any;
  telefonoCliente2: any;
  correoCliente: any;
  comentarioCliente: any;

  constructor(protected ref: NbDialogRef<MostrarOrdenComponent>,
              private service: tableService) { 
  
  this.ordenCompleta = service.getOrdenCompleta();
  this.idOrden = service.getIdOrden();

  }

  ngOnInit(): void {
    this.getOrdenCompleta();
  }

  getOrdenCompleta(){

    for (let i = 0; i < this.ordenCompleta.length; i++) {
      if (this.ordenCompleta[i]['id'] === this.idOrden[0].data['id_orden']) {
        this.numOrden = this.ordenCompleta[i]['id'];
        this.nombreTecnico = this.ordenCompleta[i]['encargado']['nombre'];
        this.nombreCliente = this.ordenCompleta[i]['client_order']['nombre'];
        this.rutCliente = this.ordenCompleta[i]['client_order']['rut'];
        this.direccionCliente = this.ordenCompleta[i]['client_residence']['direccion']
        this.comunaCliente = this.ordenCompleta[i]['client_residence']['comuna']
        this.telefonoCliente1 = this.ordenCompleta[i]['client_order']['contacto1']
        this.telefonoCliente2 = this.ordenCompleta[i]['client_order']['contacto2']
        this.correoCliente = this.ordenCompleta[i]['client_order']['email']
        this.comentarioCliente = this.ordenCompleta[i]['comentario']

        console.log(this.ordenCompleta[i]);
        
      }
      
    }
  }

  dismiss() {
    this.ref.close();
  }
}






