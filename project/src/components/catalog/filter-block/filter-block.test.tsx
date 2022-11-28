import { renderWithProviders } from '../../../test/utils/render-with-redux';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import FilterBlock from './filter-block';

const mockDispatch = jest.fn();
jest.mock('../../../hooks/useAppDispatch', () => ({
  useAppDispatch: () => mockDispatch
}));

describe('FilterBlock component', () => {
  test('dispatches a cleanup action on reset button press', async () => {
    renderWithProviders(<FilterBlock/>);
    const resetButton = screen.getByTestId('reset-button-test');
    fireEvent.click(resetButton);
    await (waitFor(() => expect(mockDispatch).toHaveBeenCalledTimes(1),{timeout:500}));
  });
});
