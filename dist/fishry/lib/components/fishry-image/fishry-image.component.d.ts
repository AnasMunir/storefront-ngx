import { OnInit, ElementRef } from '@angular/core';
export declare class FishryImageComponent implements OnInit {
    private platformId;
    src: string;
    route: string;
    size: string;
    enableLazyLoad: boolean;
    img: ElementRef;
    highRes: HTMLImageElement;
    highResReady: boolean;
    cdn: string;
    constructor(platformId: Object);
    ngOnInit(): void;
    activeLoad(): void;
    lazyLoad(): void;
    ngAfterViewInit(): void;
}
