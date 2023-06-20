import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FirstPlayerComponent } from './first-player.component';
import { Dice } from '../../shared/models/dice';
import { FirstPlayerService } from './first-player.service';
import { CommonModule } from '@angular/common';
import { LudoColorPipe } from '../../shared/pipes/ludo-color.pipe';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { StatusMessageComponent } from './status-message/status-message.component';
import { PlayerComponent } from './player/player.component';

@NgModule({
  imports: [CommonModule, PipesModule],
  declarations: [FirstPlayerComponent, StatusMessageComponent, PlayerComponent],
  exports: [FirstPlayerComponent],
  providers: [
    { provide: Dice, useFactory: () => new Dice() },
    FirstPlayerService,
  ],
})
export class FirstPlayerModule {}
