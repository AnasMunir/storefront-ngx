import { Component, OnInit, Input, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'fishry-image',
  templateUrl: './fishry-image.component.html',
  styleUrls: ['./fishry-image.component.scss']
})
export class FishryImageComponent implements OnInit {
  @Input() src: string = '';
  @Input() route: string = 'product';
  @Input() size: string = '';
  @Input() enableLazyLoad: boolean = true;

  @ViewChild('img') img: ElementRef;
  highRes: HTMLImageElement;
  highResReady: boolean = false;
  // cdn: string = environment.cdn;
  cdn: string = 'https://fishry-image.azureedge.net/';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.highRes = new Image();
      this.activeLoad();

      if (this.enableLazyLoad) {
        this.lazyLoad();
      }
    }
  }

  activeLoad() {
    this.img.nativeElement.onerror = () => {
      if (this.src) {
        this.img.nativeElement.src = `${this.cdn}${this.route}/${this.src}`;
      } else {
        this.img.nativeElement.onerror = null;
      }
    };

    if (this.src) {
      if (this.enableLazyLoad && this.size !== 'xxxs') {
        // If lazy loading is enabled, return xxs.
        this.img.nativeElement.src = `${this.cdn}${this.route}/${this.src}/xxs`;
      } else if (this.size) {
        // If lazy loading is disabled, and size is mentioned, return size.
        this.img.nativeElement.src = `${this.cdn}${this.route}/${this.src}/${this.size}`;
      } else {
        // If lazy loading is disabled and size is not mentioned, return full size.
        this.img.nativeElement.src = `${this.cdn}${this.route}/${this.src}`;
      }
    }
  }

  lazyLoad() {
    if (this.size === '') {
      this.highRes.src = `${this.cdn}${this.route}/${this.src}`;
    } else {
      this.highRes.src = `${this.cdn}${this.route}/${this.src}/${this.size}`;
    }

    this.highRes.onload = () => {
      this.highResReady = true;
      this.img.nativeElement.src = this.highRes.src;
    };

    if (this.size) {
      this.highRes.onerror = () => {
        this.img.nativeElement.src = `${this.cdn}${this.route}/${this.src}`;
        this.highRes.onerror = null;
      };
    }
  }

  ngAfterViewInit() {
    this.img.nativeElement.onload = () => {
      if (!this.highResReady) {
        this.img.nativeElement.classList.add('loaded');
      } else {
        this.img.nativeElement.classList.remove('blur-in');
      }
    };
    // if (this.platformService.platformBrowser()) {
    // }
  }

}
