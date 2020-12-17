import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { peticionesGetService } from '../../../../services/peticionesGet.service';
import { tableService } from '../../../../services/table.service';
import { AgregarOrdenComponent } from '../agregar-orden/agregar-orden.component';
import { OrdenCompletaComponent } from '../orden-completa/orden-completa.component';

@Component({
  selector: 'ngx-mostrar-cliente',
  templateUrl: './mostrar-cliente.component.html',
  styleUrls: ['./mostrar-cliente.component.scss']
})
export class MostrarClienteComponent implements OnInit {

  clientes: any;
  residencia_clientes: any;
  nombre_cliente: any;
  rut_cliente: any;
  correo_cliente: any;
  direccion_cliente: any;
  comuna_cliente: any;
  telefono1: any;
  telefono2: any;
  creadoPor: any;
  actualizadoPor: any;
  mac_cliente: any;
  pppoe_cliente: any;
  

  constructor(protected ref: NbDialogRef<MostrarClienteComponent>,
    private mostrar: NbDialogService,
    private tableService: tableService,
    private service: peticionesGetService) {

  }


  ngOnInit(){

    this.rut_cliente = this.tableService.getRut_cliente();

    this.sincronizarCliente();
    this.sincronizarResidencia();
  }

  sincronizarCliente(){

    this.service.leerClientes(this.rut_cliente).subscribe((clientesList) => {

      this.clientes = clientesList;

      this.nombre_cliente = this.clientes['nombre'];
      this.correo_cliente = this.clientes['email'];
      this.telefono1 = this.clientes['contacto1'];
      this.telefono2 = this.clientes['contacto2'];
      this.creadoPor = this.clientes['created_by'];
      this.actualizadoPor = this.clientes['updated_by'];


    })

  }

  sincronizarResidencia() {

    this.service.leerResidencia(this.rut_cliente).subscribe((residenciaList) => {

      this.residencia_clientes = residenciaList;

      this.direccion_cliente = this.residencia_clientes['direccion'];
      this.comuna_cliente = this.residencia_clientes['comuna'];
      this.mac_cliente = this.residencia_clientes['mac'];
      this.pppoe_cliente = this.residencia_clientes['pppoe'];

    })

  }

  actualizarDatos(){
    
  }


  listaOrdenes() {

    this.mostrar.open(OrdenCompletaComponent);
    this.ref.close();
  }

  agregarOrden() {

    this.mostrar.open(AgregarOrdenComponent);
    this.ref.close();
  }

}
