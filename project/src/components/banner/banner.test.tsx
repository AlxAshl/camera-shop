import Banner from './banner';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils/render-with-redux';
import {bannerMock} from '../../test/test-mocks';
import { AppRoute } from '../../const';

describe('Banner rendering', () => {
  test('renders correct title', () => {
    renderWithProviders(<Banner promo={bannerMock}/>);
    const title = screen.getByTestId('banner-test-title');
    expect(title).toHaveTextContent('Look 54');
  });
  test('renders correct link', () => {
    renderWithProviders(<Banner promo={bannerMock}/>);
    const link = screen.getByTestId('banner-test-link');
    expect(link).toHaveAttribute('href', `${AppRoute.Product}/${bannerMock.id}`);
  });
});
