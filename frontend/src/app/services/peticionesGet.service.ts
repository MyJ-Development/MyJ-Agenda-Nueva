import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {OrdenesDiarias} from '../models/ordenesDiarias'
import { Observable } from 'rxjs';
import { TipoOrdenes } from '../models/tipoOrdenes';

@Injectable({
    providedIn: 'root'
})
export class peticionesGetService{
    ordenesDiarias: OrdenesDiarias = new OrdenesDiarias();
    constructor(private http: HttpClient){

    }

    leerOrdenesDiarias(date_init,date_end) : Observable<OrdenesDiarias[]>
    {
        return this.http.get<OrdenesDiarias[]>('http://10.19.11.7:3003/api/scheduler/order?date_init='+date_init+'&date_end='+date_end+'')
    }

    leerTipoOrdenes() : Observable<TipoOrdenes[]>
    {
        return this.http.get<TipoOrdenes[]>('http://10.19.11.7:3003/api/scheduler/order')
    }

}