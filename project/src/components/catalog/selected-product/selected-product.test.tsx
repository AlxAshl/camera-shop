import { renderWithProviders } from '../../../test/utils/render-with-redux';
import { fireEvent, screen } from '@testing-library/react';
import SelectedProduct from './selected-product';
import { crumbsMock } from '../../../test/test-mocks';

describe('Selected-product component', () => {
  test('Characteristics tab is active on initial render', () => {
    renderWithProviders(<SelectedProduct camera={crumbsMock}/>);
    expect(screen.getByText('Описание')).toHaveClass('tabs__control is-active');
    expect(screen.getByText('Характеристики')).toHaveClass('tabs__control');
  });
  test('Changes tabs on click', () => {
    renderWithProviders(<SelectedProduct camera={crumbsMock}/>);
    expect(screen.getByText('Описание')).toHaveClass('tabs__control is-active');
    expect(screen.getByText('Характеристики')).toHaveClass('tabs__control');
    fireEvent.click(screen.getByTestId('characteristics-button-test'));
    expect(screen.getByText('Описание')).toHaveClass('tabs__control');
    expect(screen.getByText('Характеристики')).toHaveClass('tabs__control is-active');

  });
});
