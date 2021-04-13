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

    constructor(private http: HttpClient) {}

    leerOrdenesDiarias(date_init, date_end): Observable<OrdenesDiarias[]> {
        return this.http.get<OrdenesDiarias[]>('http://170.239.188.2:3011/api/scheduler/order?date_init=' + date_init + '&date_end=' + date_end + '')
    }

    leerTipoOrdenes(): Observable<any[]> {
        return this.http.get<TipoOrdenes[]>('http://170.239.188.2:3011/api/scheduler/typeorder')
    }

    leerTecnicos(active?): Observable<any[]> {
        if(active){
            return this.http.get<any[]>('http://170.239.188.2:3011/api/scheduler/technician?active=1')
        } else {
            return this.http.get<any[]>('http://170.239.188.2:3011/api/scheduler/technician')
        }
    }

    leerEstadoCliente(): Observable<any[]> {
        return this.http.get<any[]>('http://170.239.188.2:3011/api/scheduler/clientstatus')
    }

    leerEstadoTicket(): Observable<any[]> {
        return this.http.get<any[]>('http://170.239.188.2:3011/api/scheduler/ticketstatus')
    }

    leerMedioPago(): Observable<any[]> {
        return this.http.get<any[]>('http://170.239.188.2:3011/api/scheduler/mediodepago')
    }

    leerPrioridad(): Observable<any[]> {
        return this.http.get<any[]>('http://170.239.188.2:3011/api/scheduler/prioridad')
    }

    leerUsuarios(): Observable<any[]> {
        return this.http.get<any[]>('http://170.239.188.2:3011/api/scheduler/users')
    }
    
    leerUsuarioActual(): Observable<any[]> {
        return this.http.get<any[]>('http://170.239.188.2:3011/api/users/current')
    }

    leerTecnicoTipoOrden(rut_tecnico): Observable<any[]> {
        return this.http.get<any[]>('http://170.239.188.2:3011/api/scheduler/techtypeorder?rut_tecnico=' + rut_tecnico + '')
    }

    leerTecnicoTipoOrdenId(ordertype_id): Observable<any[]> {
        return this.http.get<any[]>('http://170.239.188.2:3011/api/scheduler/techtypeorder?ordertype_id=' + ordertype_id + '')
    }

    leerTecnicoUsuario(user_email): Observable<any[]> {
        return this.http.get<any[]>('http://170.239.188.2:3011/api/scheduler/userassgignedtech?user_email=' + user_email + '')
    }

    leerSeguimientos(id_orden): Observable<any[]> {
        return this.http.get<any[]>('http://170.239.188.2:3011/api/scheduler/seguimientos?order_id=' + id_orden + '')
    }

    leerClientes(rut_cliente): Observable<any[]> {
        return this.http.get<any[]>('http://170.239.188.2:3011/api/scheduler/client?rut=' + rut_cliente + '')
    }

    leerResidencia(rut_cliente): Observable<any[]> {
        return this.http.get<any[]>('http://170.239.188.2:3011/api/scheduler/residence?rut=' + rut_cliente + '')
    }

    leerOrdenesClientesRut(rut_cliente): Observable<any[]> {
        return this.http.get<any[]>('http://170.239.188.2:3011/api/scheduler/cl-orders?rut_cliente=' + rut_cliente + '')
    }

    leerOrdenesClientesId(id_orden): Observable<any[]> {
        return this.http.get<any[]>('http://170.239.188.2:3011/api/scheduler/cl-orders?id_orden=' + id_orden + '')
    }

    leerOrdenesClientesTecnico(nombre_tecnico, date_init, date_end): Observable<any[]> {
        return this.http.get<any[]>('http://170.239.188.2:3011/api/scheduler/cl-orders?nombre_encargado=' + nombre_tecnico + '&date_init=' + date_init + '&date_end=' + date_end + '')
    }

    leerOrdenesClientesDomicilio(domicilio, date_init, date_end): Observable<any[]> {
        return this.http.get<any[]>('http://170.239.188.2:3011/api/scheduler/cl-orders?domicilio=' + domicilio + '&date_init=' + date_init + '&date_end=' + date_end + '')
    }

    leerOrdenesClientesUsuario(created_by, date_init, date_end): Observable<any[]> {
        return this.http.get<any[]>('http://170.239.188.2:3011/api/scheduler/cl-orders?created_by=' + created_by + '&date_init=' + date_init + '&date_end=' + date_end + '')
    }

	agregarCliente(report): Observable<any> {
		const headers = new Headers({ 'Content-Type': 'application/json' });
		return this.http.post('http://170.239.188.2:3011/api/scheduler/client/', report);
    }

    agregarResidencia(report): Observable<any> {
		const headers = new Headers({ 'Content-Type': 'application/json' });
		return this.http.post('http://170.239.188.2:3011/api/scheduler/residence/', report);
    }

	agregarOrden(report): Observable<any> {
		const headers = new Headers({ 'Content-Type': 'application/json' });
		return this.http.post('http://170.239.188.2:3011/api/scheduler/order/', report);
	}

    agregarTecnico(report): Observable<any> {
		const headers = new Headers({ 'Content-Type': 'application/json' });
		return this.http.post('http://170.239.188.2:3011/api/scheduler/technician/', report);
	}

    agregarTipoOrden(report): Observable<any> {
		const headers = new Headers({ 'Content-Type': 'application/json' });
		return this.http.post('http://170.239.188.2:3011/api/scheduler/typeorder/', report);
	}

    agregarEstadoCliente(report): Observable<any> {
		const headers = new Headers({ 'Content-Type': 'application/json' });
		return this.http.post('http://170.239.188.2:3011/api/scheduler/clientstatus/', report);
	}

    agregarEstadoTicket(report): Observable<any> {
		const headers = new Headers({ 'Content-Type': 'application/json' });
		return this.http.post('http://170.239.188.2:3011/api/scheduler/ticketstatus/', report);
	}

    agregarMedioPago(report): Observable<any> {
		const headers = new Headers({ 'Content-Type': 'application/json' });
		return this.http.post('http://170.239.188.2:3011/api/scheduler/mediodepago/', report);
	}

    agregarPrioridad(report): Observable<any> {
		const headers = new Headers({ 'Content-Type': 'application/json' });
		return this.http.post('http://170.239.188.2:3011/api/scheduler/prioridad/', report);
	}

    agregarUsuario(report): Observable<any> {
		const headers = new Headers({ 'Content-Type': 'application/json' });
		return this.http.post('http://170.239.188.2:3011/api/scheduler/users/', report);
	}

    agregarSeguimiento(report): Observable<any> {
		const headers = new Headers({ 'Content-Type': 'application/json' });
		return this.http.post('http://170.239.188.2:3011/api/scheduler/seguimientos/', report);
	}

    agregarTecnicoTipoOrden(report): Observable<any> {
		const headers = new Headers({ 'Content-Type': 'application/json' });
		return this.http.post('http://170.239.188.2:3011/api/scheduler/techtypeorder/', report);
	}

    agregarTecnicoUsuario(report): Observable<any> {
		const headers = new Headers({ 'Content-Type': 'application/json' });
		return this.http.post('http://170.239.188.2:3011/api/scheduler/userassgignedtech/', report);
	}

    editarOrden(report): Observable<any> {
		const headers = new Headers({ 'Content-Type': 'application/json' });
		return this.http.put('http://170.239.188.2:3011/api/scheduler/order/', report);
	}

    editarCliente(report): Observable<any> {
		const headers = new Headers({ 'Content-Type': 'application/json' });
		return this.http.put('http://170.239.188.2:3011/api/scheduler/client/', report);
	}

    editarResidencia(report): Observable<any> {
		const headers = new Headers({ 'Content-Type': 'application/json' });
		return this.http.put('http://170.239.188.2:3011/api/scheduler/residence/', report);
	}

    editarTipoOrden(report): Observable<any> {
		const headers = new Headers({ 'Content-Type': 'application/json' });
		return this.http.put('http://170.239.188.2:3011/api/scheduler/typeorder/', report);
	}

    editarTecnico(report): Observable<any> {
		const headers = new Headers({ 'Content-Type': 'application/json' });
		return this.http.put('http://170.239.188.2:3011/api/scheduler/technician/', report);
	}

    editarEstadoCliente(report): Observable<any> {
		const headers = new Headers({ 'Content-Type': 'application/json' });
		return this.http.put('http://170.239.188.2:3011/api/scheduler/clientstatus/', report);
	}

    editarEstadoTicket(report): Observable<any> {
		const headers = new Headers({ 'Content-Type': 'application/json' });
		return this.http.put('http://170.239.188.2:3011/api/scheduler/ticketstatus/', report);
	}

    editarMedioPago(report): Observable<any> {
		const headers = new Headers({ 'Content-Type': 'application/json' });
		return this.http.put('http://170.239.188.2:3011/api/scheduler/mediodepago/', report);
	}

    editarPrioridad(report): Observable<any> {
		const headers = new Headers({ 'Content-Type': 'application/json' });
		return this.http.put('http://170.239.188.2:3011/api/scheduler/prioridad/', report);
	}

    editarUsuario(report): Observable<any> {
		const headers = new Headers({ 'Content-Type': 'application/json' });
		return this.http.put('http://170.239.188.2:3011/api/scheduler/users/', report);
	}

    eliminarTecnicoTipoOrden(report): Observable<any> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
		return this.http.put('http://170.239.188.2:3011/api/scheduler/techtypeorder/', report);
    }

    eliminarTecnicoUsuario(report): Observable<any> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
		return this.http.put('http://170.239.188.2:3011/api/scheduler/userassgignedtech/', report);
    }

}