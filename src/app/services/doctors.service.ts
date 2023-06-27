import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDoctor } from '../shared/models/doctor';
import { Observable } from 'rxjs';
import { BASE_URL } from '../shared/config';

@Injectable({
  providedIn: 'root',
})
export class DoctorsService {
  constructor(private readonly http: HttpClient) {}

  getDoctors(): Observable<IDoctor[]> {
    return this.http.get<IDoctor[]>(BASE_URL + '/doctors');
  }

  getDoctor(id: string): Observable<IDoctor> {
    return this.http.get<IDoctor>(BASE_URL + '/doctors/' + id);
  }
}
