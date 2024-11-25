import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DraftComponent } from './draft/draft.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { LoginComponent } from './shared/dialogs/login/login.component';
import { SignUpComponent } from './shared/dialogs/sign-up/sign-up.component';

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
  },
  {
    path: 'user',
    component: ScoreboardComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
