import { ShowAddressPipe } from './show-address.pipe';

describe('ShowAddressPipe', () => {
  it('create an instance', () => {
    const pipe = new ShowAddressPipe();
    expect(pipe).toBeTruthy();
  });
});
