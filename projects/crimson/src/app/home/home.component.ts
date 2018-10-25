import { Component, OnInit } from '@angular/core';
import { FishryStore, IBanner } from 'fishry';

@Component({
  selector: 'fishry-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  mainMenu: any[] = [];
  themeSettings: any;
  constructor(public store: FishryStore) { }

  ngOnInit() {
    let state = this.store.state;
    let navigation = state.navigation;
    let themeSettings = state.themeSettings;
    this.themeSettings = themeSettings;
    console.log('navigation', navigation);
    console.log('themeSettings', themeSettings);
    this.mainMenu = JSON.parse(navigation['main-menu']['link_list']);
  }

  desktopBanners(): IBanner[] {
    let themeSettings = this.store.state.themeSettings;
    let desktopBanners: IBanner[] = themeSettings.mainBanner
      .map((_, i) => {
        let banner = {
          image: `${'https://fishry-image.azureedge.net/' + 'themes/'}${themeSettings.mainBanner[i]['desktop']}`,
          link: themeSettings.mainBanner[i].link
        }
        return banner;
      });
    return desktopBanners;
  }
  mobileBanners(): IBanner[] {
    let themeSettings = this.store.state.themeSettings;
    let mobileBanners: IBanner[] = themeSettings.mainBanner
      .map((_, i) => {
        let banner = {
          image: `${'https://fishry-image.azureedge.net/' + 'themes/'}${themeSettings.mainBanner[i]['mobile']}`,
          link: themeSettings.mainBanner[i].link
        }
        return banner;
      });
    return mobileBanners;
  }

  secondaryDesktopBanners(): IBanner[] {
    let secondaryBanner = Object.keys(this.themeSettings.secondaryBanner).map(i => this.themeSettings.secondaryBanner[i])
    let desktopBanners: IBanner[] = secondaryBanner
      .map((_, i) => {
        let banner = {
          image: `${'https://fishry-image.azureedge.net/' + 'themes/'}${secondaryBanner[i]['desktop']}`,
          link: secondaryBanner[i].link
        }
        return banner;
      });
    return desktopBanners;
  }

  secondaryMobileBanners(): IBanner[] {
    let secondaryBanner = Object.keys(this.themeSettings.secondaryBanner).map(i => this.themeSettings.secondaryBanner[i])
    let desktopBanners: IBanner[] = secondaryBanner
      .map((_, i) => {
        let banner = {
          image: `${'https://fishry-image.azureedge.net/' + 'themes/'}${secondaryBanner[i]['mobile']}`,
          link: secondaryBanner[i].link
        }
        return banner;
      });
    return desktopBanners;
  }

  async getData() {
    let nav = await this.store.select('navigation');
    console.log('nav', nav)
    let themeSettings = await this.store.select('themeSettings');
    console.log('themeSettings', themeSettings);
  }

  openLink(link) {
    window.open(`${link}`, "_blank");
  }
}
