import { fireEvent, screen } from '@testing-library/react';
import { basketProductsMock } from '../../test/test-mocks';
import { renderWithProviders } from '../../test/utils/render-with-redux';
import BasketSummary from './basket-summary';

const mockDispatch = jest.fn();
jest.mock('../../hooks/useAppDispatch', () => ({
  useAppDispatch: () => mockDispatch
}));

describe('BasketSummary component', () => {
  test('BasketSummary renders correctly', () => {
    renderWithProviders(<BasketSummary />, {initialState: { BASKET: { basketProducts: basketProductsMock}, PRODUCT: {products: basketProductsMock}}});
    const sumValue = screen.getByTestId('sum-test');
    const discountValue = screen.getByTestId('discount-test');
    const sumWithDiscountValue = screen.getByTestId('sumdiscounted-test');
    expect(sumValue).toHaveTextContent('158 000');
    expect(discountValue).toHaveClass('basket__summary-value');
    expect(sumWithDiscountValue).toHaveTextContent('158 000');
  });
  test('BasketSummary renders correctly with discount', () => {
    renderWithProviders(<BasketSummary />, {initialState: { BASKET: { basketProducts: basketProductsMock, couponDiscount: 15}, PRODUCT: {products: basketProductsMock}}});
    const sumValue = screen.getByTestId('sum-test');
    const discountValue = screen.getByTestId('discount-test');
    const sumWithDiscountValue = screen.getByTestId('sumdiscounted-test');
    expect(sumValue).toHaveTextContent('158 000');
    expect(discountValue).toHaveTextContent('23 700');
    expect(discountValue).toHaveClass('basket__summary-value--bonus');
    expect(sumWithDiscountValue).toHaveTextContent('134 300');
  });
  test('Truthy validation works correctly', () => {
    renderWithProviders(<BasketSummary />, {initialState: { BASKET: { basketProducts: basketProductsMock, couponDiscount: 15}, PRODUCT: {products: basketProductsMock}}});
    const sendButton = screen.getByTestId('send-coupon-test');
    const inputField = screen.getByTestId('coupon-field-test');
    const sumWithDiscountValue = screen.getByTestId('input-class-test');
    fireEvent.change(inputField, { target: { value: 'camera-333' } });
    fireEvent.click(sendButton);
    expect(sumWithDiscountValue).toHaveClass('custom-input is-valid');
    expect(mockDispatch).toBeCalledTimes(1);
  });
  test('Falsy validation works correctly', () => {
    renderWithProviders(<BasketSummary />, {initialState: { BASKET: { basketProducts: basketProductsMock, couponDiscount: 15}, PRODUCT: {products: basketProductsMock}}});
    const sendButton = screen.getByTestId('send-coupon-test');
    const inputField = screen.getByTestId('coupon-field-test');
    const sumWithDiscountValue = screen.getByTestId('input-class-test');
    fireEvent.change(inputField, { target: { value: 'camera-332' } });
    fireEvent.click(sendButton);
    expect(sumWithDiscountValue).toHaveClass('custom-input is-invalid');
    expect(mockDispatch).toBeCalledTimes(0);
  });

});
