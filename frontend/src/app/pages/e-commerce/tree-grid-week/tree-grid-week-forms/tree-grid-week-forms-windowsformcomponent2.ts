/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';

@Component({
  template: `
<form class="form">
    <div class="row">
    <div class="col-sm-6">
      <div class="form-group">
        <input type="text" nbInput fullWidth id="inputFirstName" placeholder="First Name">
      </div>
    </div>
    <div class="col-sm-6">
      <div class="form-group">
        <input type="text" nbInput fullWidth id="inputLastName" placeholder="Apellido">
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-sm-6">
      <div class="form-group">
        <input type="email" nbInput fullWidth id="inputEmail" placeholder="Correo">
      </div>
    </div>
    <div class="col-sm-6">
      <div class="form-group">
        <input type="url" nbInput fullWidth id="inputWebsite" placeholder="Website">
      </div>
    </div>
  </div>
  <button type="submit" nbButton>Submit</button>
</form>
  `,
  styleUrls: ['tree-grid-week-forms-windowsformcomponent2.scss'],
})
export class WindowFormComponent2 {
  constructor(public windowRef: NbWindowRef) {}

  close() {
    this.windowRef.close();
  }
}