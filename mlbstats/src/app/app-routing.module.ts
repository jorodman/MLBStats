import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuessPlayerComponentComponent } from '@components/guess-player-component/guess-player-component.component';
import { PlayerComponent } from '@components/player/player.component';
import { PlayersearchComponent } from '@components/playersearch/playersearch.component';
import { StatsComponent } from '@components/stats/stats.component';

const routes: Routes = [
  {path: 'player/:id', component: PlayerComponent},
  {path: 'stats', component: StatsComponent},
  // {path: 'playersearch', component: PlayersearchComponent},
  {path: 'guessplayer', component: GuessPlayerComponentComponent},
  {path: '', redirectTo: 'guessplayer', pathMatch: 'full'},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
