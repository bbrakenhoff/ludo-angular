import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FirstPlayerComponent } from './first-player.component';
import { Dice } from '../models/dice';
import { FirstPlayerService } from './first-player.service';

@NgModule({
  declarations: [FirstPlayerComponent],
  providers: [
    { provide: Dice, useFactory: () => new Dice() },
    FirstPlayerService,
  ],
})
export class FirstPlayerModule {}
