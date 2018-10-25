import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import { FishryStore } from 'projects/fishry/src/lib/store/fishry.store';
import { FishryStore } from "fishry";

@Component({
  selector: 'fishry-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  mainMenu: any[] = [];
  mainMenuSec: any[] = [];
  themeSettings: any;
  @Output() toggleSideNav = new EventEmitter();
  constructor(public store: FishryStore) { }

  ngOnInit() {
    let state = this.store.state;
    console.log('state in header', state);
    let navigation = state.navigation;
    let themeSettings = state.themeSettings;
    this.themeSettings = themeSettings;
    this.mainMenu = JSON.parse(navigation['main-menu']['link_list']);
    this.mainMenuSec = JSON.parse(navigation['main-menu-sec']['link_list'])
  }

  toggleNav(position: string): void {
    this.toggleSideNav.emit({ position: position });
  }
}
