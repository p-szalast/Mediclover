import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { PatientDetailsResolver } from './patient-details.resolver';
import { PatientsService } from '../services/patients.service';
import { IPatient } from '../shared/models/patient';
import { mockPatients } from '../mocks/mockdata';

describe('PatientDetailsResolver', () => {
  let resolver: PatientDetailsResolver;
  let patientsService: jasmine.SpyObj<PatientsService>;

  beforeEach(() => {
    const patientsServiceSpy = jasmine.createSpyObj('PatientsService', ['getPatient']);

    TestBed.configureTestingModule({
      providers: [PatientDetailsResolver, { provide: PatientsService, useValue: patientsServiceSpy }],
    });

    resolver = TestBed.inject(PatientDetailsResolver);
    patientsService = TestBed.inject(PatientsService) as jasmine.SpyObj<PatientsService>;
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('should get patient data based on patient ID', () => {
    const id = 'p001';
    const patient: IPatient = mockPatients[0];

    patientsService.getPatient.and.returnValue(of(patient));

    const route = new ActivatedRouteSnapshot();
    route.params = { id: id };

    resolver.resolve(route)?.subscribe((result) => {
      expect(result).toEqual(patient);
      expect(patientsService.getPatient).toHaveBeenCalled();
      expect(patientsService.getPatient).toHaveBeenCalledTimes(1);
      expect(patientsService.getPatient).toHaveBeenCalledWith(id);
    });
  });
});
