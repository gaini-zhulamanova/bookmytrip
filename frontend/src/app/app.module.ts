import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FooterComponent } from './footer/footer.component';
import { CardsComponent } from './cards/cards.component';
import { DropdownButtonComponent } from './dropdown-button/dropdown-button.component';
import { PageWithFiltersComponent } from './page-with-filters/page-with-filters.component';
import { CarouselCardsComponent } from './carousel-cards/carousel-cards.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';
import { ModalEntryQuestionComponent } from './modal-entry-question/modal-entry-question.component';
import { SearchFieldCitiesComponent } from './search-field-cities/search-field-cities.component';
import { SearchCitiesPipe } from './search-cities.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarFilterComponent } from './sidebar-filter/sidebar-filter.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    AppComponent,
    RestaurantComponent,
    HeaderComponent,
    SidebarComponent,
    HomepageComponent,
    FooterComponent,
    CardsComponent,
    DropdownButtonComponent,
    PageWithFiltersComponent,
    CarouselCardsComponent,
    ModalComponent,
    ModalEntryQuestionComponent,
    SearchFieldCitiesComponent,
    SearchCitiesPipe,
    SidebarFilterComponent,
  ],
  imports: [
    // tslint:disable-next-line: max-line-length
    BrowserModule, HttpClientModule, FormsModule, NgbModule, BrowserAnimationsModule, LayoutModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule,],
  providers: [SearchCitiesPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
