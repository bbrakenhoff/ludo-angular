import { Component, Inject } from '@angular/core';
import { Observable, map, merge, tap } from 'rxjs';
import { PLAYERS } from '../models/game-constants';
import { Player } from '../models/player';
import { FirstPlayerService } from './first-player.service';

@Component({
  selector: 'app-first-player',
  templateUrl: './first-player.component.html',
})
export class FirstPlayerComponent {
  public readonly latestDiceRoll$ = merge(
    ...this.players.map((player) => player.latestDiceRoll$)
  ).pipe(
    map((latestDiceRoll) => (latestDiceRoll > 0 ? `${latestDiceRoll}` : '-'))
  );

  public readonly currentPlayerIndex$ =
    this.firstPlayerService.currentPlayerIndex$;
  public readonly firstPlayerIndex$ =
    this.firstPlayerService.firstPlayerIndex$.pipe(
      tap((v) =>
        console.log(
          `%c🍟🍔🍕 first-player.component.ts[ln:20] first player index`,
          'color: deeppink',
          v
        )
      )
    );

  public constructor(
    @Inject(PLAYERS) public readonly players: Player[],
    private readonly firstPlayerService: FirstPlayerService
  ) {}

  public currentPlayerRollDice(): void {
    this.firstPlayerService.currentPlayerRollDice();
  }
}
