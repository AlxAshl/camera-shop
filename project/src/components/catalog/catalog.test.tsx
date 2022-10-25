import { productsMock } from '../../test/test-mocks';
import { renderWithProviders } from '../../test/utils/render-with-redux';
import { screen } from '@testing-library/react';
import Catalog from './catalog';
import axios from 'axios';

// import { useAppDispatch } from '../../hooks';
// const spyDispatch = jest.fn();
// jest.mocked(useAppDispatch).mockReturnValue(spyDispatch);
// expect(spyDispatch).toHaveBeenCalledTimes(1);

describe('Catalog component', () => {
  beforeEach(() => {
    axios.get = jest.fn().mockResolvedValue({});
  });//пока ничего не дает
  test('renders products after fetching data and state change', async () => {
    renderWithProviders(<Catalog/>, {initialState: { PRODUCT: { products: productsMock, isProductsDataLoaded: true}}});
    const product = await screen.findAllByTestId('product-card-test');
    expect(product[0]).toBeInTheDocument();
  });
  // test('renders no products after fetching data and state change', async () => {
  //   renderWithReduxAndRouter(<Catalog/>, {initialState: { PRODUCT: { products: productsMock, isProductsDataLoaded: true}}});
  //   const product = await screen.findAllByTestId('product-card-test');
  //   expect(product[3]).toBeInTheDocument();
  // });
});


