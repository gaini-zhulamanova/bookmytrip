import { Pipe, PipeTransform } from '@angular/core';
import { Cuisine } from '../entity/cuisine';

@Pipe({
  name: 'showCuisines'
})
export class ShowCuisinesPipe implements PipeTransform {

  transform(cuisines: Cuisine[]): string {

    let concatCuisines: string = '';

    if (!cuisines) {
      return '';
    }

    length = cuisines.length;

    for(let i = 0; i < length; i++) {
      if (length === 1 || i === (length - 1)) {
        concatCuisines += cuisines[i].type;
      } else {
        concatCuisines += cuisines[i].type + ', ';
      }
    }

    return concatCuisines;
  }

}
