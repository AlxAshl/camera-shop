import { renderWithProviders } from '../../../../test/utils/render-with-redux';
import { CategoryBlock } from './category-block';

test('Render Category', () => {
  const { asFragment } = renderWithProviders(<CategoryBlock />);
  expect(asFragment()).toMatchSnapshot();
});
