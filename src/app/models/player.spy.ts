import { BehaviorSubject } from 'rxjs';
import { Dice } from './dice';
import { Player } from './player';

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

  return {
    player,
    latestDiceRoll$$,
    rollDice: player.rollDice,
  };
}
