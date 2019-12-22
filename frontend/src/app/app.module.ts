import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule } from '@angular/forms';
import { HomepageComponent } from './homepage/homepage.component';
import { FooterComponent } from './footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';
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
import { DropdownButtonComponent } from './old stuff/dropdown-button/dropdown-button.component';
import { PageWithFiltersComponent } from './old stuff/page-with-filters/page-with-filters.component';
import { CarouselCardsComponent } from './homepage/carousel-cards/carousel-cards.component';
import { SidebarComponent } from './sidebar-filter/sidebar/sidebar.component';
import { StarRatingComponent } from './form/star-rating/star-rating.component';
import { HeaderComponent } from './old stuff/header/header.component';
import { CommentComponent } from './entry-item/comment/comment.component';
import { ThankYouModalComponent } from './form/thank-you-modal/thank-you-modal.component';
import { SearchFieldComponent } from './sidebar-filter/search-field/search-field.component';
import { FormEntityComponent } from './form-entity/form-entity.component';
import { SearchCitiesPipe } from './pipe/search-cities.pipe';
import { ShowCuisinesPipe } from './pipe/show-cuisines.pipe';
import { CardsComponent } from './sidebar-filter/cards/cards.component';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { ButtonNewEntryItemComponent } from './form-entity/button-new-entry-item/button-new-entry-item.component';
import { FilterMoreOptionsComponent } from './sidebar-filter/filter-more-options/filter-more-options.component';
import { ModalMoreOptionsComponent } from './sidebar-filter/sidebar/modal-more-options/modal-more-options.component';
import { SearchFieldCitiesComponent } from './homepage/modal-entry-question/search-field-cities/search-field-cities.component';

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
    EntryItemComponent,
    CommentComponent,
    ThankYouModalComponent,
    SearchFieldComponent,
    FormEntityComponent,
    ShowCuisinesPipe,
    ButtonNewEntryItemComponent,
    ModalMoreOptionsComponent,
    FilterMoreOptionsComponent,
  
  ],
  imports: [
    // tslint:disable-next-line: max-line-length
    BrowserModule, HttpClientModule, FormsModule, NgbModule, BrowserAnimationsModule,
    LayoutModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule,
    MatListModule, MatGridListModule, MatCardModule, MatMenuModule, MatFormFieldModule,
    ReactiveFormsModule, AppRoutingModule, ReactiveFormsModule, MatInputModule, MatRadioModule,
    MatAutocompleteModule, MatSelectModule],
  providers: [SearchCitiesPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
