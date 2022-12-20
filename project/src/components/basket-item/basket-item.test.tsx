import { screen } from '@testing-library/react';
import { productMock } from '../../test/test-mocks';
import { renderWithProviders } from '../../test/utils/render-with-redux';
import BasketItem from './basket-item';

describe('BasketItem component', () => {
  test('BasketItem renders correctly', () => {
    renderWithProviders(<BasketItem camera={productMock}/>, );
    const cameraDescription = screen.getByText('Look Identify');
    const vendorCode = screen.getByText('LD2000');
    const cameraLevel = screen.getByText('Любительский уровень');
    expect(cameraDescription).toBeInTheDocument();
    expect(vendorCode).toBeInTheDocument();
    expect(cameraLevel).toBeInTheDocument();
  });
});
