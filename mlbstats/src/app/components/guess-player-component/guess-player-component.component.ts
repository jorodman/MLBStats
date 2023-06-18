import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@services/api.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-guess-player-component',
  templateUrl: './guess-player-component.component.html',
  styleUrls: ['./guess-player-component.component.css']
})
export class GuessPlayerComponentComponent implements OnInit {

  player_id!: string;
  details!: any;
  stats!: any[];
  isHitter!: boolean;
  imgSrc!: string;
  playerRevealed!: boolean;

  hittingcols!: any;
  pitchingcols!: any;

  readonly minSeasons = 10;

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

    this.resetPlayerStats();
  }


  ngOnInit(): void {
    this.getRandomPlayer();
  }

  resetPlayerStats(): void {
    this.stats = [];
  }

  revealPlayer(): void {
    this.playerRevealed = !this.playerRevealed;
  }

  newPlayer(): void {
    this.playerRevealed = false;
    this.resetPlayerStats();
    this.getRandomPlayer();
  }

  getRandomPlayer(): void {
    const minSeason = 2000;
    const maxSeason = new Date().getFullYear();
    const randomSeason = Math.floor(Math.random() * (maxSeason - minSeason + 1)) + minSeason;


    this.api.getTeams(String(randomSeason)).pipe(first()).subscribe((resp) => {
      const teams = resp.team_all_season.queryResults.row;
      const randomTeamIndex = Math.floor(Math.random() * (teams.length - 1));
      const team = teams[randomTeamIndex];
      const randomTeamId = team.team_id;

      this.api.getTeamRoster(randomTeamId, String(randomSeason)).pipe(first()).subscribe((rosterResp) => {
        const players = rosterResp.roster_team_alltime.queryResults.row;
        const player = players[Math.floor(Math.random() * (players.length - 1))];
        this.player_id = player.player_id;
        this.fetchPlayerInfo();
      });

    });
  }

  fetchPlayerInfo(): void {
    this.api.getPlayerDetails(this.player_id).pipe(first()).subscribe((resp) => {
      this.details = resp.player_info.queryResults.row;
      console.log(this.details)

      const lowercase = this.details.team_abbrev.toLowerCase();
      this.imgSrc = `assets/${lowercase}.png`;

      const debut = new Date(this.details.pro_debut_date).getFullYear();
      this.isHitter = this.details.primary_stat_type === "hitting";
      this.fetchPlayerStats(debut, this.isHitter);

    });
  }

  addToStats(season: any): void {
    this.stats.push(season);
  }

  sortStats(): void {
    this.stats = this.stats.sort((a, b) => Number(b.season) - Number(a.season));
  }

  fetchPlayerStats(firstYear: number, isHitter: boolean): void {

    const curr_year = Number(new Date().getFullYear());

    const numSeasons = curr_year - firstYear + 1;

    if(numSeasons >= this.minSeasons)
    {

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
                    this.addToStats(row);
                    this.sortStats()
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
                    this.addToStats(row);
                    this.sortStats()
                  }
                }
              });
          }
      }
    }
    else {
      this.newPlayer();
    }


  }

}
