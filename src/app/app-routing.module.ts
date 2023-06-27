import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientListComponent } from './shared/components/patient-list/patient-list.component';
import { PatientFormComponent } from './shared/components/patient-form/patient-form.component';
import { PatientDetailsComponent } from './shared/components/patient-details/patient-details.component';
import { NotFoundPageComponent } from './shared/components/not-found-page/not-found-page.component';
import { FormNotSavedGuard } from './feature/form-not-saved.guard';
import { isAdminGuard as RoleGuard } from './feature/is-admin.guard';
import { PatientDetailsResolver } from './feature/patient-details.resolver';
import { DoctorsListComponent } from './shared/components/doctors-list/doctors-list.component';
import { DoctorDetailsComponent } from './shared/components/doctor-details/doctor-details.component';

export const routes: Routes = [
  {
    path: 'home',
    component: PatientListComponent,
    data: { title: 'Home page' },
  },
  {
    path: 'new-patient',
    component: PatientFormComponent,
    canDeactivate: [FormNotSavedGuard],
    canActivate: [RoleGuard],
    data: {
      mode: 'new',
    },
  },
  {
    path: 'patient-details/:id',
    component: PatientDetailsComponent,
    resolve: { patient: PatientDetailsResolver },
  },
  {
    path: 'edit-patient/:id',
    component: PatientFormComponent,
    canActivate: [RoleGuard],
    canDeactivate: [FormNotSavedGuard],
    resolve: { patient: PatientDetailsResolver },
    data: {
      mode: 'edit',
    },
  },
  {
    path: 'doctors',
    component: DoctorsListComponent,
  },
  {
    path: 'doctors-details/:id',
    component: DoctorDetailsComponent,
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
