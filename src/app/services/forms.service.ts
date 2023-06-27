import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ISomeFilters } from '../shared/models/filters';
import { IPatient } from '../shared/models/patient';
import { isPeselValid, oneContactFilled } from '../utils/validators';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  initFilterFormGroup(queryParams: ISomeFilters) {
    return new FormGroup({
      searchGroup: new FormGroup({
        lastName: new FormControl(queryParams['lastName'] || ''),
        birthDate: new FormControl(queryParams['birthDate'] || '', [
          Validators.pattern(/^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.](19|20)[0-9]{2}$/),
          Validators.required,
        ]),
        pesel: new FormControl(queryParams['pesel'] || ''),
        phoneNumber: new FormControl(queryParams['phoneNumber'] || ''),
      }),
      sort: new FormControl(queryParams['sort'] || 'PESEL'),
    });
  }

  initPatientFormGroup(patientData: IPatient | null) {
    return new FormGroup({
      personalData: new FormGroup({
        firstName: new FormControl(patientData?.firstName || '', [
          Validators.required,
          Validators.pattern(/^[a-zA-Z żźćńółęąśŻŹĆĄŚĘŁÓŃ]+$/),
          Validators.maxLength(120),
        ]),
        lastName: new FormControl(patientData?.lastName || '', [
          Validators.required,
          Validators.pattern(/^[a-zA-Z żźćńółęąśŻŹĆĄŚĘŁÓŃ]+$/),
          Validators.maxLength(120),
        ]),
        birthDate: new FormControl(patientData?.birthDate || '', [
          Validators.required,
          //dd.mm.yyyy format
          Validators.pattern(/^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.](19|20)[0-9]{2}$/),
        ]),
        pesel: new FormControl(patientData?.pesel || '', [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
          isPeselValid,
        ]),
      }),
      imgUrl: new FormControl(patientData?.imgUrl || '', [
        Validators.required,
        Validators.pattern(/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/),
      ]),
      addressData: new FormGroup({
        city: new FormControl(patientData?.city || '', [
          Validators.required,
          Validators.pattern(/^[a-zA-Z żźćńółęąśŻŹĆĄŚĘŁÓŃ]+$/),
          Validators.maxLength(60),
        ]),
        street: new FormControl(patientData?.street || '', [Validators.required, Validators.maxLength(250)]),
        postalCode: new FormControl(patientData?.postalCode || '', [Validators.required, Validators.pattern(/\d{2}-\d{3}/)]),
        country: new FormControl(patientData?.country || '', [
          Validators.required,
          Validators.pattern(/^[a-zA-Z żźćńółęąśŻŹĆĄŚĘŁÓŃ]+$/),
          Validators.maxLength(60),
        ]),
        province: new FormControl(patientData?.province || '', [
          Validators.required,
          Validators.pattern(/^[a-zA-Z żźćńółęąśŻŹĆĄŚĘŁÓŃ]+$/),
          Validators.maxLength(120),
        ]),
      }),
      contactData: new FormGroup({
        phoneNumber: new FormControl(patientData?.phoneNumber || '', [
          Validators.minLength(9),
          Validators.maxLength(9),
          Validators.pattern(/^[0-9]/),
          oneContactFilled('email'),
        ]),
        email: new FormControl(patientData?.email || '', [
          Validators.email,
          // ends with dot + 2-3 characters
          Validators.pattern(/^[a-z0-9@]+.[a-z]{2,3}$/),
          // overwriting built-in Validators.email
          // Validators.pattern(
          //   /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
          // ),
          oneContactFilled('phoneNumber'),
        ]),
      }),
    });
  }
}
