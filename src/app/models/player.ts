import { BehaviorSubject } from 'rxjs';
import { Dice } from './dice';
import { Pawn } from './pawn';

export class Player {
  private readonly latestDiceRoll$$ = new BehaviorSubject<number>(-1);
  public readonly latestDiceRoll$ = this.latestDiceRoll$$.asObservable();

  public constructor(readonly pawns: Pawn[] = []) {}

  public rollDice(dice: Dice) {
    this.latestDiceRoll$$.next(dice.roll());
  }
}
