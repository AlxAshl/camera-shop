import Similar from './similar';
import {crumbsMock, productsMock} from '../../../test/test-mocks';
import { renderWithProviders } from '../../../test/utils/render-with-redux';

// jest.mock('axios');
// beforeEach(() => {
//   axios.get = jest.fn().mockResolvedValue({});
// });
// jest.mock('axios');
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    // store: {
    //   getState: jest.fn(() => ({})),
    //   dispatch: jest.fn(),
    // },
    get: jest.fn(),
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() }
    },
  }))
}));

describe('Similar component', () => {

  test('Characteristics tab is active on initial render', () => {
    renderWithProviders(<Similar camera={crumbsMock}/>, { initialState: {
      PRODUCT: { products: productsMock }
    }});
    // expect(jest.mocked(axios).get).toHaveBeenCalledTimes(1);
  });
  // test('Changes tabs on click', () => {
  //   //
  // });
});
