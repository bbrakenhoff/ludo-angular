import { TestBed } from '@angular/core/testing';

import { PlayersService } from './players.service';
import {
  NUMBER_OF_NORMAL_SQUARES,
  NUMBER_OF_PAWNS_PER_PLAYER,
} from './models/game-constants';

describe('PlayersService', () => {
  let service: PlayersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayersService);
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
