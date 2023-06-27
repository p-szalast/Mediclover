import { sortPatients, generateErrMsg } from './helpers';
import { mockPatients } from '../mocks/mockdata';

describe('Helpers sortPatients', () => {
  it('should sort patients by first name', () => {
    const sortedPatients = sortPatients(mockPatients, 'FIRST_NAME');
    expect(sortedPatients[0].firstName).toBe('Batrosz');
    expect(sortedPatients[1].firstName).toBe('Mariusz');
  });

  it('should sort patients by last name', () => {
    const sortedPatients = sortPatients(mockPatients, 'LAST_NAME');
    expect(sortedPatients[0].lastName).toBe('Szczygieł');
    expect(sortedPatients[1].lastName).toBe('Wlazły');
  });

  it('should sort patients by birth date', () => {
    const sortedPatients = sortPatients(mockPatients, 'BIRTH_DATE');
    expect(sortedPatients[0].birthDate).toBe('07.03.1990');
    expect(sortedPatients[1].birthDate).toBe('05.01.1992');
  });

  it('should sort patients by PESEL', () => {
    const sortedPatients = sortPatients(mockPatients, 'PESEL');
    expect(sortedPatients[0].pesel).toBe(93718964377);
    expect(sortedPatients[1].pesel).toBe(94713453455);
  });

  it('should sort patients by phone number', () => {
    const sortedPatients = sortPatients(mockPatients, 'PHONE_NUMBER');
    expect(sortedPatients[0].phoneNumber).toBe('502113409');
    expect(sortedPatients[1].phoneNumber).toBe('603541699');
  });
});

describe('Helpers generateErrMsg', () => {
  it('should generate error message for required validation error', () => {
    const errors = { required: true };
    const errMsg = generateErrMsg(errors);
    expect(errMsg).toBe('Required');
  });

  it('should generate error message for pattern error', () => {
    const errors = { pattern: true };
    const errMsg = generateErrMsg(errors);
    expect(errMsg).toBe('Invalid format');
  });

  it('should generate error message for maxlength error', () => {
    const errors = { maxlength: true };
    const errMsg = generateErrMsg(errors);
    expect(errMsg).toBe('Too long value');
  });

  it('should generate error message for minlength error', () => {
    const errors = { minlength: true };
    const errMsg = generateErrMsg(errors);
    expect(errMsg).toBe('Too short value');
  });

  it('should generate error message for email error', () => {
    const errors = { email: true };
    const errMsg = generateErrMsg(errors);
    expect(errMsg).toBe('Wrong email format');
  });

  it('should generate error message for isPeselValid error', () => {
    const errors = { isPeselValid: true };
    const errMsg = generateErrMsg(errors);
    expect(errMsg).toBe('Invalid PESEL');
  });

  it('should generate error message for oneContactFilled error', () => {
    const errors = { oneContactFilled: true };
    const errMsg = generateErrMsg(errors);
    expect(errMsg).toBe('At least one contact field required');
  });

  it('should return empty string when there are no errors', () => {
    const errors = {};
    const errMsg = generateErrMsg(errors);
    expect(errMsg).toBe('');
  });
});
