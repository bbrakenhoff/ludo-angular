import { TestBed } from '@angular/core/testing';
import { DiceSpy, createDiceSpy } from '../../shared/models/dice.spy';
import {
  DICE,
  NUMBER_OF_PLAYERS,
  PLAYERS,
} from '../../shared/models/game-constants';
import {
  PlayerSpy,
  createPlayerMock as createPlayerSpy,
} from '../../shared/models/player.spy';
import { ObserverSpy, createObserverSpy } from '../../observer-spy';
import { FirstPlayerService } from './first-player.service';
import { LudoColorPipe } from '../../shared/pipes/ludo-color.pipe';

fdescribe('FirstPlayerService', () => {
  let service: FirstPlayerService;

  let playerSpies: PlayerSpy[];
  let diceSpy: DiceSpy;
  let firstPlayerIndexObserverSpy: ObserverSpy<number>;
  let currentPlayerIndexObserver: ObserverSpy<number>;

  beforeEach(() => {
    firstPlayerIndexObserverSpy = createObserverSpy<number>();
    playerSpies = [];

    for (let i = 0; i < NUMBER_OF_PLAYERS; i++) {
      playerSpies.push(createPlayerSpy());
    }

    diceSpy = createDiceSpy();

    TestBed.configureTestingModule({
      providers: [
        FirstPlayerService,
        { provide: DICE, useValue: diceSpy.dice },
        { provide: PLAYERS, useValue: playerSpies.map((spy) => spy.player) },
      ],
    });
    service = TestBed.inject(FirstPlayerService);

    service.firstPlayerIndex$.subscribe(firstPlayerIndexObserverSpy.observer);

    currentPlayerIndexObserver = createObserverSpy();
    service.currentPlayerIndex$.subscribe(currentPlayerIndexObserver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('currentPlayerRollDice()', () => {
    it('should let current player roll the dice', () => {
      service.currentPlayerRollDice();

      expect(playerSpies[0].rollDice).toHaveBeenCalledWith(diceSpy.dice);
    });
  });

  describe('currentPlayerIndex$', () => {
    it('should change the current player when first player cannot be determined yet', () => {
      service.currentPlayerRollDice();
      expect(playerSpies[0].rollDice).toHaveBeenCalledOnceWith(diceSpy.dice);

      service.currentPlayerRollDice();
      expect(playerSpies[1].rollDice).toHaveBeenCalledOnceWith(diceSpy.dice);

      service.currentPlayerRollDice();
      expect(playerSpies[2].rollDice).toHaveBeenCalledOnceWith(diceSpy.dice);

      service.currentPlayerRollDice();
      expect(playerSpies[3].rollDice).toHaveBeenCalledOnceWith(diceSpy.dice);

      expect(currentPlayerIndexObserver.next.calls.count()).toBe(5);
      expect(
        currentPlayerIndexObserver.next.calls.allArgs().map((v) => v[0])
      ).toEqual([0, 1, 2, 3, 0]);
    });
  });

  describe('firstPlayerIndex$', () => {
    it('should not do anything when not all players have rolled the dice', () => {
      diceSpy.roll.and.returnValues(1, 2, 3);

      service.currentPlayerRollDice();
      service.currentPlayerRollDice();
      service.currentPlayerRollDice();

      expect(firstPlayerIndexObserverSpy.next).not.toHaveBeenCalled();
    });

    it('should not do anything when the highest dice roll has been rolled multiple times', () => {
      diceSpy.roll.and.returnValues(3, 2, 3, 1);

      service.currentPlayerRollDice();
      service.currentPlayerRollDice();
      service.currentPlayerRollDice();
      service.currentPlayerRollDice();

      expect(
        currentPlayerIndexObserver.next.calls.allArgs().map((v) => v[0])
      ).toEqual([0, 1, 2, 3, 0]);
      expect(firstPlayerIndexObserverSpy.next).not.toHaveBeenCalled();
    });

    it('should return the index of player with highest dice roll', () => {
      diceSpy.roll.and.returnValues(3, 2, 4, 1, 5);
      service.currentPlayerRollDice();
      service.currentPlayerRollDice();
      service.currentPlayerRollDice();
      service.currentPlayerRollDice();

      expect(diceSpy.roll).toHaveBeenCalledTimes(4);
      expect(playerSpies[0].rollDice).toHaveBeenCalledOnceWith(diceSpy.dice);
      expect(playerSpies[1].rollDice).toHaveBeenCalledOnceWith(diceSpy.dice);
      expect(playerSpies[2].rollDice).toHaveBeenCalledOnceWith(diceSpy.dice);
      expect(playerSpies[3].rollDice).toHaveBeenCalledOnceWith(diceSpy.dice);

      expect(
        currentPlayerIndexObserver.next.calls.allArgs().map((v) => v[0])
      ).toEqual([0, 1, 2, 3]);

      expect(firstPlayerIndexObserverSpy.next).toHaveBeenCalledWith(2);

      expect(currentPlayerIndexObserver.complete).toHaveBeenCalled();
      expect(firstPlayerIndexObserverSpy.complete).toHaveBeenCalled();
    });

    it('should return the index of the player with highest dice roll after highest dice roll exists multiple times', () => {
      diceSpy.roll.and.returnValues(3, 2, 3, 1, 4, 6, 3, 2);

      service.currentPlayerRollDice();
      service.currentPlayerRollDice();
      service.currentPlayerRollDice();
      service.currentPlayerRollDice();

      service.currentPlayerRollDice();
      service.currentPlayerRollDice();
      service.currentPlayerRollDice();
      service.currentPlayerRollDice();

      expect(
        currentPlayerIndexObserver.next.calls.allArgs().map((n) => n[0])
      ).toEqual([0, 1, 2, 3, 0, 1, 2, 3]);
      expect(firstPlayerIndexObserverSpy.next).toHaveBeenCalledOnceWith(1);
      expect(firstPlayerIndexObserverSpy.complete).toHaveBeenCalled();
      expect(currentPlayerIndexObserver.complete).toHaveBeenCalled();
    });
  });
});
