import { Component, OnInit, OnDestroy } from '@angular/core';
import { IPatient } from '../../models/patient';
import { ActivatedRoute, Router } from '@angular/router';

import { PatientsService } from 'src/app/services/patients.service';
import { IFilters, TSort } from '../../models/filters';
import { FormGroup } from '@angular/forms';
import { Observable, Subscription, debounceTime, switchMap, tap } from 'rxjs';
import { FormsService } from 'src/app/services/forms.service';

@Component({
  selector: 'as-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
})
export class PatientListComponent implements OnInit, OnDestroy {
  patients$?: Observable<IPatient[]>;

  filterFormGroup!: FormGroup;

  searchGroupSubscription?: Subscription;

  sortSubscription?: Subscription;

  constructor(
    private patientsService: PatientsService,
    private formsService: FormsService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    //Init reactive filters
    this.filterFormGroup = this.formsService.initFilterFormGroup(this.activatedRoute.snapshot.queryParams);

    //Filter subscription handling
    this.searchGroupSubscription = (this.filterFormGroup.get('searchGroup') as FormGroup)?.valueChanges
      .pipe(
        debounceTime(1000),
        tap((searchValues: Omit<IFilters, 'sort'>) => {
          void this.router.navigate(['/home'], {
            queryParams: {
              ...this.activatedRoute.snapshot.queryParams,
              lastName: searchValues.lastName,
              birthDate: searchValues.birthDate,
              pesel: searchValues.pesel,
              phoneNumber: searchValues.phoneNumber,
            },
          });
        }),
      )
      .subscribe();

    //Sort subscription handling
    this.sortSubscription = this.sortSubscription = this.filterFormGroup
      .get('sort')
      ?.valueChanges.pipe(
        tap((sortValue: TSort) => {
          //tap for side effects and preview
          void this.router.navigate(['/home'], {
            queryParams: {
              ...this.activatedRoute.snapshot.queryParams,
              sort: sortValue || 'PESEL',
            },
          });
        }),
      )
      .subscribe();

    //Reading filter values from url
    this.patients$ = this.activatedRoute.queryParams.pipe(
      switchMap((searchValues) => {
        const filter = {
          lastName: searchValues['lastName'] as string,
          birthDate: searchValues['birthDate'] as string,
          pesel: searchValues['pesel'] as string,
          phoneNumber: searchValues['phoneNumber'] as string,
          sort: searchValues['sort'] as TSort,
        };
        return this.patientsService.getFilteredPatients(filter, this.filterFormGroup.get('searchGroup.birthDate')?.valid);
      }),
    );
  }

  clickPatientHandler(patientId: string) {
    void this.router.navigate(['patient-details', patientId]);
  }

  ngOnDestroy(): void {
    this.searchGroupSubscription?.unsubscribe();
    this.sortSubscription?.unsubscribe();
  }
}
