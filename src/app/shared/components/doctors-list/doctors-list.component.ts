import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { IDoctor } from '../../models/doctor';
import { DoctorsService } from 'src/app/services/doctors.service';

@Component({
  selector: 'as-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.scss'],
})
export class DoctorsListComponent implements OnInit {
  doctors$?: Observable<IDoctor[]>;

  searchGroupSubscription?: Subscription;

  sortSubscription?: Subscription;

  constructor(private doctorsService: DoctorsService, private readonly router: Router) {}

  ngOnInit(): void {
    this.doctors$ = this.doctorsService.getDoctors();
  }

  clickDoctorHandler(doctorId: string) {
    void this.router.navigate(['doctors-details', doctorId]);
  }

  OnDestroy(): void {
    this.searchGroupSubscription?.unsubscribe();
    this.sortSubscription?.unsubscribe();
  }
}
