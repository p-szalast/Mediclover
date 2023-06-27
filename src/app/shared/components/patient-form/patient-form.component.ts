import { Component, OnInit } from '@angular/core';
import { IPatient } from '../../models/patient';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { PatientsService } from 'src/app/services/patients.service';
import { FormsService } from 'src/app/services/forms.service';
import { generateErrMsg } from 'src/app/utils/helpers';
import { IPatientDataForm } from '../../models/patientDataForm';

@Component({
  selector: 'as-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss'],
})
export class PatientFormComponent implements OnInit {
  mode!: string;

  patientId: string | null = null;

  selectedPatient: IPatient | null = null;

  patientDataFormGroup!: FormGroup;

  constructor(
    private patientsService: PatientsService,
    private formsService: FormsService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
  ) {}

  ngOnInit() {
    //get mode
    this.mode = this.activatedRoute.snapshot.data['mode'] as string;

    //get id from url & patient data from router
    this.activatedRoute.params.subscribe(({ id }) => {
      this.patientId = id as string;
    });
    this.activatedRoute.data.subscribe(({ patient }) => {
      this.selectedPatient = patient as IPatient;
    });

    //init form
    this.patientDataFormGroup = this.formsService.initPatientFormGroup(this.selectedPatient);

    //one of two contact inputs filled
    this.patientDataFormGroup.get('contactData.email')?.valueChanges.subscribe(() => {
      this.patientDataFormGroup.get('contactData.phoneNumber')?.updateValueAndValidity({ emitEvent: false });
    });
    this.patientDataFormGroup.get('contactData.phoneNumber')?.valueChanges.subscribe(() => {
      this.patientDataFormGroup.get('contactData.email')?.updateValueAndValidity({ emitEvent: false });
    });
  }

  navBack() {
    this.mode === 'edit' ? void this.router.navigate(['patient-details', this.patientId]) : void this.router.navigate(['/home']);
  }

  formSubmitHandler() {
    const formGroupValue = this.patientDataFormGroup.value as IPatientDataForm;

    this.mode === 'edit' && this.patientId
      ? this.patientsService.savePatient(this.patientId, formGroupValue).subscribe(
          (next) => {
            alert('Patient data saved successfuly!');
            //allow to exit without confirm window
            this.patientDataFormGroup.markAsPristine();
            this.navBack();
          },
          (error) => alert('Cannot save patient data'),
        )
      : this.patientsService.addPatient(formGroupValue).subscribe(
          () => {
            alert('Patient added successfuly!');
            this.patientDataFormGroup.markAsPristine();
            this.navBack();
          },
          () => alert('Cannot save patient data'),
        );
  }

  handleValidationErrors(errors: ValidationErrors | null | undefined) {
    return generateErrMsg(errors);
  }
}
