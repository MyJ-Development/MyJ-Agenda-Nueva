/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Injectable } from '@angular/core';


@Injectable()
export class tableService {

  ordenesDiarias          : any[];
  ordenesDiariasPorTecnico: any[];
  ordenesPorFecha         : any[];
  residencia              : any[];
  orden                   : any[];
  ordenCompleta           : any[];
  idOrden                 : any[];
  index                   : any;
  encargado               : any;
  fecha                   : any;
  idListaOrden            : any;
  rut_cliente             : any;
  usuario                 : any;
  rolUsuario              : any;
  cantidad                : any;
  fechaClick              : any;
  id_orden                : any;
  comuna                 : any[] = [{id: 1, comuna: 'Quilicura'}, 
                                    {id: 2, comuna: 'Maipú'},
                                    {id: 3, comuna: 'Melipilla'},]


  setComuna(id: number, comuna: String) {
    this.comuna.push({id: id, comuna: comuna});
  }

  getComuna() {
    return this.comuna;
  }

  // para obtener los seguimientos:
  setId_orden(valor: any) {
    this.id_orden = valor;
  }

  getID_orden() {
    return this.id_orden;
  }

  setRolUsuario(valor: any) {
    this.rolUsuario = valor;
  }

  getRolUsuario() {
    return this.rolUsuario;
  }

  setFechaClick(valor: any) {
    this.fechaClick = valor;
  }

  getFechaClick() {
    return this.fechaClick;
  }

  setCantidad(valor: any) {
    this.cantidad = valor;
  }

  getCantidad() {
    return this.cantidad;
  }

  setUsuario(valor: any) {
    this.usuario = valor;
  }

  getUsuario() {
    return this.usuario;
  }

  setResidencia(valor: any[]) {
    this.residencia = valor;
  }

  getResidencia() {
    return this.residencia;
  }

  setOrden(valor: any[]) {
    this.orden = valor;
  }

  getOrden() {
    return this.orden;
  }

  setIdListaOrden(valor: any[]) {
    this.idListaOrden = valor;
  }

  getIdListaOrden() {
    return this.idListaOrden;
  }

  setRut_cliente(valor: any[]) {
    this.rut_cliente = valor;
  }

  getRut_cliente() {
    return this.rut_cliente;
  }

  setIdOrden(valor: any[]) {
    this.idOrden = valor;
  }

  getIdOrden() {
    return this.idOrden;
  }

  setOrdenCompleta(valor: any[]) {
    this.ordenCompleta = valor;
  }

  getOrdenCompleta() {
    return this.ordenCompleta;
  }

  setIndex(valor: any) {
    this.index = valor;
  }

  getIndex() {
    return this.index;
  }

  setEncargado(valor: any) {
    this.encargado = valor;
  }

  getEncargado() {
    return this.encargado;
  }

  setOrdenesDiariasPorTecnico(valor: any[]) {
    this.ordenesDiariasPorTecnico = valor;
  }

  getOrdenesDiariasPorTecnico() {
    return this.ordenesDiariasPorTecnico;
  }

  setNuevaFecha(valor: any) {
    this.fecha = valor;
  }

  getNuevaFecha() {
    return this.fecha;
  }

  setOrdenesPorFecha(valor: any[]) {
    this.ordenesPorFecha = valor;
  }

  getOrdenesPorFecha() {
    return this.ordenesPorFecha;
  }

}
