import { OnInit } from '@angular/core';
export declare class NavComponent implements OnInit {
    menuItems: any[];
    constructor();
    ngOnInit(): void;
    listExists(item: any): boolean;
    listEmpty(item: any): boolean;
}
