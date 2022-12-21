import { fireEvent, screen } from '@testing-library/react';
import { basketProductMock } from '../../../test/test-mocks';
import { renderWithProviders } from '../../../test/utils/render-with-redux';
import BasketProduct from './basket-product';

const mockDispatch = jest.fn();
jest.mock('../../../hooks/useAppDispatch', () => ({
  useAppDispatch: () => mockDispatch
}));

describe('BasketProduct component', () => {
  test('BasketProduct renders correctly', () => {
    renderWithProviders(<BasketProduct basketProduct={basketProductMock}/>, );
    const cameraDescription = screen.getByText('Look Identify');
    const vendorCode = screen.getByText('LD2000');
    const cameraLevel = screen.getByText('Любительский уровень');
    const cameraCount = screen.getByTestId('count-input-test');
    expect(cameraDescription).toBeInTheDocument();
    expect(vendorCode).toBeInTheDocument();
    expect(cameraLevel).toBeInTheDocument();
    expect(cameraCount).toHaveValue(1);
  });
  test('BasketProduct buttons works correctly', () => {
    renderWithProviders(<BasketProduct basketProduct={basketProductMock}/>, );
    const decreaseButton = screen.getByTestId('button-decrease-test');
    const increaseButton = screen.getByTestId('button-increase-test');
    const removeItemButton = screen.getByTestId('remove-item-button-test');
    fireEvent.click(increaseButton);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    fireEvent.click(decreaseButton);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    fireEvent.click(removeItemButton);
    expect(mockDispatch).toHaveBeenCalledTimes(3);
  });
  test('BasketProduct back button disables based on productcount', () => {
    renderWithProviders(<BasketProduct basketProduct={basketProductMock}/>, );
    const decreaseButton = screen.getByTestId('button-decrease-test');
    expect(decreaseButton).toBeDisabled();

  });
  test('BasketProduct forward button disables based on productcount', () => {
    renderWithProviders(<BasketProduct basketProduct={{...basketProductMock, quantity: 99}}/>, );
    const increaseButton = screen.getByTestId('button-increase-test');
    expect(increaseButton).toBeDisabled();
  });
});
