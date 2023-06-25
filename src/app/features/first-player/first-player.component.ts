import { Component, Inject } from '@angular/core';
import { Observable, delay, map, merge, tap } from 'rxjs';
import { PLAYERS } from '../../shared/models/game-constants';
import { Player } from '../../shared/models/player';
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
    this.firstPlayerService.firstPlayerIndex$.pipe(delay(500));

  public constructor(
    @Inject(PLAYERS) public readonly players: Player[],
    private readonly firstPlayerService: FirstPlayerService
  ) {}

  public currentPlayerRollDice(): void {
    this.firstPlayerService.currentPlayerRollDice();
  }

  public onAlertButtonClick(): void {
    console.log(
      `%c🍟🍔🍕 first-player.component.ts[ln:33] onAlertButtonClick()`,
      'color: deeppink'
    );
  }
}
