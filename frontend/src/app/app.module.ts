import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { HeaderComponent } from './header/header.component';
import { CityComponent } from './city/city.component';
import { MuseumComponent } from './museum/museum.component';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantComponent,
    HeaderComponent,
    CityComponent,
    MuseumComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
