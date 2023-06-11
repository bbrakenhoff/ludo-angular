import { NgModule } from '@angular/core';
import { LudoColorPipe } from './ludo-color.pipe';

@NgModule({
  declarations: [LudoColorPipe],
  exports: [LudoColorPipe],
})
export class PipesModule {}
