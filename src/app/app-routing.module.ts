import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FirstPlayerComponent } from './features/first-player/first-player.component';
import { GameComponent } from './features/game/game.component';

const routes: Routes = [
  {
    path: 'determine-first-player',
    component: FirstPlayerComponent,
    pathMatch: 'full',
  },
  { path: 'game', component: GameComponent, pathMatch: 'full' },
  { path: '', redirectTo: 'determine-first-player', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
