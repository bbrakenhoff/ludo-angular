import { Injectable } from '@angular/core';
import { AllColors, LudoColor } from './shared/models/ludo-color';
import { Player } from './shared/models/player';
import { Pawn } from './shared/models/pawn';
import { NUMBER_OF_PAWNS_PER_PLAYER } from './shared/models/game-constants';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  public readonly players = AllColors.map(
    (color, i) =>
      new Player(`Player ${i + 1}`, this.createPawnsForPlayer(color))
  );

  private createPawnsForPlayer(color: LudoColor): Pawn[] {
    return Array.from(
      { length: NUMBER_OF_PAWNS_PER_PLAYER },
      (v, i) => new Pawn(color)
    );
  }
}
