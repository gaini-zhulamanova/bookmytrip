import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-form-entity',
  templateUrl: './form-entity.component.html',
  styleUrls: ['./form-entity.component.css']
})
export class FormEntityComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = ['Berlin', 'Hamburg', 'Muenchen', 'Koeln', 
                      'Frankfurt am Main', 'Stuttgart', 'Duesseldorf', 
                      'Leipzig', 'Dortmund', 'Essen'];
  filteredOptions: Observable<string[]>;

  addressForm = this.fb.group({
    company: null,
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    address: [null, Validators.required],
    address2: null,
    city: [null, Validators.required],
    state: [null, Validators.required],
    postalCode: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ],
    phoneNumver: [null, Validators.required]
  });

  hasUnitNumber = false;

/*   states = [
    {name: 'Baden-Württemberg', abbreviation: 'BW'},
    {name: 'Bayern', abbreviation: 'BY'},
    {name: 'Berlin', abbreviation: 'BE'},
    {name: 'Brandenburg', abbreviation: 'BB'},
    {name: 'Bremen', abbreviation: 'HB'},
    {name: 'Hamburg', abbreviation: 'HH'},
    {name: 'Hessen', abbreviation: 'HE'},
    {name: 'Mecklenburg-Vorpommern', abbreviation: 'MV'},
    {name: 'Niedersachsen', abbreviation: 'NI'},
    {name: 'Nordrhein-Westfalen', abbreviation: 'NRW'},
    {name: 'Rheinland-Pfalz', abbreviation: 'RP'},
    {name: 'Saarland', abbreviation: 'SL'},
    {name: 'Sachsen', abbreviation: 'SA'},
    {name: 'Sachsen-Anhalt', abbreviation: 'CT'},
    {name: 'Schleswig-Holstein', abbreviation: 'SH'},
    {name: 'Thüringen', abbreviation: 'TH'},
  ]; */

  constructor(private fb: FormBuilder) {}

  /* TODO: Thank you Modal integrieren */
/*   onSubmit() {
    alert('Thanks!');
  } */

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
