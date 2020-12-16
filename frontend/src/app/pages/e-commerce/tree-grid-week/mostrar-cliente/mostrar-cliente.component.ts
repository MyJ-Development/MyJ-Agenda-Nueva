import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { AgregarOrdenComponent } from '../agregar-orden/agregar-orden.component';
import { OrdenCompletaComponent } from '../orden-completa/orden-completa.component';

@Component({
  selector: 'ngx-mostrar-cliente',
  templateUrl: './mostrar-cliente.component.html',
  styleUrls: ['./mostrar-cliente.component.scss']
})
export class MostrarClienteComponent implements OnInit {

  constructor(protected ref: NbDialogRef<MostrarClienteComponent>,
    private mostrar: NbDialogService,) { }

  ngOnInit(): void {
  }


  ordenCompleta(){

    this.mostrar.open(OrdenCompletaComponent);
    this.ref.close();
  }

  agregarOrden(){

    this.mostrar.open(AgregarOrdenComponent);
    this.ref.close();
  }

}
