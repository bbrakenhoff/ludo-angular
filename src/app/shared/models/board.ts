import { NUMBER_OF_NORMAL_SQUARES } from './game-constants';
import { AllColors, LudoColor } from './ludo-color';
import { Square } from './square';

export class Board {
  public readonly baseSquares: Map<LudoColor, Square[]> = new Map();
  public readonly homeSquares: Map<LudoColor, Square[]> = new Map();
  public readonly startSquares: Map<LudoColor, Square> = new Map();
  public readonly normalSquares: Map<LudoColor, Square[]> = new Map();

  public constructor() {
    this.createSquares();
  }

  private createSquares() {
    this.createBaseSquares();
    this.createStartSquares();
    this.createHomeSquares();
    this.createNormalSquares();
  }

  private createBaseSquares(): void {
    AllColors.forEach((color) => {
      this.baseSquares.set(color, [
        { squareType: 'base', color },
        { squareType: 'base', color },
        { squareType: 'base', color },
        { squareType: 'base', color },
      ]);
    });
  }

  private createStartSquares(): void {
    AllColors.forEach((color) => {
      this.startSquares.set(color, { squareType: 'start', color });
    });
  }

  private createHomeSquares(): void {
    AllColors.forEach((color) => {
      this.homeSquares.set(color, [
        { squareType: 'home', color },
        { squareType: 'home', color },
        { squareType: 'home', color },
        { squareType: 'home', color },
      ]);
    });
  }

  private createNormalSquares(): void {
    AllColors.forEach((color) => {
      const normalSquares: Square[] = [];
      for (let i = 0; i < NUMBER_OF_NORMAL_SQUARES; i++) {
        normalSquares.push({ squareType: 'normal', color });
      }

      this.normalSquares.set(color, normalSquares);
    });
  }
}
