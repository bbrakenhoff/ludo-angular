import { BehaviorSubject } from 'rxjs';
import { Dice } from './dice';
import { Player } from './player';
import { createDiceSpy } from './dice.spy';
import { DiceSpy } from './dice.spy';
import { LudoColor } from './ludo-color';

export type PlayerSpy = {
  player: Player;
  latestDiceRoll$$: BehaviorSubject<number>;
  rollDice: jasmine.Spy<(dice: Dice) => void>;
};

export function createPlayerSpy(pawnColor: LudoColor = 'blue'): PlayerSpy {
  const latestDiceRoll$$ = new BehaviorSubject<number>(-1);
  const player = jasmine.createSpyObj<Player>('Player', ['rollDice'], {
    latestDiceRoll$: latestDiceRoll$$,
    pawnColor,
  });

  player.rollDice.and.callFake((dice) => {
    latestDiceRoll$$.next(dice.roll());
  });

  return {
    player,
    latestDiceRoll$$,
    rollDice: player.rollDice,
  };
}
