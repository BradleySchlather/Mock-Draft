import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DraftComponent } from './draft/draft.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },

  {
    path: 'draft',
    component: DraftComponent
  },

  {
    path: 'player-list',
    component: PlayerListComponent
  },
  {
    path: 'scoreboard',
    component: ScoreboardComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
