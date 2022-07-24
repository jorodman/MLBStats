import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  player_id!: string;
  details!: any;
  stats!: any[];
  isHitter!: boolean;
  imgSrc!: string;

  hittingcols!: any;
  pitchingcols!: any;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) { 
    
    this.hittingcols = [
      { field: 'season', header: 'Season'},
      { field: 'team_abbrev', header: 'Team'},
      { field: 'r', header: 'Runs'},
      { field: 'h', header: 'Hits'},
      { field: 'hr', header: 'HR'},
      { field: 'rbi', header: 'RBI'},
      { field: 'sb', header: 'SB'},
      { field: 'avg', header: 'AVG'},
      { field: 'obp', header: 'OBP'},
      { field: 'slg', header: 'SLG'},
      { field: 'ops', header: 'OPS'},
      { field: 'babip', header: 'BaBip'},
    ];

    this.pitchingcols = [
      { field: 'season', header: 'Season'},
      { field: 'team_abbrev', header: 'Team'},
      { field: 'w', header: 'Wins'},
      { field: 'l', header: 'Losses'},
      { field: 'era', header: 'ERA'},
      { field: 'g', header: 'G'},
      { field: 'gs', header: 'GS'},
      { field: 'ip', header: 'IP'},
      { field: 'er', header: 'ER'},
      { field: 'bb', header: 'BB'},
      { field: 'so', header: 'SO'},
      { field: 'whip', header: 'WHIP'},
    ];

    this.stats = [];
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if(id)
    {
      this.player_id = id;
      this.fetchPlayerInfo();
    }
  }

  fetchPlayerInfo(): void {
    this.api.getPlayerDetails(this.player_id).pipe(first()).subscribe((resp) => {
      this.details = resp.player_info.queryResults.row;

      const lowercase = this.details.team_abbrev.toLowerCase();
      this.imgSrc = `assets/${lowercase}.png`;

      const debut = new Date(this.details.pro_debut_date).getFullYear();
      this.isHitter = this.details.primary_stat_type === "hitting";
      this.fetchPlayerStats(debut, this.isHitter);

    });
  }

  fetchPlayerStats(firstYear: number, isHitter: boolean): void {

    const curr_year = Number(new Date().getFullYear());

    for(let year = curr_year; year >= firstYear; year--)
    {
        if(isHitter)
        {
            this.api.getPlayerHittingStats(this.player_id, String(year)).pipe(first()).subscribe((resp) => {
              let rows = resp.sport_hitting_tm.queryResults.row;
              if(rows)
              {
                // If the player played for multiple teams in a season the data is in an array
                // This line ensures that going forward, rows is an array
                rows = Array.isArray(rows) ? rows : [rows];

                for(const row of rows)
                {
                  this.stats.push(row);
                }
              }
            });
        }
        else
        {
            this.api.getPlayerPitchingStats(this.player_id, String(year)).pipe(first()).subscribe((resp) => {
              let rows = resp.sport_pitching_tm.queryResults.row;
              if(rows)
              {
                // If the player played for multiple teams in a season the data is in an array
                // This line ensures that going forward, rows is an array
                rows = Array.isArray(rows) ? rows : [rows];

                for(const row of rows)
                {
                  this.stats.push(row);
                }
              }
            });
        }
    }

  }


}
