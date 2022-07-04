import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  id!: string;
  details!: any;
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

    if(id)
    {
      this.id = id;
      this.fetchPlayerDetails();
    }
  }

  fetchPlayerDetails(): void {
    this.subscription = this.api.getPlayerDetails(this.id).subscribe((resp) => {
      this.details = resp.player_info.queryResults.row;
      console.log(this.details);
    });
  }

}
