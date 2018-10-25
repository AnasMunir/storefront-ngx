import { Component, OnInit, Input } from '@angular/core';
import { NguCarouselConfig } from '@ngu/carousel';
import { IBanner } from '../../store/models/banner.model';

@Component({
  selector: 'fishry-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  @Input() banner: IBanner[] = [];

  carouselOne: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
    slide: 1,
    speed: 400,
    // interval: 4000,
    point: {
      visible: true
    },
    load: 2,
    touch: true,
    loop: true,
    custom: 'banner'
  }
  constructor() { }

  ngOnInit() {
  }

}