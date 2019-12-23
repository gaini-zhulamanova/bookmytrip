import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showTypes'
})
export class ShowTypesPipe implements PipeTransform {

  transform(types: any[]): string {

    let concatTypes: string = '';

    if (!types) {
      return '';
    }

    length = types.length;

    for(let i = 0; i < length; i++) {
      if (i > 4) {
        concatTypes += ' und mehr';
        break;
      }
      if (length === 1 || i === (length - 1) || i === 4) {
        concatTypes += types[i].type;
      } else {
        concatTypes += types[i].type + ', ';
      }
    }

    return concatTypes;
  }

}
