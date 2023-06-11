import { Observer } from 'rxjs';
import { Dice } from './dice';
import { Player } from './player';
import { createObserverSpy } from '../observer-spy';
import { Pawn } from './pawn';

describe('Player', () => {
  let diceSpy: jasmine.SpyObj<Dice>;

  let player: Player;

  beforeEach(() => {
    diceSpy = jasmine.createSpyObj<Dice>('Dice', ['roll']);
    player = new Player([new Pawn('blue')]);
  });

  describe('pawnColor', () =>{
    it('should return the color of the player\'s pawns', () =>{
      expect(player.pawnColor).toEqual('blue')
    })
  })

  describe('rollDice(dice)', () => {
    it('should remember the last dice value rolled', () => {
      const observerSpy = createObserverSpy<number>();

      player.latestDiceRoll$.subscribe(observerSpy.observer);
      diceSpy.roll.and.returnValue(6);

      player.rollDice(diceSpy);

      expect(observerSpy.next.calls.count()).toBe(2);
      expect(observerSpy.next.calls.first().args[0]).toBe(-1);
      expect(observerSpy.next.calls.mostRecent().args[0]).toBe(6);
    });
  });
});
