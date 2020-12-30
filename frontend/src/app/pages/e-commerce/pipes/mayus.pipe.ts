import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mayus'
})
export class MayusPipe implements PipeTransform {

  transform(dato) {
    return String(dato).replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
  }

}
