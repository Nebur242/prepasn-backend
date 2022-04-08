import { sharedGuards } from './shared-guards';

describe('sharedGuards', () => {
  it('should work', () => {
    expect(sharedGuards()).toEqual('shared-guards');
  });
});
