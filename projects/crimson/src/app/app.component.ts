import { Component, ViewChild } from '@angular/core';
import { FishryService, FishryStore } from 'fishry';
import { MatSidenav } from '@angular/material';
// import { FishryService } from 'projects/fishry/src/public_api';

@Component({
  selector: 'fishry-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  position: string = 'end';
  @ViewChild(MatSidenav) sidenav: MatSidenav;
  constructor(
    /* public fishryService: FishryService,
    public store: FishryStore */
    ) {

  }

  ngOnInit() {

  }

  toggleSideNav(event) {
    // this.sideNavContent$ = 'nav';
    this.position = event.position;
    this.sidenav.position = event.position;
    this.sidenav.mode = 'push';
    this.sidenav.toggle();
  }
}
