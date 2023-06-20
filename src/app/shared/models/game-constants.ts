import { InjectionToken } from '@angular/core';
import { Dice } from './dice';
import { AllColors } from './ludo-color';
import { Pawn } from './pawn';
import { Player } from './player';

export const NUMBER_OF_PLAYERS = 4;
export const NUMBER_OF_PAWNS_PER_PLAYER = 4;
export const NUMBER_OF_NORMAL_SQUARES = 9;

export const DICE = new InjectionToken<Dice>('dice', {
  factory: () => new Dice(),
});
export const PLAYERS = new InjectionToken<Player[]>('players', {
  factory: () => {
    return AllColors.map((color, colorIndex) => {
      const pawns: Pawn[] = [];
      for (let i = 0; i < NUMBER_OF_PAWNS_PER_PLAYER; i++) {
        pawns.push(new Pawn(color));
      }

      return new Player(`Player ${colorIndex + 1}`, pawns);
    });
  },
});
