import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, FormControl} from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FooterComponent } from './footer/footer.component';
import { CardsComponent } from './cards/cards.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';
import { SearchCitiesPipe } from './search-cities.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarFilterComponent } from './sidebar-filter/sidebar-filter.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { FormComponent } from './form/form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule  } from "@angular/forms";
import { EntryItemComponent } from './entry-item/entry-item.component';

import { AppRoutingModule } from './app-routing.module';
import { ModalEntryQuestionComponent } from './homepage/modal-entry-question/modal-entry-question.component';
import { SearchFieldCitiesComponent } from './homepage/search-field-cities/search-field-cities.component';
import { DropdownButtonComponent } from './old stuff/dropdown-button/dropdown-button.component';
import { PageWithFiltersComponent } from './old stuff/page-with-filters/page-with-filters.component';
import { CarouselCardsComponent } from './homepage/carousel-cards/carousel-cards.component';
import { SidebarComponent } from './sidebar-filter/sidebar/sidebar.component';
import { StarRatingComponent } from './form/star-rating/star-rating.component';

@NgModule({
  declarations: [
    AppComponent,
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
    FormComponent,
    StarRatingComponent,
    EntryItemComponent
  ],
  imports: [
    // tslint:disable-next-line: max-line-length
    BrowserModule, HttpClientModule, FormsModule, NgbModule, BrowserAnimationsModule,
    LayoutModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule,
    MatListModule, MatGridListModule, MatCardModule, MatMenuModule, MatFormFieldModule, 
    ReactiveFormsModule, AppRoutingModule, ReactiveFormsModule],
  providers: [SearchCitiesPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
