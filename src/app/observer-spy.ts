import { Observer } from 'rxjs';

export type ObserverSpy<T> = {
  observer: Observer<T>;
  complete: jasmine.Spy<() => void>;
  next: jasmine.Spy<(value: T) => void>;
};

export function createObserverSpy<T>() {
  const observer: Observer<T> = {
    next: (value: T) => {
      // do nothing
    },
    complete: () => {
      // do nothing
    },
    error: (error) => {
      throw error;
    },
  };

  return {
    observer,
    next: spyOn(observer, 'next'),
    complete: spyOn(observer, 'complete'),
  };
}
