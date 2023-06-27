export type TSort = 'FIRST_NAME' | 'LAST_NAME' | 'BIRTH_DATE' | 'PESEL' | 'PHONE_NUMBER';
export interface IFilters {
  lastName: string;
  birthDate: string;
  pesel: string;
  phoneNumber: string;
  sort: TSort;
}

export interface ISomeFilters {
  lastName?: string;
  birthDate?: string;
  pesel?: string;
  phoneNumber?: string;
  sort?: TSort;
}
