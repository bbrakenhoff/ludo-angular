import { BehaviorSubject } from 'rxjs';
import { Dice } from './dice';
import { Player } from './player';
import { createDiceSpy } from './dice.spy';
import { DiceSpy } from './dice.spy';

export type PlayerSpy = {
  player: Player;
  latestDiceRoll$$: BehaviorSubject<number>;
  rollDice: jasmine.Spy<(dice: Dice) => void>;
};

export function createPlayerMock(): PlayerSpy {
  const latestDiceRoll$$ = new BehaviorSubject<number>(-1);
  const player = jasmine.createSpyObj<Player>('Player', ['rollDice'], {
    latestDiceRoll$: latestDiceRoll$$,
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
