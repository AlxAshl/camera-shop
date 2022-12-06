import { renderWithProviders } from '../../../../test/utils/render-with-redux';
import { LevelBlock } from './level-block';


test('Render Level', () => {
  const { asFragment } = renderWithProviders(<LevelBlock />);
  expect(asFragment()).toMatchSnapshot();
});
