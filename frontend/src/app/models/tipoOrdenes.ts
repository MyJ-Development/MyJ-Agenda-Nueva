export class TipoOrdenes{
    id: number;
    descripcion: string;
    contador: number;

    constructor(id, descripcion, contador){
        this.id = id;
        this.descripcion = descripcion;
        this.contador = contador;
    }
}