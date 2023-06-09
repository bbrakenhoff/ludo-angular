import { Dice } from "./dice";

export type DiceSpy = { dice: Dice; roll: jasmine.Spy<() => number> };
export function createDiceSpy(): DiceSpy {
  const dice = new Dice();
  return { dice, roll: spyOn(dice, 'roll') };
}
