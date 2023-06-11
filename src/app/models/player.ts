import { BehaviorSubject } from 'rxjs';
import { Dice } from './dice';
import { Pawn } from './pawn';
import { LudoColor } from './ludo-color';

export class Player {
  private readonly latestDiceRoll$$ = new BehaviorSubject<number>(-1);
  public readonly latestDiceRoll$ = this.latestDiceRoll$$.asObservable();

  public constructor(readonly pawns: readonly Pawn[] = []) {}

  public get pawnColor(): LudoColor {
    return this.pawns[0].color;
  }

  public rollDice(dice: Dice) {
    this.latestDiceRoll$$.next(dice.roll());
  }
}
