import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {OrdenesDiarias} from '../models/ordenesDiarias'
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class peticionesGetService{
    ordenesDiarias: OrdenesDiarias = new OrdenesDiarias();
    constructor(private http: HttpClient){

    }

    leerOrdenesDiarias() : Observable<OrdenesDiarias[]>
    {
        return this.http.get<OrdenesDiarias[]>('http://10.19.11.7:3003/api/scheduler/order/')
    }

}