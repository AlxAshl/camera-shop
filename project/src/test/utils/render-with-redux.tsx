import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { api } from '../../store/store';
import { MemoryRouter } from 'react-router-dom';
import { rootReducer } from '../../store/root-reducer';
import { configureStore } from '@reduxjs/toolkit';

const createReduxStore = (initialState = {}) => (
  configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: api,
        },
      })
  })
);


export const renderWithProviders = (component: ReactNode, options?: {initialState?: {[key: string]: unknown}; route?: string }) => {
  const store = createReduxStore(options?.initialState);
  return render (
    <Provider store={store}>
      <MemoryRouter initialEntries={[options?.route || '/']}>
        {component}
      </MemoryRouter>
    </Provider>
  );
};

//-----------------------------------------------------------------------

// jest.mock('axios', () => ({
//   create: jest.fn(() => ({
//     get: jest.fn(),
//     interceptors: {
//       request: { use: jest.fn(), eject: jest.fn() },
//       response: { use: jest.fn(), eject: jest.fn() }
//     }
//   }))
// }));
// jest.mock('axios', () => ({
//   create: jest.fn(() => ({
//     get: jest.fn(),
//     interceptors: {
//       request: { use: jest.fn(), eject: jest.fn() },
//       response: { use: jest.fn(), eject: jest.fn() }
//     }
//   }))
// }));

// describe('Catalog component', () => {
//   beforeEach(() => {
//     axios.get = jest.fn().mockResolvedValue({
//       PRODUCT: {
//         products: productsMock,
//         isProductsDataLoaded: true
//       }
//     });
//   });
//   test('renders correct title', () => {
//     renderWithReduxAndRouter(<Catalog/>);
// setTimeout(()=> {
//   const productCards = screen.getAllByTestId('product-card-test');
//   expect(productCards).toHaveLength(4);
// },1000);
//   });
// });

//---------------------------------------------------------------------------------
