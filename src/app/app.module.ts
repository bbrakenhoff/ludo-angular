import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FirstPlayerModule } from './features/first-player/first-player.module';
import { LudoColorPipe } from './shared/pipes/ludo-color.pipe';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [FirstPlayerModule, BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
