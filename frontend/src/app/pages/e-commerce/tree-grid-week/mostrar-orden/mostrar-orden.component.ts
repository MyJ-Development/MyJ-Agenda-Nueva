import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-mostrar-orden',
  templateUrl: './mostrar-orden.component.html',
  styleUrls: ['./mostrar-orden.component.scss']
})

export class MostrarOrdenComponent implements OnInit {

  @Input() title: string;
  
  constructor(protected ref: NbDialogRef<MostrarOrdenComponent>) { }

  ngOnInit(): void {
  }

  dismiss() {
    this.ref.close();
  }
}






