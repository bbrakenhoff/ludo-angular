import { Component, Inject } from '@angular/core';
import { FirstPlayerService } from './first-player.service';
import { Player } from '../models/player';
import { Observable, combineLatest, merge } from 'rxjs';
import { PLAYERS } from '../models/game-constants';

@Component({
  selector: 'app-first-player',
  templateUrl: './first-player.component.html',
  styleUrls: ['./first-player.component.scss'],
})
export class FirstPlayerComponent {
  public readonly latestDiceRolls$ = combineLatest(
    this.players.map((player) => player.latestDiceRoll$)
  );
  public readonly currentPlayerIndex$ =
    this.firstPlayerService.currentPlayerIndex$;
  public readonly firstPlayerIndex$: Observable<number>;

  public constructor(
    @Inject(PLAYERS) private readonly players: Player[],
    private readonly firstPlayerService: FirstPlayerService
  ) {
    this.firstPlayerIndex$ = firstPlayerService.firstPlayerIndex$;
  }

  public currentPlayerRollDice(): void {
    this.firstPlayerService.currentPlayerRollDice();
  }
}
