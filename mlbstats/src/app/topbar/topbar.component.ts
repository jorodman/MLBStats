import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { first } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  items!: MenuItem[];
  fastcastUrl!: string;

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.items = [
            {
                label:'Home',
                routerLink: ['/home'],
            },
            // {
            //     label:'Teams',
            //     routerLink: ['/standings']
            // },
            {
                label:'Sortable Stats',
                routerLink: ['/stats']
            },
        ];

      this.api.getFastcastUrl().pipe(first()).subscribe((url: string) => {
        console.log(url)
        this.fastcastUrl = url;
      });
  }
}
