import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { first} from 'rxjs/operators';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  hitterFilter: string = "hr";
  pitcherFilter: string = "w";
  season: string = "2022";
  years: number[] = [];
  hitters!: any[];
  pitchers!: any[];
  hittingcols!: any[];
  pitchingcols!: any[];
  loadingHittingStats: boolean = true;
  loadingPitchingStats: boolean = true;


  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {

    this.hittingcols = [
      { field: 'name_display_first_last', header: 'Name'},
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
      { field: 'name_display_first_last', header: 'Name'},
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

    const currYear = new Date().getFullYear();

    for(let i = currYear; i > 1900; i--)
    {
      this.years.push(i);
    }

    this.update();
  }

  update(): void {

    if(this.hitterFilter)
    {
      this.loadingHittingStats = true;
      this.api.getHittingLeaders(this.season, this.hitterFilter, '20').pipe(first()).subscribe((data) => {
        this.hitters = data.leader_hitting_repeater.leader_hitting_mux.queryResults.row;
        this.loadingHittingStats = false;
      },
      () => {
        this.loadingHittingStats = false;
      })
    }
    if(this.pitcherFilter)
    {
      this.loadingPitchingStats = true;
      this.api.getPitchingLeaders(this.season, this.pitcherFilter, '20').pipe(first()).subscribe((data) => {
        this.pitchers = data.leader_pitching_repeater.leader_pitching_mux.queryResults.row;
        this.loadingPitchingStats = false;
      },
      () => {
        this.loadingPitchingStats = false;
      });
    }
  }

  seasonChange(season: any): void {
    this.update();
  }

  setHitterFilter(evt: any): void {
    if (evt && evt.sortField)
    {
      this.hitterFilter = evt.sortField;
      this.update();
    }
  }

  setPitcherFilter(evt: any): void {
    this.pitcherFilter = evt.field;
    this.update();
  }

}
