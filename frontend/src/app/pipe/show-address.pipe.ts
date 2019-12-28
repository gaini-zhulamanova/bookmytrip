import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../entity/contact';

@Pipe({
  name: 'showAddress'
})
export class ShowAddressPipe implements PipeTransform {

  transform(value: Contact): string {
    return value.address.split("|", 3)[0] + " " + 
            value.address.split("|", 3)[1] + ", " + 
            value.address.split("|", 3)[2] + " " + 
            value.city.charAt(0) +
            value.city.substring(1).toLowerCase()
  }
}
