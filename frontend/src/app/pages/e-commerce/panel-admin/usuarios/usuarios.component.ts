import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  mostrar: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}