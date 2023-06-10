import { Injectable } from '@angular/core';
import { AllColors, LudoColor } from './models/ludo-color';
import { Player } from './models/player';
import { Pawn } from './models/pawn';
import { NUMBER_OF_PAWNS_PER_PLAYER } from './models/game-constants';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  public readonly players = AllColors.map(
    (color) => new Player(this.createPawnsForPlayer(color))
  );
  

  private createPawnsForPlayer(color: LudoColor): Pawn[] {
    return Array.from(
      { length: NUMBER_OF_PAWNS_PER_PLAYER },
      (v, i) => new Pawn(color)
    );
  }
}
