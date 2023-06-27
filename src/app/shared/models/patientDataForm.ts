export interface IPatientDataForm {
  personalData: {
    firstName: string;
    lastName: string;
    birthDate: string;
    pesel: number;
  };
  imgUrl: string;
  addressData: {
    city: string;
    street: string;
    postalCode: string;
    country: string;
    province: string;
  };
  contactData: {
    phoneNumber: string;
    email: string;
  };
}
