import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showInclusive'
})
export class ShowInclusivePipe implements PipeTransform {

  transform(value: boolean, ...args: any[]): string {
    if (value) {
      return "inklusive";
    }
    return "nicht inklusive";
  }

}
