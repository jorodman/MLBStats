import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-playerstats',
  templateUrl: './playerstats.component.html',
  styleUrls: ['./playerstats.component.css']
})
export class PlayerstatsComponent implements OnInit {

  @Input() cols!: any[];
  @Input() stats!: any[];

  constructor() {
   }

  ngOnInit(): void {
    // this.stats = this.stats?.sort((seasonOne, seasonTwo) => Number(seasonOne.season) > Number(seasonTwo.season) ? 1 : -1);

    // for(const season of this.stats)
    // {
    //   console.log(season.season);
    // }
  }

}
