import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { PatientListComponent } from './shared/components/patient-list/patient-list.component';
import { PatientDetailsComponent } from './shared/components/patient-details/patient-details.component';
import { PatientFormComponent } from './shared/components/patient-form/patient-form.component';
import { SearchInputComponent } from './shared/components/search-input/search-input.component';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { NotFoundPageComponent } from './shared/components/not-found-page/not-found-page.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DoctorsListComponent } from './shared/components/doctors-list/doctors-list.component';
import { DoctorDetailsComponent } from './shared/components/doctor-details/doctor-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PatientListComponent,
    PatientDetailsComponent,
    PatientFormComponent,
    SearchInputComponent,
    NotFoundPageComponent,
    DoctorsListComponent,
    DoctorDetailsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, HttpClientModule],
  providers: [provideRouter(routes, withComponentInputBinding())],
  bootstrap: [AppComponent],
})
export class AppModule {}
