import { Component, OnInit } from '@angular/core';
import { IPatient } from '../../models/patient';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'as-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss'],
})
export class PatientDetailsComponent implements OnInit {
  patientId!: string;

  selectedPatient?: IPatient;

  constructor(private readonly activatedRoute: ActivatedRoute, private readonly router: Router) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.patientId = id as string;
    });

    this.activatedRoute.data.subscribe(({ patient }) => {
      this.selectedPatient = patient as IPatient;
    });
  }

  clickEditHandler() {
    void this.router.navigate(['edit-patient', this.patientId]);
  }
}
