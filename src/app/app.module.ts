import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FirstPlayerModule } from './first-player/first-player.module';
import { LudoColorPipe } from './ludo-color.pipe';

@NgModule({
  declarations: [AppComponent],
  imports: [FirstPlayerModule, BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
