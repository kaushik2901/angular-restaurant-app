import { WithFixedFloatPipe } from './with-fixed-float.pipe';

describe('WithFixedFloatPipe', () => {
  it('create an instance', () => {
    const pipe = new WithFixedFloatPipe();
    expect(pipe).toBeTruthy();
  });
});
