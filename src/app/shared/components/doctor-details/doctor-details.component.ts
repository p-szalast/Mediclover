import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDoctor } from '../../models/doctor';
import { DoctorsService } from 'src/app/services/doctors.service';
import { combineLatest, switchMap } from 'rxjs';
import { PatientsService } from 'src/app/services/patients.service';
import { IPatient } from '../../models/patient';

@Component({
  selector: 'as-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.scss'],
})
export class DoctorDetailsComponent implements OnInit {
  doctorId!: string;

  selectedDoctor?: IDoctor;

  doctorPatients?: IPatient[];

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly doctorsService: DoctorsService,
    private readonly patientsService: PatientsService,
  ) {}

  ngOnInit(): void {
    // v1 solution with 2x switch map

    // this.activatedRoute.params
    //   .pipe(
    //     switchMap((data) => {
    //       const doctorId = data['id'] as string;
    //       this.doctorId = doctorId;
    //       return this.doctorsService.getDoctor(this.doctorId);
    //     }),
    //     switchMap((data) => {
    //       this.selectedDoctor = data;
    //       return this.patientsService.getPatients();
    //     }),
    //   )
    //   .subscribe((data) => {
    //      //filtering goes here
    //     console.log(this.selectedDoctor, data);
    //   });

    //////////////////////////////////////////////////////////

    this.doctorId = this.activatedRoute.snapshot.params['id'] as string;
    // combining data from two http requests (getting doctor data (with patients array) and getting patients array)
    combineLatest([this.doctorsService.getDoctor(this.doctorId), this.patientsService.getPatients()]).subscribe(([doctor, patients]) => {
      //assign doctor's data
      this.selectedDoctor = doctor;

      //assign patients data
      const patientsArr: IPatient[] = [];
      doctor.patients.forEach((doctorPatientId) => {
        const doctorPatient: IPatient | undefined = patients.find((patient) => patient.id === doctorPatientId);
        if (doctorPatient) {
          patientsArr.push(doctorPatient);
        }
      });

      this.doctorPatients = patientsArr;
    });
  }

  clickPatientHandler(id: string) {
    void this.router.navigate(['patient-details', id]);
  }
}
