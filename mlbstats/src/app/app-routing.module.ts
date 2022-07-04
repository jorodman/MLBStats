import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlayerComponent } from './player/player.component';
import { StandingsComponent } from './standings/standings.component';
import { StatsComponent } from './stats/stats.component';
import { TeamComponent } from './team/team.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'player/:id', component: PlayerComponent},
  {path: 'team/:id/:season', component: TeamComponent},
  {path: 'standings', component: StandingsComponent},
  {path: 'stats', component: StatsComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  // {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
