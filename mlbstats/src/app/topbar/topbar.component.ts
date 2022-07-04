import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  items!: MenuItem[];

  constructor() { }

  ngOnInit(): void {
    this.items = [
            {
                label:'Home',
                routerLink: ['/home'],
                icon:'pi pi-fw pi-home'
            },
            {
                label:'Teams',
                routerLink: ['/standings']
            },
            {
                label:'Sortable Stats',
                routerLink: ['/stats']
            },
        ];
  }
}
