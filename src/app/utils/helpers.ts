import { ValidationErrors } from '@angular/forms';
import { TSort } from '../shared/models/filters';
import { IPatient } from '../shared/models/patient';

export const sortPatients: (patients: IPatient[], SortTypes: TSort) => IPatient[] = (patients, SortTypes) => {
  switch (SortTypes) {
    case 'FIRST_NAME':
      return [...patients.sort((a, b) => (a.firstName > b.firstName ? 1 : -1))];
    case 'LAST_NAME':
      return [...patients.sort((a, b) => (a.lastName > b.lastName ? 1 : -1))];
    case 'BIRTH_DATE':
      return [
        ...patients.sort((a, b) => {
          const aArr = a.birthDate.split('.');
          const bArr = b.birthDate.split('.');
          return parseInt(aArr[2]) - parseInt(bArr[2]) || parseInt(aArr[1]) - parseInt(bArr[1]) || parseInt(aArr[0]) - parseInt(bArr[0]);
        }),
      ];
    case 'PESEL':
      return [...patients.sort((a, b) => (a.pesel > b.pesel ? 1 : -1))];
    case 'PHONE_NUMBER':
      return [...patients.sort((a, b) => (a.phoneNumber > b.phoneNumber ? 1 : -1))];
    default:
      return [...patients.sort((a, b) => (a.pesel > b.pesel ? 1 : -1))];
  }
};

export const generateErrMsg = (errors: ValidationErrors | null | undefined) => {
  const errorArr = [];

  if (errors) {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          errorArr.push('Required');
          break;
        case 'pattern':
          errorArr.push('Invalid format');
          break;
        case 'maxlength':
          errorArr.push('Too long value');
          break;
        case 'minlength':
          errorArr.push('Too short value');
          break;
        case 'email':
          errorArr.push('Wrong email format');
          break;
        case 'isPeselValid':
          errorArr.push('Invalid PESEL');
          break;
        case 'oneContactFilled':
          errorArr.push('At least one contact field required');
          break;
        default:
          return;
      }
    }
  }
  const errMsg = errorArr.join('. ');

  return errMsg;
};
