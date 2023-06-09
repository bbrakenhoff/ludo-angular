import { Component } from '@angular/core';
import { FirstPlayerService } from './first-player.service';
import { Player } from '../models/player';
import { Observable, combineLatest, merge } from 'rxjs';

@Component({
  selector: 'app-first-player',
  templateUrl: './first-player.component.html',
  styleUrls: ['./first-player.component.scss'],
})
export class FirstPlayerComponent {
  private readonly players = [
    new Player([]),
    new Player([]),
    new Player([]),
    new Player([]),
  ];

  public readonly latestDiceRolls$ = combineLatest(
    this.players.map((player) => player.latestDiceRoll$)
  );
  public readonly currentPlayerIndex$ =
    this.firstPlayerService.currentPlayerIndex$;
  public readonly firstPlayerIndex$: Observable<number>;

  public constructor(private readonly firstPlayerService: FirstPlayerService) {
    this.firstPlayerService.setPlayers(this.players);
    this.firstPlayerIndex$ = firstPlayerService.firstPlayerIndex$;
  }

  public currentPlayerRollDice(): void {
    this.firstPlayerService.currentPlayerRollDice();
  }
}
