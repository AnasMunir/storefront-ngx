import { OnInit } from '@angular/core';
import { NguCarouselConfig } from '@ngu/carousel';
import { IBanner } from '../../store/models/banner.model';
export declare class CarouselComponent implements OnInit {
    banner: IBanner[];
    carouselOne: NguCarouselConfig;
    constructor();
    ngOnInit(): void;
}
