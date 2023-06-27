import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const isPeselValid = (abstractControl: AbstractControl): ValidationErrors | null => {
  const weight = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];

  let sum = 0;
  const value = (abstractControl.value as string).toString(); // FIXME:
  const controlNumber = parseInt(value.substring(10, 11));

  for (let i = 0; i < weight.length; i++) {
    sum += parseInt(value.substring(i, i + 1)) * weight[i];
  }
  sum = sum % 10;
  return (10 - sum) % 10 === controlNumber ? null : { isPeselValid: 'Invalid Pesel' };
};

export const oneContactFilled = (secondInputName: 'email' | 'phoneNumber'): ValidatorFn => {
  return (abstractControl: AbstractControl<string>): ValidationErrors | null => {
    const control = abstractControl;
    const secondControl = abstractControl.root.get('contactData.' + secondInputName);

    return control.value || secondControl?.value ? null : { oneContactFilled: 'atLeastOneContantFieldRequired' };
  };
};
