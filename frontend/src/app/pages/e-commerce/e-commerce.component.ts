/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component } from '@angular/core';
import { tableService } from '../../services/table.service';

@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html',
})

export class ECommerceComponent {

  mostrar: boolean = true;
  buscador: boolean = true;
  rol     : any;

  constructor(private tableService: tableService) {

    this.rolUsuario();
  };

  rolUsuario() {

    this.rol = this.tableService.getRolUsuario();

    if (this.rol == 'vendedor') {
      this.mostrar = false;
    }

    if (this.rol != 'vendedor') {
      this.buscador = false;
    }
  }
}
