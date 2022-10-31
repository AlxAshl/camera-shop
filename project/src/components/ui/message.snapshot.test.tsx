import { messageMock } from '../../test/test-mocks';
import { renderWithProviders } from '../../test/utils/render-with-redux';
import Message from './message';

test('Message renders correctly', () => {
  const { asFragment } = renderWithProviders(<Message props={messageMock}/>);
  expect(asFragment()).toMatchSnapshot();
});
