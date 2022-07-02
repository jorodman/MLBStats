import { Component, OnInit } from '@angular/core';
import { first, pipe } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit {

  teams!: any[];
  cols!: any[];
  division: string = "NLW";

  constructor(
    private api: ApiService
    ) { }

  ngOnInit(): void {
    this.cols = [
            { field: 'name', header: this.division },
            { field: 'wins', header: 'W' },
            { field: 'losses', header: 'L' },
        ];

    this.api.getTeams('2022').pipe(first()).subscribe((teamlist) => 
      this.teams = teamlist.filter((team: any) => team.division_abbrev === this.division) 
    );
  }

}
