import { LudoColorPipe } from './ludo-color.pipe';
describe('LudoColorPipe', () => {
  let pipe: LudoColorPipe;

  beforeEach(() => {
    pipe = new LudoColorPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('transform(ludoColor,type)', () => {
    it('should return the right class for background color', () => {
      expect(pipe.transform('blue', 'bg')).toEqual('bg-blue-700');
      expect(pipe.transform('green', 'bg')).toEqual('bg-green-600');
      expect(pipe.transform('red', 'bg')).toEqual('bg-pink-500');
      expect(pipe.transform('yellow', 'bg')).toEqual('bg-yellow-400');
    });

    it('should return the right class for text color', () => {
      expect(pipe.transform('blue', 'text')).toEqual('text-blue-700');
      expect(pipe.transform('green', 'text')).toEqual('text-green-600');
      expect(pipe.transform('red', 'text')).toEqual('text-pink-500');
      expect(pipe.transform('yellow', 'text')).toEqual('text-yellow-400');
    });

    it('should return the right class for border color', () => {
      expect(pipe.transform('blue', 'border')).toEqual('border-blue-700');
      expect(pipe.transform('green', 'border')).toEqual('border-green-600');
      expect(pipe.transform('red', 'border')).toEqual('border-pink-500');
      expect(pipe.transform('yellow', 'border')).toEqual('border-yellow-400');
    });
  });
});
