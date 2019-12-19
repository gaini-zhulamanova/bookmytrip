import { Component, OnInit } from '@angular/core';
import { HotelService } from './hotel.service';
import { Hotel } from './Hotel';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {
  newCity: string = "";
  newHotelName: string = '';
  newId: number = 0;
  hotels: Hotel[] = [];
  newHotelStars: number;
  newHotelBreakfast: boolean;
  hotelToUpdate: number;
  hotelToDelete: number;
  constructor(private hotelService: HotelService) { }

  ngOnInit() {

    this.hotelService.getAllHotels().subscribe(hotelsFromBackend => {
      console.log("Restaurants von Backend empfangen");
      console.log("Ich möchte daten sehen")
      console.log(hotelsFromBackend);
      this.hotels = hotelsFromBackend;
    });


  }

 
  createNewHotel() {
    let newHotel = new Hotel();
    newHotel.name = this.newHotelName;
    newHotel.city = this.newCity;
    newHotel.stars = this.newHotelStars;
    newHotel.breakfastIncl = this.newHotelBreakfast;
    newHotel.id = this.newId;
    this.hotelService.addHotel(newHotel).subscribe(newAddedHotel => {
      console.log("Neues Hotel wurde hinzugefügt");
      this.hotels.push(newAddedHotel);
    });
  }


  updateHotel() {
    let hotel = this.hotels.find(hotelToFilter => hotelToFilter.id === this.hotelToUpdate);
    if (hotel) {
      console.log(hotel)
      hotel.name = hotel.name + 'updated';
    }
    this.hotelService.updateHotel(this.hotelToUpdate, hotel).subscribe(returnValue => {
      this.hotels = this.hotels.filter(hotelsToFilter => hotelsToFilter.id !== this.hotelToUpdate);
      this.hotels.push(hotel);
      console.log('Update hat funktioniert');
    }, error => {
      console.log(error)
      console.log('Jetzt ist ein Fehler passiert');
    });
  }

  deleteHotel() {
    this.hotelService.deleteHotel(this.hotelToDelete).subscribe(ok => {
      console.log('Entfernen hat funktioniert');
      this.hotels = this.hotels.filter(hotelsToFilter => hotelsToFilter.id !== this.hotelToDelete);
    }, error => {
      console.log('Es kam zu einem Fehler beim Entfernen');
    })
  }

 
}
