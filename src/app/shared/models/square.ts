import { LudoColor } from './ludo-color';
import { Pawn } from './pawn';

export type SquareType = 'base' | 'home' | 'normal' | 'start';
export const AllSquareTypes: SquareType[] = ['base', 'home', 'normal', 'start'];

export type Square = {
  readonly squareType: SquareType;
  readonly color: LudoColor;
  pawn?: Pawn;
};