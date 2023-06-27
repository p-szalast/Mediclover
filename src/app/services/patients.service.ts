import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { BASE_URL } from '../shared/config';
import { IPatient } from '../shared/models/patient';
import { Observable, map, switchMap, tap } from 'rxjs';
import { IPatientDataForm } from '../shared/models/patientDataForm';
import { IFilters } from '../shared/models/filters';

import { sortPatients } from '../utils/helpers';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  constructor(private readonly http: HttpClient) {}

  getPatients(): Observable<IPatient[]> {
    return this.http.get<IPatient[]>(BASE_URL + '/patients');
  }

  getPatient(id: string): Observable<IPatient> {
    return this.http.get<IPatient>(BASE_URL + '/patients/' + id);
  }

  savePatient(id: string, editedPatientData: IPatientDataForm): Observable<IPatient> {
    const mappedPatient = this.mapPatient(editedPatientData);
    return this.http.put<IPatient>(BASE_URL + '/patients/' + id, mappedPatient);
  }

  addPatient(newPatintData: IPatientDataForm): Observable<IPatient> {
    const mappedPatient = this.mapPatient(newPatintData);
    return this.http.post<IPatient>(BASE_URL + '/patients', mappedPatient);
  }

  getFilteredPatients(searchValues: IFilters, isBirthDateValid: boolean | undefined): Observable<IPatient[]> {
    // Filtrowanie po stronie backendu: <name>_like
    // const params = new HttpParams({
    //   fromObject: {
    //     lastName_like: searchValues.lastName,
    //     birthDate_like: searchValues.birthDate,
    //     pesel_like: searchValues.pesel,
    //     phoneNumber_like: searchValues.phoneNumber,
    //   },
    // });
    // return this.http.get<IPatient[]>(BASE_URL + '/patients', { params }).pipe(

    return this.http.get<IPatient[]>(BASE_URL + '/patients').pipe(
      map((patient) =>
        patient
          .filter((patient) => (searchValues.lastName ? patient.lastName.toLowerCase().includes(searchValues.lastName) : patient))
          .filter((patient) => (searchValues.birthDate && isBirthDateValid ? patient.birthDate === searchValues.birthDate : patient))
          .filter((patient) => (searchValues.pesel ? patient.pesel.toString().startsWith(searchValues.pesel) : patient))
          .filter((patient) => (searchValues.phoneNumber ? patient.phoneNumber === searchValues.phoneNumber : patient)),
      ),
      map((patients) => sortPatients(patients, searchValues.sort)),
    );
  }

  private mapPatient(patientData: IPatientDataForm): Omit<IPatient, 'id'> {
    return {
      firstName: patientData.personalData.firstName,
      lastName: patientData.personalData.lastName,
      birthDate: patientData.personalData.birthDate,
      pesel: patientData.personalData.pesel,
      city: patientData.addressData.city,
      street: patientData.addressData.city,
      postalCode: patientData.addressData.postalCode,
      country: patientData.addressData.country,
      province: patientData.addressData.province,
      phoneNumber: patientData.contactData.phoneNumber,
      email: patientData.contactData.email,
      imgUrl: patientData.imgUrl,
    };
  }
}
