import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  filter,
  map,
  take,
  tap,
} from 'rxjs';
import { Dice } from '../models/dice';
import { Player } from '../models/player';

@Injectable()
export class FirstPlayerService {
  private players!: Player[];

  public setPlayers(players: Player[]): void {
    this.players = players;

    const latestDiceRolls$ = combineLatest(
      this.players.map((player) => player.latestDiceRoll$)
    );

    this.firstPlayerIndex$ = latestDiceRolls$.pipe(
      filter(
        (latestDiceRolls) =>
          this.allPlayersRolledDice(latestDiceRolls) &&
          this.highestDiceRollOnlyOnce(latestDiceRolls)
      ),
      map((latestDiceRolls) =>
        latestDiceRolls.indexOf(this.findHighestDiceRoll(latestDiceRolls))
      ),
      tap(() => this.currentPlayerIndex$$.complete()),
      take(1) // complete after first player index found
    );
  }

  private readonly currentPlayerIndex$$ = new BehaviorSubject(0);
  public readonly currentPlayerIndex$ =
    this.currentPlayerIndex$$.asObservable();
  public firstPlayerIndex$!: Observable<number>;

  public constructor(private readonly dice: Dice) {}

  public currentPlayerRollDice(): void {
    this.players[this.currentPlayerIndex$$.value].rollDice(this.dice);
    this.nextPlayer();
  }

  private nextPlayer(): void {
    let nextPlayerIndex = this.currentPlayerIndex$$.value + 1;

    if (nextPlayerIndex === this.players.length) {
      nextPlayerIndex = 0;
    }

    this.currentPlayerIndex$$.next(nextPlayerIndex);
  }

  private allPlayersRolledDice(latestDiceRolls: number[]): boolean {
    return (
      this.currentPlayerIndex$$.value === 0 &&
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
