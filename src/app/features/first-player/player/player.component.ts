import { Component, Input } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Player } from 'src/app/shared/models/player';

@Component({
  selector: 'app-player[player][isCurrentPlayer]',
  templateUrl: './player.component.html'
})
export class PlayerComponent {
  private _player!: Player;

  public get player(): Player {
    return this._player;
  }

  @Input()
  public set player(value: Player) {
    this._player = value;
    this.latestDiceRoll$ = this._player.latestDiceRoll$.pipe(
      map((latestDiceRoll) => (latestDiceRoll > 0 ? `${latestDiceRoll}` : '-'))
    );
  }

  @Input()
  public isCurrentPlayer = false;

  public latestDiceRoll$!: Observable<string>;
}
