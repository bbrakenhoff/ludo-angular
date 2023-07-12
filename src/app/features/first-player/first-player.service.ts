import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, filter, map, take, tap } from 'rxjs';
import { Dice } from '../../shared/models/dice';
import { DICE, PLAYERS } from '../../shared/models/game-constants';
import { Player } from '../../shared/models/player';

@Injectable()
export class FirstPlayerService {
  private readonly currentPlayerIndex$$ = new BehaviorSubject(0);
  public readonly currentPlayerIndex$ =
    this.currentPlayerIndex$$.asObservable();

  private readonly latestDiceRolls$ = combineLatest(
    this.players.map((player) => player.latestDiceRoll$)
  );

  public readonly firstPlayerIndex$ = this.latestDiceRolls$.pipe(
    filter((latestDiceRolls) => this.allPlayersRolledDice(latestDiceRolls)),
    filter((latestDiceRolls) => this.highestDiceRollOnlyOnce(latestDiceRolls)),
    map((latestDiceRolls) =>
      latestDiceRolls.indexOf(this.findHighestDiceRoll(latestDiceRolls))
    ),
    // complete after first player index found
    tap((i) => this.currentPlayerIndex$$.complete()),
    take(1)
  );

  public constructor(
    @Inject(DICE) private readonly dice: Dice,
    @Inject(PLAYERS) private readonly players: Player[]
  ) {}

  public currentPlayerRollDice(): void {
    this.players[this.currentPlayerIndex$$.value].rollDice(this.dice);
    this.currentPlayerIndex$$.next(this.getNextPlayerIndex());
  }

  private getNextPlayerIndex(): number {
    let nextPlayerIndex = this.currentPlayerIndex$$.value + 1;

    if (nextPlayerIndex === this.players.length) {
      nextPlayerIndex = 0;
    }

    return nextPlayerIndex;
  }

  private allPlayersRolledDice(latestDiceRolls: number[]): boolean {
    return (
      this.currentPlayerIndex$$.value === this.players.length - 1 &&
      latestDiceRolls.every((diceRoll) => diceRoll > 0)
    );
  }

  private findHighestDiceRoll(latestDiceRolls: number[]): number {
    return Math.max(...latestDiceRolls);
  }

  private highestDiceRollOnlyOnce(latestDiceRolls: number[]): boolean {
    const highestDiceRoll = this.findHighestDiceRoll(latestDiceRolls);
    return (
      latestDiceRolls.filter((diceRoll) => diceRoll === highestDiceRoll)
        .length === 1
    );
  }
}
