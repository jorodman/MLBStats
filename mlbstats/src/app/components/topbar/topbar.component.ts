import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { first } from 'rxjs/operators';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  items!: MenuItem[];
  fastcastUrl: string = "";

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.items = [
            {
                label:'Player Search',
                routerLink: ['/playersearch']
            },
            {
                label:'Sortable Stats',
                routerLink: ['/stats']
            },
            {
                label:'Red Sox',
                routerLink: ['/redsox'],
            },
        ];

    this.api.getFastcastUrl().pipe(first()).subscribe((url: string) => {
      this.fastcastUrl = url;
    });
  }
}
