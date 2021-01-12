
// Angular/core:
import { Component, OnInit } from '@angular/core';

// Angular/common:
import { DatePipe } from '@angular/common';

// Nebular/theme:
import { NbDialogRef, NbDialogService } from '@nebular/theme';

// Ng2 smart-table:
import { LocalDataSource } from 'ng2-smart-table';

// Servicios:
import { tableService } from '../../../../services/table.service';

// Componentes:
import { MostrarOrdenComponent } from '../mostrar-orden/mostrar-orden.component';


// Componente decorador:
@Component({
  selector   : 'ngx-showcase-dialog',
  templateUrl: './showcase-dialog.component.html',
  styleUrls  : ['./showcase-dialog.component.scss'],
})


// Clase exportable ShowcaseDialogComponent que implementa método ngOnInit:
export class ShowcaseDialogComponent implements OnInit {

  // Estructura de la tabla a mostrar en html:
  settings = {

    // Oculta el header de búsqueda por defecto:
    hideSubHeader: true,

    // Se define la columna de los botones con acciones a realizar:
    actions: {

      // Se define el título que aparecerá en la columna:
      columnTitle: 'Ver más',

      // Acciones por defecto:
      filter: false,
      add   : false,
      edit  : false,
      delete: false,

      // Acción customizada:
      custom: [
        {
          name : 'mas',
          title: '<i class="icon ion-document" title="mas"></i>'
        }
      ]
    },

    // Define las columnas que queremos mostrar en la tabla (Título/tipo de dato):
    columns: {
      id_orden: {
        title: 'ID Orden',
        type : 'number',
      },
      tecnico: {
        title: 'Encargado',
        type : 'string',
      },
      localizacion: {
        title: 'Localización',
        type : 'string',
      },
      tipo_orden: {
        title: 'Tipo orden',
        type : 'string',
      },
      fecha: {
        title: 'Fecha',
        type : 'string',
      },
    },
  };


  // Variables:
  source                  : LocalDataSource = new LocalDataSource();
  encargado               : any             = this.service.getEncargado();
  index                   : any             = this.service.getIndex();
  ordenesDiariasPorTecnico: any             = [];
  ordenCompleta           : any[]           = [];
  ordDiarias              : any[]           = [];
  idOrden                 : any[]           = [];
  data                    : any[]           = [];
  encargadoNombre         : any;


  // Constructor:
  constructor(protected ref   : NbDialogRef<ShowcaseDialogComponent>,
              private service : tableService,
              private datePipe: DatePipe,
              private mostrar : NbDialogService) {

    // Obtiene las órdenes del servicio y los enlaza en variable:
    this.ordenesDiariasPorTecnico = this.service.getOrdenesDiariasPorTecnico();

    // Obtiene dato del servicio y lo formatea con número de carácteres indicado (Método slice):
    this.encargadoNombre = this.encargado.slice(0, -4);
  };


  // Método ngOnInit:
  ngOnInit() {

    // Llamada de métodos:
    this.newFecha(this.index);
    this.getOrdenes();
  };


  // Los métodos sendXXXX enlazan datos del componente actual, con los metodos del servicio:
  sendIdOrden(datos) {
    this.service.setIdOrden(datos);
  };

  sendOrdenCompleta(datos) {
    this.service.setOrdenCompleta(datos);
  };


  // Método a iniciarse cuando se clickea un evento en el componente html:
  mostrarOrden(event) {

    // Inserta el id obtenido del evento, en un arreglo:
    this.idOrden.push(event);

    // Envía la orden obtenida del evento al servicio indicado:
    this.service.setOrden(event['data']['orden']);

    // Envía el rur obtenido del evento al servicio indicado:
    this.service.setRut_cliente(event['data']['orden']['client_order']['rut']);

    // Al iniciarse el método, se abre el componente indicado:
    this.mostrar.open(MostrarOrdenComponent);

    // Al iniciarse el método, se cierra el componente actual guardado en referencia:
    this.ref.close();
  };


  // Método que obtiene todas las ordenes deseadas que fueron enlazadas en el servicio:
  getOrdenes() {

    // Recorre el arreglo de ordenes para obtener sólo las que existan:
    for (let i = 0; i < this.ordenesDiariasPorTecnico.length; i++) {

      // Condición a ejecutar si las ordenes de cada técnico por día, son mayores a 0:
      if (this.ordenesDiariasPorTecnico[i] != 0) {
        this.ordDiarias.push(this.ordenesDiariasPorTecnico[i]);
      };
    };

    // Compara y enlaza todas las ordenes separadas anteriormente:
    try {

      // Recorre el arreglo de ordenes:
      for (let i = 0; i < this.ordDiarias.length; i++) {
        for (let j = 0; j < this.ordDiarias.length; j++) {

          // Condición a ejecutar si la orden en la posición indicada existe:
          if ((this.ordDiarias[j][i])) {

            // Condición a ejecutar si el nombre del técnico y la fecha indicada es la misma que la orden del arreglo en la posición indicada:
            if ((this.encargadoNombre === this.ordDiarias[j][i]['encargado']['nombre'])
              && (this.newFecha(this.index) == this.ordDiarias[j][i]['fechaejecucion'])) {

              // Inserta y envía la orden filtrada anteriormente en la posición indicada:
              this.ordenCompleta.push(this.ordDiarias[j][i]);
              this.sendOrdenCompleta(this.ordenCompleta);
              this.sendIdOrden(this.idOrden);

              // Inserta los datos filtrados en la tabla definida en un principio:
              this.data.push({
                orden       : this.ordDiarias[j][i],
                id_orden    : this.ordDiarias[j][i]['id'],
                tecnico     : this.ordDiarias[j][i]['encargado']['nombre'],
                localizacion: this.mayus(this.formato(
                              this.ordDiarias[j][i]['client_residence']['direccion'])),
                tipo_orden  : this.ordDiarias[j][i]['tipo']['descripcion'],
                fecha       : this.ordDiarias[j][i]['fechaejecucion']
              });
            };

            // Carga los datos insertados en una estructura del componente html:
            this.source.load(this.data);
          };
        };
      };
    } catch (error) {

      // Encierra un error en caso de que no exista alguna orden indicada:
      console.log("No existe");
    };
  };


  // Método encargado de enlazar el día de semana seleccionado por un índice, con la fecha correspondiente:
  newFecha(index: any) {

    // Condicion a ejecutar si el índice esperado coincide, agregar una cantidad determinada de días a la fecha obtenida a través del servicio (Primer día de la semana):
    if (index === 0) {

      // Obtiene la fecha desde el servicio:
      let fechaAux = new Date(this.service.getNuevaFecha());

      // Formatea la fecha recibida anteriormente:
      let fechaFormat = this.datePipe.transform((fechaAux.setDate(fechaAux.getDate() + 1)), 'yyyy-MM-dd');

      // retorna la fecha formateada:
      return fechaFormat;

    } else if (index === 1) {

      // Obtiene la fecha desde el servicio:
      let fechaAux = new Date(this.service.getNuevaFecha());

      // Formatea la fecha recibida anteriormente:
      let fechaFormat = this.datePipe.transform((fechaAux.setDate(fechaAux.getDate() + 2)), 'yyyy-MM-dd');

      // retorna la fecha formateada:
      return fechaFormat;

    } else if (index === 2) {

      // Obtiene la fecha desde el servicio:
      let fechaAux = new Date(this.service.getNuevaFecha());

      // Formatea la fecha recibida anteriormente:
      let fechaFormat = this.datePipe.transform((fechaAux.setDate(fechaAux.getDate() + 3)), 'yyyy-MM-dd');

      // retorna la fecha formateada:
      return fechaFormat;

    } else if (index === 3) {

      // Obtiene la fecha desde el servicio:
      let fechaAux = new Date(this.service.getNuevaFecha());

      // Formatea la fecha recibida anteriormente:
      let fechaFormat = this.datePipe.transform((fechaAux.setDate(fechaAux.getDate() + 4)), 'yyyy-MM-dd');

      // retorna la fecha formateada:
      return fechaFormat;

    } else if (index === 4) {

      // Obtiene la fecha desde el servicio:
      let fechaAux = new Date(this.service.getNuevaFecha());

      // Formatea la fecha recibida anteriormente:
      let fechaFormat = this.datePipe.transform((fechaAux.setDate(fechaAux.getDate() + 5)), 'yyyy-MM-dd');

      // retorna la fecha formateada:
      return fechaFormat;

    } else if (index === 5) {

      // Obtiene la fecha desde el servicio:
      let fechaAux = new Date(this.service.getNuevaFecha());

      // Formatea la fecha recibida anteriormente:
      let fechaFormat = this.datePipe.transform((fechaAux.setDate(fechaAux.getDate() + 6)), 'yyyy-MM-dd');

      // retorna la fecha formateada:
      return fechaFormat;
    };
  };


  // Método encargado de transformar la primera letra de cada palabra en mayúscula:
  mayus(dato) {
    return String(dato).replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))
  };


  // Método encargado de formatear los carácteres especiales que no son interpretados el navegador:
  formato(dato) {
    return String(dato)
      .replace('&ntilde', 'ñ')
      .replace('&Ntilde', 'Ñ')
      .replace('&amp', '&')
      .replace('&Ntilde', 'Ñ')
      .replace('&ntilde', 'ñ')
      .replace('&Ntilde', 'Ñ')
      .replace('&Agrave', 'À')
      .replace('&Aacute', 'Á')
      .replace('&Acirc', 'Â')
      .replace('&Atilde', 'Ã')
      .replace('&Auml', 'Ä')
      .replace('&Aring', 'Å')
      .replace('&AElig', 'Æ')
      .replace('&Ccedil', 'Ç')
      .replace('&Egrave', 'È')
      .replace('&Eacute', 'É')
      .replace('&Ecirc', 'Ê')
      .replace('&Euml', 'Ë')
      .replace('&Igrave', 'Ì')
      .replace('&Iacute', 'Í')
      .replace('&Icirc', 'Î')
      .replace('&Iuml', 'Ï')
      .replace('&ETH', 'Ð')
      .replace('&Ntilde', 'Ñ')
      .replace('&Ograve', 'Ò')
      .replace('&Oacute', 'Ó')
      .replace('&Ocirc', 'Ô')
      .replace('&Otilde', 'Õ')
      .replace('&Ouml', 'Ö')
      .replace('&Oslash', 'Ø')
      .replace('&Ugrave', 'Ù')
      .replace('&Uacute', 'Ú')
      .replace('&Ucirc', 'Û')
      .replace('&Uuml', 'Ü')
      .replace('&Yacute', 'Ý')
      .replace('&THORN', 'Þ')
      .replace('&szlig', 'ß')
      .replace('&agrave', 'à')
      .replace('&aacute', 'á')
      .replace('&acirc', 'â')
      .replace('&atilde', 'ã')
      .replace('&auml', 'ä')
      .replace('&aring', 'å')
      .replace('&aelig', 'æ')
      .replace('&ccedil;', 'ç')
      .replace('&egrave', 'è')
      .replace('&eacute', 'é')
      .replace('&ecirc', 'ê')
      .replace('&euml', 'ë')
      .replace('&igrave', 'ì')
      .replace('&iacute', 'í')
      .replace('&icirc', 'î')
      .replace('&iuml', 'ï')
      .replace('&eth', 'ð')
      .replace('&ntilde', 'ñ')
      .replace('&ograve', 'ò')
      .replace('&oacute', 'ó')
      .replace('&ocirc', 'ô')
      .replace('&otilde', 'õ')
      .replace('&ouml', 'ö')
      .replace('&oslash', 'ø')
      .replace('&ugrave', 'ù')
      .replace('&uacute', 'ú')
      .replace('&ucirc', 'û')
      .replace('&uuml', 'ü')
      .replace('&yacute', 'ý')
      .replace('&thorn', 'þ')
      .replace('&yuml', 'ÿ');
  };


  // Método que cierra el diálogo y lo remueve de la pantalla:
  dismiss() {
    this.ref.close();
  };
};