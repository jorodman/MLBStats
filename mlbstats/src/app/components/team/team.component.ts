import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit, OnDestroy {

  season!: string;
  id!: string;
  roster!: any[];
  subscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) { }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const season = this.route.snapshot.paramMap.get('season');

    if(id && season)
    {
      this.id = id;
      this.season = season;
      this.fetchTeamData();
    }
  }

  fetchTeamData(): void {
    this.subscription = this.api.getTeamRoster(this.id, this.season).subscribe((resp) => {
      this.roster = resp.roster_team_alltime.queryResults.row;
    });
  }

}
