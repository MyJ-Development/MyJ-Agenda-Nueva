
// Angular/core:
import { DatePipe } from '@angular/common';

// Angular/core:
import { Component, Input } from '@angular/core';

// Angular/forms:
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Nebular/theme:
import { NbDialogService } from '@nebular/theme';

// Ng2-smart-table:
import { LocalDataSource } from 'ng2-smart-table';

// Rxjs:
import { Observable } from 'rxjs';

// Servicios:
import { peticionesGetService } from '../../../services/peticionesGet.service';
import { tableService }         from '../../../services/table.service';

// Componentes:
import { OrdenCompletaComponent } from '../tree-grid-week/orden-completa/orden-completa.component';


// Componente decorado:
@Component({
  selector   : 'nb-tree-grid-showcase',
  templateUrl: './tree-grid-showcase.component.html',
  styleUrls  : ['./tree-grid-showcase.component.scss'],
})


// Clase exportable TreeGridShowcaseComponent:
export class TreeGridShowcaseComponent {

  // Estructura de la tabla a mostrar en html:
  settings = {

    // Oculta el header de búsqueda por defecto:
    hideSubHeader: true,

    // Se define la columna de los botones con acciones a realizar:
    actions: {

      // Se define el título que aparecerá en la columna de acciones:
      columnTitle: 'Ver',

      // Acciones por defecto:
      filter: false,
      add   : false,
      edit  : false,
      delete: false,

      // Acción customizada:
      custom: [
        {
          name : 'mas',
          title: '<i class="icon ion-document" title="mas"></i>',
        },
      ]
    },

    // Define las columnas que queremos mostrar en la tabla (Título/tipo de dato):
    columns: {
      id_orden: {
        title: 'Id',
      },
      nombre: {
        title: 'Nombre',
      },
      fecha: {
        title: 'Fecha',
        width: '40px',
      },
      direccion: {
        title: 'Dirección',
      },
      tipo: {
        title: 'Tipo orden',
      },
    },
  };


  // Variables:
  source                 : LocalDataSource = new LocalDataSource();
  aparece                : boolean         = false;
  ver                    : boolean         = false;
  opcion_rut_cliente     : string          = 'Rut cliente';
  opcion_nombre_encargado: string          = 'Nombre técnico';
  opcion_id_orden        : string          = 'Id orden';
  opcion_domicilio       : string          = 'Domicilio';
  servicio               : Observable<any[]>;
  formulario             : FormGroup;
  data                   : any[];
  clientes               : any[];
  opciones               : any[];
  buscar                 : any;
  rut_cliente            : any;
  lista                  : any;
  date_init              : any;
  date_inicio            : Date;
  date_end               : any;
  date_fin               : Date;


  // Constructor:
  constructor(private mostrar     : NbDialogService,
              private service     : peticionesGetService,
              private tableService: tableService,
              private datePipe    : DatePipe,
              private fb          : FormBuilder) {

    // Llamada de método:
    this.crearFormulario();

    // Se crea un arreglo de opciones para integrarlo en select:
    this.opciones = [
      this.opcion_rut_cliente,
      this.opcion_nombre_encargado,
      this.opcion_id_orden,
      this.opcion_domicilio
    ];

    // Se suscribe a los cambios del formulario, para mostrarlos instantáneamente:
    this.formulario.valueChanges.subscribe(x => {

      // Si la opción seleccionada corresponde a alguna de las dos opciones, cambiar el estado de ver:
      if ((x.buscar === "Nombre técnico") || (x.buscar === "Domicilio")) {

        this.ver = true;

      } else {

        this.ver = false;
      };
    });
  };


  // Método encargado de obtener datos del formulario html:
  buscarOrden() {

    // Se inicia el arreglo vacío:
    this.data = [];

    // Si la opción seleccionada corresponde al rut cliente, iniciar:
    if (this.formulario.value['buscar'] === 'Rut cliente') {

      // Iguala el dato obtenido del formulario con variable global:
      this.buscar = this.formulario.value['buscador'];

      // Guarda en variable global el servicio correspondiente:
      this.servicio = this.service.leerOrdenesClientesRut(this.buscar);

      // Ejecuta el método seleccionado:
      this.sincronizacionOrdenesClientes();

      // Cambia el estado de la tabla para mostrar la información:
      this.aparece = true;

      // Si la opción seleccionada corresponde al id orden, iniciar:
    } else if (this.formulario.value['buscar'] === 'Id orden') {

      // Iguala el dato obtenido del formulario con variable global:
      this.buscar = this.formulario.value['buscador'];

      // Guarda en variable local el servicio correspondiente:
      this.servicio = this.service.leerOrdenesClientesId(this.buscar);

      // Ejecuta el método seleccionado:
      this.sincronizacionOrdenesClientes();

      // Cambia el estado de la tabla para mostrar la información:
      this.aparece = true;

      // Si la opción seleccionada corresponde al nombre técnico y al valor del calendario, iniciar:
    } else if ((this.formulario.value['buscar'] === 'Nombre técnico')
      && (this.formulario.value['calendar'])) {

      // Iguala el dato obtenido del formulario con variable global:
      this.buscar = this.formulario.value['buscador'];

      // Guarda en variable global la fecha de inicio obtenida del calendario:
      this.date_inicio = new Date(this.formulario.value['calendar']['start']);

      // Formatea la fecha de inicio obtenida, en formato standard de las órdenes:
      this.date_init = this.datePipe.transform(this.date_inicio, 'yyyy-MM-dd');

      // Guarda en variable global la fecha de final obtenida del calendario:
      this.date_fin = new Date(this.formulario.value['calendar']['end']);

      // Formatea la fecha final obtenida, en formato standard de las órdenes:
      this.date_end = this.datePipe.transform(this.date_fin, 'yyyy-MM-dd');

      // Obtiene los datos del servicio ingresando los parámetros nombre tecnico, fecha inicio y término:
      this.servicio = this.service.leerOrdenesClientesTecnico(this.buscar, this.date_init, this.date_end);

      // Ejecuta el método seleccionado:
      this.sincronizacionOrdenesClientes();

      // Cambia el estado de la tabla para mostrar la información:
      this.aparece = true;

      // Si la opción seleccionada corresponde al domicilio y al valor del calendario, iniciar:
    } else if ((this.formulario.value['buscar'] === 'Domicilio') && (this.formulario.value['calendar'])) {

      // Iguala el dato obtenido del formulario con variable global:
      this.buscar = this.formulario.value['buscador'];

      // Guarda en variable global la fecha de inicio obtenida del calendario:
      this.date_inicio = new Date(this.formulario.value['calendar']['start']);

      // Formatea la fecha de inicio obtenida, en formato standard de las órdenes:
      this.date_init = this.datePipe.transform(this.date_inicio, 'yyyy-MM-dd');

      // Guarda en variable global la fecha de final obtenida del calendario:
      this.date_fin = new Date(this.formulario.value['calendar']['end']);

      // Formatea la fecha final obtenida, en formato standard de las órdenes:
      this.date_end = this.datePipe.transform(this.date_fin, 'yyyy-MM-dd');

      console.log(this.date_init);
      console.log(this.date_end);

      // Obtiene los datos del servicio ingresando los parámetros domicilio, fecha inicio y término:
      this.servicio  = this.service.leerOrdenesClientesDomicilio(this.buscar, this.date_init, this.date_end);

      // Ejecuta el método seleccionado:
      this.sincronizacionOrdenesClientes();

      // Cambia el estado de la tabla para mostrar la información:
      this.aparece = true;
    };
  };


  // Método que sincroniza los datos del servicio con los del componente actual:
  sincronizacionOrdenesClientes() {

    /* Obtiene la lista de clientes desde el servicio 
    y los almacena en variable (clientes): */
    this.servicio.subscribe((clientesList) => {

      // Guarda en variable global la lista de clientes obtenida del servicio:
      this.clientes = clientesList;

      // bucle para recorrer el arreglo de la lista de clientes:
      for (let i = 0; i < this.clientes.length; i++) {

        // Guarda en variable global el rut obtenido de la orden en la posición indicada:
        this.rut_cliente = this.clientes[i]['client_order']['rut'];

        // Inserta los datos del arreglo en la variable data:
        this.data.push({
          indice   : i,
          objeto   : this.clientes[i],
          id_orden : this.clientes[i]['id'],
          nombre   : this.mayus(this.formato(this.clientes[i]['client_order']['nombre'])),
          direccion: this.mayus(this.formato(this.clientes[i]['client_residence']['direccion'])),
          fecha    : this.datePipe.transform(this.clientes[i]['fechaejecucion'], 'dd-MM-yyy'),
          tipo     : this.clientes[i]['tipo']['descripcion'],
        });
      };

      // Carga los datos insertados en una estructura del componente html:
      this.source.load(this.data);
    });
  };


  // Método encargado de enviar los datos del evento al servicio y abre el componente indicado:
  ordenCompleta(event) {

    // Envía la orden obtenida del evento, al servicio indicado:
    this.tableService.setOrden(event['data']['objeto']);

    // Envía el rut del cliente seleccionado, al servicio indicado:
    this.tableService.setRut_cliente(event['data']['objeto']['client_order']['rut']);

    // Envía el id obtenido del evento, al servicio indicado:
    this.tableService.setIdOrden(event['data']['objeto']['id']);

    // Abre el componente indicado:
    this.mostrar.open(OrdenCompletaComponent);
  };


  // Método encargado de crear el formulario que extrae los datos del componente html:
  crearFormulario() {

    this.formulario = this.fb.group({

      // Controles del formulario, llamados por el componente html con formControlName:
      buscar  : ['', Validators.required],
      buscador: ['', Validators.required],
      calendar: ['', Validators.required],
    });
  };


  // Método encargado de transformar la primera letra de cada palabra en mayúscula:
  mayus(dato){
    return String(dato).replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))
  };


  // Método encargado de formatear los carácteres especiales que no son interpretados por el navegador:
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
};


// Componente decorado:
@Component({
  selector: 'nb-fs-icon',
  template: `
    <nb-tree-grid-row-toggle [expanded]="expanded" *ngIf="isDir(); else fileIcon">
    </nb-tree-grid-row-toggle>
    <ng-template #fileIcon>
      <nb-icon icon="file-text-outline"></nb-icon>
    </ng-template>
  `,
})


// Clase exportable FsIconComponent:
export class FsIconComponent {
  @Input() tipo    : string;
  @Input() expanded: boolean;

  isDir(): boolean {
    return true;
  };
};