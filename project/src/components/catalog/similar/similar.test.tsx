import Similar from './similar';
import { productMock } from '../../../test/test-mocks';
import { renderWithProviders } from '../../../test/utils/render-with-redux';
import axios from 'axios';


jest.mock('axios', () => ({
  create: jest.fn(() => ({
    store: {
      getState: jest.fn(() => ({})),
      dispatch: jest.fn(),
    },
    get: jest.fn(),
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() }
    },
  }))
}));

describe('Similar component', () => {
  // beforeEach(() => {
  //   useSelectorMock.mockClear();
  //   useDispatchMock.mockClear();
  // });

  // afterAll(() => {
  //   cleanup();
  // });
  // const reactRedux = { useAppDispatch, useAppSelector };
  // const useDispatchMock = jest.spyOn(reactRedux, 'useAppDispatch');
  // const useSelectorMock = jest.spyOn(reactRedux, 'useAppSelector');
  test('Characteristics tab is active on initial render', () => {
    renderWithProviders(<Similar camera={productMock}/>, );
    expect(axios.get).toBeCalled();
  });
  // test('Changes tabs on click', () => {
  //   //
  // });
});
