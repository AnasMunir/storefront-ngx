import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
// import { FishryModule } from 'projects/fishry/src/public_api';
import { FishryModule } from 'fishry';
import { MatSidenavModule } from '@angular/material';
import { LAYOUTCOMPONENTS } from './layout';
import { HomeComponent } from './home/home.component';

const MATCOMPONENTS: any[] = [
	MatSidenavModule
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
		...LAYOUTCOMPONENTS
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    FishryModule.forRoot('crimson.stgfishry.com'),
    AppRoutingModule,
    HttpModule,
    ...MATCOMPONENTS
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
