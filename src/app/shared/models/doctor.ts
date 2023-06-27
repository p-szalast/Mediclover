import { IPatient } from './patient';

export interface IDoctor extends IPatient {
  patients: string[];
}
