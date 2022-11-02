import { mockFormFinished, mockFormUnfinished } from '../../test/test-mocks';
import { validateForm } from './validate-form';
import {validateInput} from './validate-input';

jest.mock('./validate-input');

describe('formValidation function', () => {
  test('should return true', () => {
    const result = validateForm(mockFormFinished);
    expect(result).toBeTruthy();
  });
  test('should return false, and call validateInput function for input class change', () => {
    jest.fn(validateInput);
    const result = validateForm(mockFormUnfinished);
    expect(result).toBeFalsy();
    expect(validateInput).toBeCalledTimes(2);
  });
});

