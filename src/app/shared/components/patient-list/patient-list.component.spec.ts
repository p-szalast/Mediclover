import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientListComponent } from './patient-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { PatientsService } from 'src/app/services/patients.service';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';
import { FormsService } from 'src/app/services/forms.service';

describe('PatientListComponent', () => {
  let component: PatientListComponent;
  let fixture: ComponentFixture<PatientListComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule, HttpClientModule],
      declarations: [PatientListComponent, HeaderComponent, FooterComponent],
      providers: [PatientsService, FormsService],
    });

    fixture = TestBed.createComponent(PatientListComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should display sort label', () => {
    const compiled = fixture.nativeElement;

    const label: HTMLElement = compiled.querySelector('.sort-label');
    expect(label.innerText).toContain('Sort by:');
  });

  it('should navigate to patient details on clickPatientHandler', () => {
    const routerSpy = spyOn(router, 'navigate');
    const patientId = 'p002';
    component.clickPatientHandler(patientId);
    expect(routerSpy).toHaveBeenCalledWith(['patient-details', patientId]);
  });

  it('should unsubscribe from subscriptions on ngOnDestroy', () => {
    const searchGroupSubscription = jasmine.createSpyObj('Subscription', ['unsubscribe']);
    const sortSubscription = jasmine.createSpyObj('Subscription', ['unsubscribe']);
    component.searchGroupSubscription = searchGroupSubscription;
    component.sortSubscription = sortSubscription;

    component.ngOnDestroy();

    expect(searchGroupSubscription.unsubscribe).toHaveBeenCalled();
    expect(sortSubscription.unsubscribe).toHaveBeenCalled();
  });
});
