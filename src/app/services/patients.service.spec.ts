import { TestBed } from '@angular/core/testing';

import { PatientsService } from './patients.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IPatient } from '../shared/models/patient';
import { BASE_URL } from '../shared/config';

import { mockPatients } from '../mocks/mockdata';
import { IPatientDataForm } from '../shared/models/patientDataForm';

describe('PatientsService', () => {
  let service: PatientsService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PatientsService],
    });
    service = TestBed.inject(PatientsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get patients', () => {
    service.getPatients().subscribe((patients) => {
      expect([patients[0], patients[1]]).toEqual(mockPatients);
    });

    const req = httpMock.expectOne(`${BASE_URL}/patients`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPatients);
  });

  it('should get patient by id', () => {
    service.getPatient('p001').subscribe((patient) => {
      // console.log('patient:', patient);
      // console.log('mockpatient:', mockPatients);
      //TODO: seems the same?
      // expect(patient).toEqual(mockPatients[0]);
    });

    const req = httpMock.expectOne(`${BASE_URL}/patients/p001`);
    req.flush(mockPatients);
  });
});
