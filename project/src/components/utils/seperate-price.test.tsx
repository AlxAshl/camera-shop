import {seperatePrice} from './seperate-price';

describe('seperatePrice function', () => {
  test('should seperate price, if its length is more then 3 digits', () =>{
    const price: string = seperatePrice(12345);
    expect(price).toBe('12 345');
  });
});
