import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';
import { NUMBER_OF_PAWNS_PER_PLAYER } from './shared/models/game-constants';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should give each player pawns', () => {
    expect(
      service.players
        .map((player) => player.pawns.length === NUMBER_OF_PAWNS_PER_PLAYER)
        .every((allPawnsCreated) => allPawnsCreated)
    ).toBeTrue();
  });
});
