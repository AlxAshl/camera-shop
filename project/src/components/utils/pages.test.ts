import { getPagesCount, getNumeric } from './pages';

describe('getPagesCount function', () => {
  test('should output total pages count for all the products listed', () => {
    const count: number = getPagesCount(85);
    expect(count).toBe(10);
  });
});

describe('getNumeric function', () => {
  test('should extract number value from pathname(pathname correct spelling is checked at main-page.tsx )', () => {
    const pageNumber: number = getNumeric('page_01');
    expect(pageNumber).toBe(1);
  });
  test('should extract number value from pathname', () => {
    const pageNumber: number = getNumeric('page_a1');
    expect(pageNumber).toBe(1);
  });
});
