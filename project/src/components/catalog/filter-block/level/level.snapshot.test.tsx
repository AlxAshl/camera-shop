import { renderWithProviders } from '../../../../test/utils/render-with-redux';
import { Level } from './level';


test('Render Level', () => {
  const { asFragment } = renderWithProviders(<Level />);
  expect(asFragment()).toMatchSnapshot();
});
