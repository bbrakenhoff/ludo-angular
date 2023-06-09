import { Board } from './board';
import {
  NUMBER_OF_NORMAL_SQUARES,
  NUMBER_OF_PAWNS_PER_PLAYER,
} from './game-constants';
import { AllColors, LudoColor } from './ludo-color';
import { Square, SquareType } from './square';

function testSquaresColor(squares: Map<LudoColor, Square[]>): boolean {
  return AllColors.map((color) =>
    Array.from(squares.get(color)!).every((square) => square.color === color)
  ).every((colorsCorrectlySet) => colorsCorrectlySet);
}

function testSquareNumberOfSquares(
  expectedNumberOfSquares: number,
  squares: Map<LudoColor, Square[]>
): boolean {
  return AllColors.map(
    (color) => squares.get(color)?.length === expectedNumberOfSquares
  ).every((correctNumberOfSquaresSet) => correctNumberOfSquaresSet);
}

function testSquareType(
  expectedSquareType: SquareType,
  squares: Map<LudoColor, Square[]>
): boolean {
  return AllColors.map((color) =>
    Array.from(squares.get(color)!).every(
      (square) => square.squareType === expectedSquareType
    )
  ).every((typeCorrectlySet) => typeCorrectlySet);
}

describe('Board', () => {
  let board: Board;

  beforeEach(() => {
    board = new Board();
  });

  it('should create base squares for each color', () => {
    expect(board.baseSquares.size).toBe(AllColors.length);
    expect(testSquaresColor(board.baseSquares)).toBeTrue();
    expect(
      testSquareNumberOfSquares(NUMBER_OF_PAWNS_PER_PLAYER, board.baseSquares)
    ).toBeTrue();
    expect(testSquareType('base', board.baseSquares)).toBeTrue();
  });

  it('should create home squares for each color', () => {
    expect(board.homeSquares.size).toBe(AllColors.length);
    expect(testSquaresColor(board.homeSquares)).toBeTrue();
    expect(
      testSquareNumberOfSquares(NUMBER_OF_PAWNS_PER_PLAYER, board.homeSquares)
    ).toBeTrue();
    expect(testSquareType('home', board.homeSquares)).toBeTrue();
  });

  it('should create a start square for each color', () => {
    expect(board.startSquares.size).toBe(AllColors.length);
    expect(Array.from(board.startSquares.keys())).toEqual(AllColors);

    const startSquares = Array.from(board.startSquares.values());
    expect(startSquares.every((square) => square.squareType === 'start'));
    expect(startSquares.map((square) => square.color)).toEqual(AllColors);
  });

  it('should create normal squares for each color', () => {
    expect(board.normalSquares.size).toBe(AllColors.length);
    expect(testSquaresColor(board.normalSquares)).toBeTrue();
    expect(
      testSquareNumberOfSquares(NUMBER_OF_NORMAL_SQUARES, board.normalSquares)
    ).toBeTrue();
    expect(testSquareType('normal', board.normalSquares)).toBeTrue();
  });
});
