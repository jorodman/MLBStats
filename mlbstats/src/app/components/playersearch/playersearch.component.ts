import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { ApiService } from '@services/api.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-playersearch',
  templateUrl: './playersearch.component.html',
  styleUrls: ['./playersearch.component.css']
})
export class PlayersearchComponent implements OnInit {

  players!: any[];
  searchval!: string;
  searching!: boolean;
  cols!: any;
  activeOnly!: boolean;

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.searchval = "";
    this.searching = false;
    this.activeOnly = true;
    
    this.cols = [
      { field: 'name_display_first_last', header: 'Name'},
      { field: 'position', header: 'Position'},
      { field: 'team_full', header: 'Team'},
    ];
  }

  search(): void {

    console.log(this.searchval)

    if(this.searchval === "")
    {
      return;
    }

    this.searching = true;

    this.players = [];

    const apiCalls = this.activeOnly 
    ? [this.api.searchForPlayers(this.searchval, this.activeOnly)] 
    : [this.api.searchForPlayers(this.searchval, this.activeOnly), this.api.searchForPlayers(this.searchval, !this.activeOnly)]

    forkJoin(apiCalls).pipe(first()).subscribe((data) => {
      for(const list of data)
      {
        let rows = list.search_player_all.queryResults.row;

        if(rows)
        {
          const players = Array.isArray(rows) ? rows : [rows];
          this.players = this.players.concat(players);
        }
      }
    },
    (error) => {
      this.searching = false;
    },
    () => {
      this.searching = false;
    });
  }

  filter(evt: any): void { }

}
