
// Angular/core:
import { Component, OnInit } from '@angular/core';

// Nebular/theme:
import { NbDialogRef, NbDialogService } from '@nebular/theme';

// Servicios:
import { peticionesGetService } from '../../../../services/peticionesGet.service';
import { tableService }         from '../../../../services/table.service';

// Componentes:
import { AgregarOrdenComponent } from '../agregar-orden/agregar-orden.component';
import { ListaOrdenesComponent } from '../lista-ordenes/lista-ordenes.component';


// Componente decorador:
@Component({
  selector   : 'ngx-mostrar-cliente',
  templateUrl: './mostrar-cliente.component.html',
  styleUrls  : ['./mostrar-cliente.component.scss']
})


// Clase exportable MostrarClienteComponent implementa ngOnInit:
export class MostrarClienteComponent implements OnInit {

  // Variables:
  residencia_clientes: any;
  clientes           : any;
  nombre_cliente     : any;
  rut_cliente        : any;
  correo_cliente     : any;
  direccion_cliente  : any;
  comuna_cliente     : any;
  telefono1          : any;
  telefono2          : any;
  creadoPor          : any;
  actualizadoPor     : any;
  mac_cliente        : any;
  pppoe_cliente      : any;
  

  // Constructor:
  constructor(protected ref       : NbDialogRef<MostrarClienteComponent>,
              private mostrar     : NbDialogService,
              private tableService: tableService,
              private service     : peticionesGetService) {

  }


  // Método ngOnInit:
  ngOnInit(){

    // Obtiene el rut_cliente desde el servicio, enviado previamente desde otro componente:
    this.rut_cliente = this.tableService.getRut_cliente();

    // Llamada de métodos:
    this.sincronizarCliente();
    this.sincronizarResidencia();
  }


  // Método que sincroniza los datos del servicio con los del componente actual:
  sincronizarCliente(){

    /* Obtiene la lista de clientes desde el servicio 
    y los almacena en variable (cliente): */
    this.service.leerClientes(this.rut_cliente).subscribe((clientesList) => {

      this.clientes = clientesList;

      // Enlaza los datos obtenidos de la lista de clientes:
      this.nombre_cliente = this.clientes['nombre'];
      this.correo_cliente = this.clientes['email'];
      this.telefono1      = this.clientes['contacto1'];
      this.telefono2      = this.clientes['contacto2'];
      this.creadoPor      = this.clientes['created_by'];
      this.actualizadoPor = this.clientes['updated_by'];

    })
  }


  // Método que sincroniza los datos del servicio con los del componente actual:
  sincronizarResidencia() {

    /* Obtiene la lista de residencias desde el servicio
    y los almacena en variable (residencia_cliente): */
    this.service.leerResidencia(this.rut_cliente).subscribe((residenciaList) => {

      this.residencia_clientes = residenciaList;

      // Enlaza los datos obtenidos de la lista de residencias:
      this.direccion_cliente = this.residencia_clientes['direccion'];
      this.comuna_cliente    = this.residencia_clientes['comuna'];
      this.mac_cliente       = this.residencia_clientes['mac'];
      this.pppoe_cliente     = this.residencia_clientes['pppoe'];

    })
  }


  // Método encargado de actualizar datos obtenidos desde la API:
  actualizarDatos(){

  }


  // Método encargado de abrir el componente indicado y cerrar el actual:
  listaOrdenes() {

    // Abre el componente indicado:
    this.mostrar.open(ListaOrdenesComponent);

    // Cierra el componente actual almacenado en una referencia:
    this.ref.close();
  }


  // Método encargado de abrir el componente indicado y cerrar el actual:
  agregarOrden() {

    // Abre el componente indicado:
    this.mostrar.open(AgregarOrdenComponent);

    // Cierra el componente actual almacenado en una referencia:
    this.ref.close();
  }

}
