import { NgModule } from '@angular/core';
import { FishryComponent } from './fishry.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule, MatButtonModule } from "@angular/material";
import { NguCarouselModule } from '@ngu/carousel';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { FishryService } from './fishry.service';
import { FishryImageComponent } from './components/fishry-image/fishry-image.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { NavComponent } from './components/nav/nav.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    NguCarouselModule
  ],
  declarations: [FishryComponent, FishryImageComponent, CarouselComponent, NavComponent],
  exports: [FishryComponent, FishryImageComponent, CarouselComponent, NavComponent]
})
export class FishryModule {
  domain: string;
  static forRoot(domain: string): ModuleWithProviders {
    return {
      ngModule: FishryModule,
      providers: [
        FishryService,
        {
          provide: 'domain',
          useValue: domain
        }
      ]
    }
  }
}
