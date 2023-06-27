import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { PatientsService } from '../services/patients.service';
import { IPatient } from '../shared/models/patient';
import { TSort } from '../shared/models/filters';

@Injectable({
  providedIn: 'root',
})
export class PatientDetailsResolver implements Resolve<IPatient | null | string> {
  constructor(private patientsService: PatientsService) {}

  resolve(currentRoute: ActivatedRouteSnapshot) {
    const id = currentRoute.params['id'] as string;
    return id ? this.patientsService.getPatient(id) : null;
  }
}
