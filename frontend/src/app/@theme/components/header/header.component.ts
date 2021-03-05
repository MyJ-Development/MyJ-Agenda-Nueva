/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbDialogService, NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService, NbWindowService } from '@nebular/theme';

import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserStore } from '../../../@core/stores/user.store';
import { SettingsData } from '../../../@core/interfaces/common/settings';
import { User } from '../../../@core/interfaces/common/users';
import { AgregarOrdenComponent } from '../../../pages/e-commerce/tree-grid-week/agregar-orden/agregar-orden.component';
import { AgregarClienteComponent } from '../../../pages/e-commerce/tree-grid-week/agregar-cliente/agregar-cliente.component';
import { AgregarDireccionComponent } from '../../../pages/e-commerce/tree-grid-week/agregar-direccion/agregar-direccion.component';
import { tableService } from '../../../services/table.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: User;
  permisos: boolean;
  panelAdmin: boolean;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = this.getMenuItems();

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userStore: UserStore,
    private settingsService: SettingsData,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private mostrar: NbDialogService,
    private tableService: tableService,
    private router: Router) {
  }

  getMenuItems() {
    const userLink = this.user ? '/pages/users/current/' : '';
    return [
      { title: 'Profile', link: userLink, queryParams: { profile: true } },
      { title: 'Log out', link: '/auth/logout' },
    ];
  }

  panel() {
    this.router.navigate(['/pages/panel-admin'])
  }

  misOrdenes() {
    this.router.navigate(['/pages/mis-ordenes'])
  }

  home() {
    this.router.navigate(['/pages/dashboard'])
  }

  ngOnInit() {
    this.rolUsuario();

    this.currentTheme = this.themeService.currentTheme;

    this.userStore.onUserStateChange()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((user: User) => {
        this.user = user;
        this.userMenu = this.getMenuItems();
      });

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  rolUsuario() {
    let rol = this.tableService.getRolUsuario();

    if ((rol == 'super') || (rol == 'user')) {
      this.permisos = true;
    } else {
      this.permisos = false;
    }

    if (rol == 'super') {
      this.panelAdmin = true;
    } else {
      this.panelAdmin = false;
    }

  }

  changeTheme(themeName: string) {
    this.userStore.setSetting(themeName);
    this.settingsService.updateCurrent(this.userStore.getUser().settings)
      .pipe(takeUntil(this.destroy$))
      .subscribe();

    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');


    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  agregarOrden() {

    this.mostrar.open(AgregarOrdenComponent)
  }

  agregarCliente() {

    this.mostrar.open(AgregarClienteComponent)
  }

  agregarDireccion() {

    this.mostrar.open(AgregarDireccionComponent)
  }
}
