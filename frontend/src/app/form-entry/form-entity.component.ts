import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCheckbox } from '@angular/material/checkbox';
import { Location } from '@angular/common';
import { Hotel } from '../entity-models/hotel.model';
import { Restaurant } from '../entity-models/restaurant.model';
import { Museum } from '../entity-models/museum.model';
import { CityService } from '../services/city-service/city.service';
import { CuisineService } from '../services/cuisine-service/cuisine.service';
import { MuseumTypeService } from '../services/museum-type-service/museum-type.service';
import { EntryService } from '../services/entry-service/entry.service';

@Component({
  selector: 'app-form-entity',
  templateUrl: './form-entity.component.html',
  styleUrls: ['./form-entity.component.css']
})
export class FormEntityComponent implements OnInit {

  cityURL: string;
  hasCityURL: boolean;
  entriesURL: string;
  hasEntriesURL: boolean;
  entryId: number;

  entry: any;

  cities: string[] = [];
  types: string[];
  typesChecked: string[] = [];

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  form: FormGroup;

  hasUnitNumber = false;

  constructor(private fb: FormBuilder,
              private cityService: CityService,
              private cuisineService: CuisineService,
              private museumTypeService: MuseumTypeService,
              private entryService: EntryService,
              private router: Router,
              private route: ActivatedRoute,
              private location: Location) {}

  ngOnInit() {
    this.cityURL = this.route.snapshot.params.city;
    this.hasCityURL = this.cityURL !== undefined;
    this.entriesURL = this.route.snapshot.params.entries;
    this.hasEntriesURL = this.cityURL !== undefined;
    this.entryId = this.route.snapshot.params.id;

    if (this.entryId) {
      this.entryService.showById(this.cityURL, this.entriesURL, this.entryId).subscribe(entry => {
        this.entry = entry;
        this.form = this.fb.group({
          city: [this.cityURL],
          entryType: [this.entriesURL],
          company: [this.entry.name],
          address: [this.entry.contact.address.split('|')[0]],
          postalCode: [this.entry.contact.address.split('|')[1]],
          phoneNumber: [this.entry.contact.phoneNumber],
          priceLevel: [this.entry.priceLevel],
          stars: [''],
          breakfastIncl: ['']
        })
      });
    }
    
    this.cityService.getAllCities().subscribe(cities => this.cities = cities);

    this.form = this.fb.group({
      city: [this.cityURL],
      entryType: [this.entriesURL],
      company: [''],
      address: [''],
      postalCode: ['', [Validators.compose([
        Validators.required, Validators.minLength(5), Validators.maxLength(5)])
      ]],
      phoneNumber: [''],
      priceLevel: [''],
      stars: [''],
      breakfastIncl: ['']
    });
    
    this.getTypes();    

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.cities.filter(city => city.toLowerCase().startsWith(filterValue));
  }

  getTypes() {
    if (this.entriesURL === "restaurants") {
      this.cuisineService.getAll().subscribe(cuisines => this.types = cuisines);
    } else if (this.entriesURL === "museen") {
      this.museumTypeService.getAll().subscribe(museumTypes => this.types = museumTypes);
    }
  }

  onChange(checkbox: MatCheckbox, type: string) {
    if (checkbox.checked) {
      this.typesChecked.push(type);
    } else {
      this.typesChecked.splice(
        this.typesChecked.indexOf(type), 1);
    }
  }

  onCancel() {
    this.location.back();
  }

  // isTypeChecked(type: string) {
  //   let foundType: any;
  //   if (this.entryId) {
  //     if (this.entriesURL === 'museen') {
  //       foundType = this.entry.museumTypes.find(m => m.type === type);
  //     } else {
  //       foundType = this.entry.cuisines.find(c => c.type === type);
  //     }      
  //   }    
  //   if (foundType) {
  //     this.typesChecked.push(foundType.type);
  //     return true;   
  //   }
  //   return false;
  // }

  transformTypesIntoObjects(): any[] {
    let types: any[] = [];
    for (let i = 0; i < this.typesChecked.length; i++) {
      types.push({type: this.typesChecked[i]});
    }
    return types;
  }

  createHotel(): Hotel {
    return {
      name: this.form.value.company,
      stars: this.form.value.stars,
      breakfastIncl: this.form.value.breakfastIncl,
      contact: {
        address: this.form.value.address + '|' + this.form.value.postalCode,
        phoneNumber: this.form.value.phoneNumber,
        city: this.form.value.city.toUpperCase
      }
    }
  }

  createRestaurant(): Restaurant {
    return {
      name: this.form.value.company,
      priceLevel: this.form.value.priceLevel,
      cuisines: this.transformTypesIntoObjects(),
      contact: {
        address: this.form.value.address + '|' + this.form.value.postalCode,
        phoneNumber: this.form.value.phoneNumber,
        city: this.form.value.city.toUpperCase
      }
    }
  }

  createMuseum(): Museum {
    return {
      name: this.form.value.company,
      priceLevel: this.form.value.priceLevel,
      museumTypes: this.transformTypesIntoObjects(),
      contact: {
        address: this.form.value.address + '|' + this.form.value.postalCode,
        phoneNumber: this.form.value.phoneNumber,
        city: this.form.value.city.toUpperCase
      }
    }
  }

  isFormValid(): boolean {
    let hasTypes: boolean = true;
    if (this.entriesURL !== 'hotels') {
      hasTypes = this.typesChecked.length !== 0
    }
    return this.form.valid && hasTypes;
  }

  onSubmit() {
    let entry: any;
    switch(this.entriesURL) {
      case 'restaurants':
        entry = this.createRestaurant();
        break;
      case 'hotels':
        entry = this.createHotel();
        break;
      case 'museen':
        entry = this.createMuseum();
        break;
      default:
        break;
    }

    if (this.isFormValid()) {
      if (this.entryId) {
        this.entryService.update(this.cityURL, this.entriesURL, this.entryId, entry)
          .subscribe(entry => 
            this.router.navigate(['book-my-trip', this.cityURL, this.entriesURL]));
      } else {
        this.entryService.add(this.cityURL, this.entriesURL, entry)
          .subscribe(entry => 
            this.router.navigate(['book-my-trip', this.cityURL, this.entriesURL]));
      }      
    }    
  }
}