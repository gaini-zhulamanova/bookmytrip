import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { SidebarFilterComponent } from './sidebar-filter/sidebar-filter.component';

const routes: Routes = [
  {path: "", redirectTo: "/book-my-trip", pathMatch: "full"},
  {path: "book-my-trip", component: HomepageComponent},
  {path: "book-my-trip/:city/restaurants", component: SidebarFilterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
