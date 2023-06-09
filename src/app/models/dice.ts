export class Dice {
  public roll(): number {
    return Math.floor(Math.random() * 5) + 1;
  }
}
