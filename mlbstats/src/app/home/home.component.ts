import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
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
                label:'Standings',
                routerLink: ['/standings']
            },
            {
                label:'Stats',
                routerLink: ['/stats']
            },
        ];
  }

}
