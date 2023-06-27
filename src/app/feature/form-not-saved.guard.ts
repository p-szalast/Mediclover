import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, Router, UrlTree } from '@angular/router';
import { PatientFormComponent } from '../shared/components/patient-form/patient-form.component';

@Injectable({
  providedIn: 'root',
})
export class FormNotSavedGuard implements CanDeactivate<PatientFormComponent> {
  constructor(private readonly router: Router) {}

  canDeactivate(component: PatientFormComponent): boolean | UrlTree {
    return component.patientDataFormGroup.dirty ? confirm('Do you really want to quit form? Usaved data will be lost.') : true;
  }
}
