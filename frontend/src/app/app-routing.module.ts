import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { SidebarFilterComponent } from './sidebar-filter/sidebar-filter.component';
import { EntryItemComponent } from './entry-item/entry-item.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  {path: "", redirectTo: "/book-my-trip", pathMatch: "full"},
  {path: "book-my-trip", component: HomepageComponent},
  {path: "book-my-trip/:city/:entries", component: SidebarFilterComponent},
  {path: "book-my-trip/:city/:entries/:id", component: EntryItemComponent},
  {path: "book-my-trip/:city/:entries/:id/bewertungen/neu", component: FormComponent},
  {path: "book-my-trip/:city/:entries/:id/bewertungen/:reviewId/editieren", component: FormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
