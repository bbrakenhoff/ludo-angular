import { Injectable } from '@angular/core';
import { Observable, combineLatest, filter, map, take } from 'rxjs';
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
      take(1) // complete after first player index found
    );
  }

  private currentPlayerIndex = 0;
  public firstPlayerIndex$!: Observable<number>;

  public constructor(private readonly dice: Dice) {}

  public currentPlayerRollDice(): void {
    this.players[this.currentPlayerIndex].rollDice(this.dice);
    this.nextPlayer();
  }

  private nextPlayer(): void {
    this.currentPlayerIndex++;

    if (this.currentPlayerIndex === this.players.length) {
      this.currentPlayerIndex = 0;
    }
  }

  private allPlayersRolledDice(latestDiceRolls: number[]): boolean {
    return (
      this.currentPlayerIndex === 0 &&
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
