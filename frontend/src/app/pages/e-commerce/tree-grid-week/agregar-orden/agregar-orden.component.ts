import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { peticionesGetService } from '../../../../services/peticionesGet.service';
import { tableService } from '../../../../services/table.service';

@Component({
  selector: 'ngx-agregar-orden',
  templateUrl: './agregar-orden.component.html',
  styleUrls: ['./agregar-orden.component.scss']
})
export class AgregarOrdenComponent implements OnInit {

  nombre_cliente: any;
  correo_cliente: any;
  telefono1: any;
  telefono2: any;
  rut_cliente: any;
  cliente: any;
  residencia_cliente: any;
  tecnicos: any[];
  date: Date;
  hora: any;

  constructor(private tableService: tableService,
    private service: peticionesGetService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {

    this.rut_cliente = this.tableService.getRut_cliente();

    this.sincronizarCliente();
    this.sincronizarResidencia();
    this.sincronizarTecnicos();
    this.horaActual();
  }

  sincronizarCliente() {

    this.service.leerClientes(this.rut_cliente).subscribe((clienteList) => {

      this.cliente = clienteList;

      this.nombre_cliente = this.cliente['nombre'];
      this.correo_cliente = this.cliente['email'];
      this.telefono1 = this.cliente['contacto1'];
      this.telefono2 = this.cliente['contacto2'];

    })
  }

  sincronizarTecnicos() {
    // Obtiene los datos de los técnicos del servicio y los guarda en una variable:
    this.service.leerTecnicos().subscribe((TecnicosList) => {
      this.tecnicos = TecnicosList;

    })
  }


  sincronizarResidencia() {

    this.service.leerResidencia(this.rut_cliente).subscribe((residenciaList) => {

      this.residencia_cliente = residenciaList;

      // this.direccion_cliente = this.residencia_clientes['direccion'];
      // this.comuna_cliente = this.residencia_clientes['comuna'];
      // this.mac_cliente = this.residencia_clientes['mac'];
      // this.pppoe_cliente = this.residencia_clientes['pppoe'];

    })

  }

  horaActual() {

    this.date = new Date();
    this.hora = this.datePipe.transform(this.date.getTime()  , 'yyyy-MM-dd');
  }

}
