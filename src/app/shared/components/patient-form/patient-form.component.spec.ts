import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientFormComponent } from './patient-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsService } from 'src/app/services/forms.service';
import { PatientsService } from 'src/app/services/patients.service';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

describe('PatientFormComponent', () => {
  let component: PatientFormComponent;
  let fixture: ComponentFixture<PatientFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule, HttpClientModule],
      declarations: [PatientFormComponent, HeaderComponent, FooterComponent],
      providers: [PatientsService, FormsService],
    });
    fixture = TestBed.createComponent(PatientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate all form controls', () => {
    expect(component.patientDataFormGroup.get('personalData.firstName')).toBeTruthy();
    expect(component.patientDataFormGroup.get('personalData.lastName')).toBeTruthy();
    expect(component.patientDataFormGroup.get('personalData.birthDate')).toBeTruthy();
    expect(component.patientDataFormGroup.get('personalData.pesel')).toBeTruthy();
    expect(component.patientDataFormGroup.get('addressData.city')).toBeTruthy();
    expect(component.patientDataFormGroup.get('addressData.street')).toBeTruthy();
    expect(component.patientDataFormGroup.get('addressData.postalCode')).toBeTruthy();
    expect(component.patientDataFormGroup.get('addressData.country')).toBeTruthy();
    expect(component.patientDataFormGroup.get('addressData.province')).toBeTruthy();
    expect(component.patientDataFormGroup.get('contactData.phoneNumber')).toBeTruthy();
    expect(component.patientDataFormGroup.get('contactData.email')).toBeTruthy();
  });
});
