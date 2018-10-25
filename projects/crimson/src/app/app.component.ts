import { Component } from '@angular/core';
import { FishryService } from 'fishry';
// import { FishryService } from 'projects/fishry/src/public_api';

@Component({
  selector: 'fishry-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crimson';

  constructor(public fishryService: FishryService) {

  }

  ngOnInit() {

  }
}
