import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { Dice } from '../../shared/models/dice';
import { FirstPlayerComponent } from './first-player.component';
import { FirstPlayerService } from './first-player.service';
import { PlayerComponent } from './player/player.component';

@NgModule({
  imports: [CommonModule, RouterModule, ComponentsModule, PipesModule],
  declarations: [FirstPlayerComponent, PlayerComponent],
  exports: [FirstPlayerComponent],
  providers: [
    { provide: Dice, useFactory: () => new Dice() },
    FirstPlayerService,
  ],
})
export class FirstPlayerModule {}
