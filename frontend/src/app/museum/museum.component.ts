import { Component, OnInit } from '@angular/core';
import { Museum } from './museum';
import { MuseumService } from './museum.service';

@Component({
  selector: 'app-museum',
  templateUrl: './museum.component.html',
  styleUrls: ['./museum.component.css']
})
export class MuseumComponent implements OnInit {

  museums: Museum[] = [];

  newMuseumName: string = "";
  newCity: string = "";
  newPriceLevel: number;
  newType: string;
  newId: number = 0;

  priceLevelFilter: string;
  typeFilter: string;
  ratingFilter: string;
  filteredMuseums: Museum[] = [];

  constructor(private museumService: MuseumService){}

  ngOnInit() {
    this.museumService.index().subscribe(museumsFromBackend =>{
      console.log("Museums von Backend empfangen");
      console.log("Ich möchte daten sehen")
      console.log(museumsFromBackend);
      this.museums = museumsFromBackend;
    });
  }

  createNewMuseum(){
    let newMuseum = new Museum();
    newMuseum.name = this.newMuseumName;
    newMuseum.city = this.newCity;
    newMuseum.priceLevel = this.newPriceLevel;
    newMuseum.type = this.newType;
    newMuseum.id = this.newId;
    this.museumService.addMuseum(newMuseum).subscribe(newAddedMuseum => {
      console.log("Neues Museum wurde hinzugefügt");
      this.museums.push(newAddedMuseum);
    });
  }

  filter() {
    this.museumService.showByFilter(this.typeFilter, this.priceLevelFilter, this.ratingFilter)
      .subscribe(filtered => this.museums = filtered);
      console.log("Museums were filtered");
      console.log(this.priceLevelFilter, this.typeFilter, this.ratingFilter)
  }

}
