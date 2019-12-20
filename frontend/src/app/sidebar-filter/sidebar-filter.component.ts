import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-sidebar-filter',
  templateUrl: './sidebar-filter.component.html',
  styleUrls: ['./sidebar-filter.component.css']
})
export class SidebarFilterComponent {

  isCollapsed = false;

  drawerToggle(){
    this.isCollapsed = !this.isCollapsed;
  }

 /*  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    ); */



  constructor(private breakpointObserver: BreakpointObserver,
              private route: ActivatedRoute) {}
  city: string;

  ngOnInit() {
    this.city = this.route.snapshot.paramMap.get('city');
  }
}
