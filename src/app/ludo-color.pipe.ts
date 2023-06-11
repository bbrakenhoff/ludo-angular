import { Pipe, PipeTransform } from '@angular/core';
import { LudoColor } from './models/ludo-color';

@Pipe({
  name: 'ludoColor',
})
export class LudoColorPipe implements PipeTransform {
  transform(color: LudoColor, type: 'bg' | 'text' | 'border'): string {
    return `${type}-${this.mapLudoColorToTailwindColor(color)}`;
  }

  private mapLudoColorToTailwindColor(color: LudoColor) {
    switch (color) {
      case 'blue':
        return 'blue-700';
      case 'green':
        return 'green-600';
      case 'red':
        return 'pink-500';
      case 'yellow':
        return 'yellow-400';
    }
  }
}
