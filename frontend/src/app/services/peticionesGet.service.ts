import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { OrdenesDiarias } from '../models/ordenesDiarias'
import { Observable } from 'rxjs';
import { TipoOrdenes } from '../models/tipoOrdenes';

@Injectable({
    providedIn: 'root'
})
export class peticionesGetService {

    ordenesDiarias: OrdenesDiarias = new OrdenesDiarias();

    constructor(private http: HttpClient) {

    }

    leerOrdenesDiarias(date_init, date_end): Observable<OrdenesDiarias[]> {
        return this.http.get<OrdenesDiarias[]>('http://10.19.11.9:3003/api/scheduler/order?date_init=' + date_init + '&date_end=' + date_end + '')
    }

    leerTipoOrdenes(): Observable<TipoOrdenes[]> {
        return this.http.get<TipoOrdenes[]>('http://10.19.11.9:3003/api/scheduler/typeorder')
    }

    leerTecnicos(): Observable<any[]> {
        return this.http.get<any[]>('http://10.19.11.9:3003/api/scheduler/technician')
    }

    leerClientes(rut_cliente): Observable<any[]> {
        return this.http.get<any[]>('http://10.19.11.9:3003/api/scheduler/client?rut=' + rut_cliente + '')
    }

    leerResidencia(rut_cliente): Observable<any[]> {
        return this.http.get<any[]>('http://10.19.11.9:3003/api/scheduler/residence?rut=' + rut_cliente + '')
    }

    leerOrdenesClientesRut(rut_cliente): Observable<any[]> {
        return this.http.get<any[]>('http://10.19.11.9:3003/api/scheduler/cl-orders?rut_cliente=' + rut_cliente + '')
    }

    leerOrdenesClientesId(id_orden): Observable<any[]> {
        return this.http.get<any[]>('http://10.19.11.9:3003/api/scheduler/cl-orders?id_orden=' + id_orden + '')
    }

    leerOrdenesClientesTecnico(nombre_tecnico, date_init, date_end): Observable<any[]> {
        return this.http.get<any[]>('http://10.19.11.9:3003/api/scheduler/cl-orders?nombre_encargado=' + nombre_tecnico + '&date_init=' + date_init + '&date_end=' + date_end + '')
    }

    leerOrdenesClientesDomicilio(domicilio, date_init, date_end): Observable<any[]> {
        return this.http.get<any[]>('http://10.19.11.9:3003/api/scheduler/cl-orders?domicilio=' + domicilio + '&date_init=' + date_init + '&date_end=' + date_end + '')
    }


	agregarOrden(report): Observable<any> {
		const headers = new Headers({ 'Content-Type': 'application/json' });
		return this.http.post('http://10.19.11.9:3003/api/scheduler/order/api/v1/reports/create/', report);
	}

}