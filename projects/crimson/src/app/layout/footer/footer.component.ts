import { Component, OnInit } from '@angular/core';
// import { FishryStore } from 'projects/fishry/src/lib/store/fishry.store';
import { FishryStore } from 'fishry';

@Component({
  selector: 'fishry-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  themeSettings: any;
  footerMenu: any[] = [];
  constructor(public store: FishryStore) { }

  ngOnInit() {
    let state = this.store.state;
    let navigation = state.navigation;
    let themeSettings = state.themeSettings;
    this.themeSettings = themeSettings;
    this.footerMenu = JSON.parse(navigation['footer']['link_list']);
  }

  openLink(link) {
    window.open(`${link}`, "_blank");
  }
}
