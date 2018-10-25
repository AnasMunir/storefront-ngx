import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'fishry-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @Input() menuItems: any[];
  constructor() { }

  ngOnInit() {
  }

  listExists(item): boolean {
    if (item.list && item.list.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  listEmpty(item): boolean {
    if (item.list && item.list.length == 0) {
      return true;
    } else {
      return false;
    }
  }

}
