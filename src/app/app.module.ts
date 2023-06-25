import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirstPlayerModule } from './features/first-player/first-player.module';
import { GameComponent } from './features/game/game.component';

@NgModule({
  declarations: [AppComponent, GameComponent],
  imports: [AppRoutingModule, FirstPlayerModule, BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
