import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from 'src/app/entity-models/contact.model';

@Pipe({
  name: 'showAddress'
})
export class ShowAddressPipe implements PipeTransform {

  transform(value: Contact): string {
    return value.address.split("|", 2)[0] + ", " + 
            value.address.split("|", 2)[1] + " " +
            value.city.charAt(0) +
            value.city.substring(1).toLowerCase()
  }
}
