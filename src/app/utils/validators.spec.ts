import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { isPeselValid, oneContactFilled } from './validators';

describe('Validators', () => {
  it('isPeselValid should return null when PESEL is valid', () => {
    const control = new FormControl('93718964377', isPeselValid);
    const result = isPeselValid(control);
    expect(result).toBeNull();
  });

  it('isPeselValid should return error when PESEL is invalid', () => {
    const control = new FormControl('93718964378');
    const result = isPeselValid(control);

    expect(result).toEqual({ isPeselValid: 'Invalid Pesel' });
  });

  it('oneContactFilled should return null when one contact is filled', () => {
    const formGroup = new FormGroup({
      email: new FormControl(''),
      phoneNumber: new FormControl('603541699'),
    });

    const validatorFn = oneContactFilled('email');
    const result = validatorFn(formGroup);

    expect(result).toBeNull();
  });
});
