import { TestBed } from '@angular/core/testing';
import { Dice } from '../models/dice';
import { DiceSpy, createDiceSpy } from '../models/dice.spy';
import { NUMBER_OF_PLAYERS } from '../models/game-constants';
import {
  PlayerSpy,
  createPlayerMock as createPlayerSpy,
} from '../models/player.spy';
import { ObserverSpy, createObserverSpy } from '../observer-spy';
import { FirstPlayerService } from './first-player.service';

describe('FirstPlayerDeterminer', () => {
  let service: FirstPlayerService;

  let playerSpies: PlayerSpy[];
  let diceSpy: DiceSpy;
  let firstPlayerIndexObserverSpy: ObserverSpy<number>;

  beforeEach(() => {
    firstPlayerIndexObserverSpy = createObserverSpy<number>();
    playerSpies = [];

    for (let i = 0; i < NUMBER_OF_PLAYERS; i++) {
      playerSpies.push(createPlayerSpy());
    }

    diceSpy = createDiceSpy();

    TestBed.configureTestingModule({
      providers: [{ provide: Dice, useValue: diceSpy }, FirstPlayerService],
    });
    service = TestBed.inject(FirstPlayerService);
    service.setPlayers(playerSpies.map((spy) => spy.player));

    service.firstPlayerIndex$.subscribe(firstPlayerIndexObserverSpy.observer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('currentPlayerRollDice()', () => {
    it('should let current player roll the dice', () => {
      service.currentPlayerRollDice();
      expect(playerSpies[0].rollDice).toHaveBeenCalledWith(diceSpy);
    });

    it('should change the current player', () => {
      service.currentPlayerRollDice();
      expect(playerSpies[0].rollDice).toHaveBeenCalledWith(diceSpy);

      service.currentPlayerRollDice();
      expect(playerSpies[1].rollDice).toHaveBeenCalledWith(diceSpy);

      service.currentPlayerRollDice();
      expect(playerSpies[2].rollDice).toHaveBeenCalledWith(diceSpy);

      service.currentPlayerRollDice();
      expect(playerSpies[3].rollDice).toHaveBeenCalledWith(diceSpy);

      service.currentPlayerRollDice();
      expect(playerSpies[0].rollDice).toHaveBeenCalledWith(diceSpy);
      expect(playerSpies[0].rollDice).toHaveBeenCalledTimes(2);
    });
  });

  describe('findFirstPlayerIndex()', () => {
    it('should return false when not all players have rolled the dice', () => {
      service.currentPlayerRollDice();
      playerSpies[0].latestDiceRoll$$.next(1);
      service.currentPlayerRollDice();
      playerSpies[1].latestDiceRoll$$.next(2);
      service.currentPlayerRollDice();
      playerSpies[2].latestDiceRoll$$.next(3);

      expect(firstPlayerIndexObserverSpy.next).not.toHaveBeenCalled();
    });

    it('should return -1 when 2 or more players have the highest dice roll', () => {
      service.currentPlayerRollDice();
      playerSpies[0].latestDiceRoll$$.next(3);
      service.currentPlayerRollDice();
      playerSpies[1].latestDiceRoll$$.next(2);
      service.currentPlayerRollDice();
      playerSpies[2].latestDiceRoll$$.next(3);
      service.currentPlayerRollDice();
      playerSpies[3].latestDiceRoll$$.next(1);

      expect(firstPlayerIndexObserverSpy.next).not.toHaveBeenCalled();
    });

    it('should return the index of player with highest dice roll', () => {
      service.currentPlayerRollDice();
      playerSpies[0].latestDiceRoll$$.next(3);
      service.currentPlayerRollDice();
      playerSpies[1].latestDiceRoll$$.next(2);
      service.currentPlayerRollDice();
      playerSpies[2].latestDiceRoll$$.next(4);
      service.currentPlayerRollDice();
      playerSpies[3].latestDiceRoll$$.next(1);

      expect(firstPlayerIndexObserverSpy.next.calls.mostRecent().args[0]).toBe(
        2
      );
      expect(firstPlayerIndexObserverSpy.complete).toHaveBeenCalled();
    });

    it('should return the index of the player with highest dice roll after highest dice roll exists multiple times', () => {
      service.currentPlayerRollDice();
      playerSpies[0].latestDiceRoll$$.next(3);
      service.currentPlayerRollDice();
      playerSpies[1].latestDiceRoll$$.next(2);
      service.currentPlayerRollDice();
      playerSpies[2].latestDiceRoll$$.next(3);
      service.currentPlayerRollDice();
      playerSpies[3].latestDiceRoll$$.next(1);

      service.currentPlayerRollDice();
      playerSpies[0].latestDiceRoll$$.next(3);
      service.currentPlayerRollDice();
      playerSpies[1].latestDiceRoll$$.next(2);
      service.currentPlayerRollDice();
      playerSpies[2].latestDiceRoll$$.next(4);
      service.currentPlayerRollDice();
      playerSpies[3].latestDiceRoll$$.next(6);

      expect(firstPlayerIndexObserverSpy.next).toHaveBeenCalledOnceWith(3);
      expect(firstPlayerIndexObserverSpy.complete).toHaveBeenCalled();
    });
  });
});
