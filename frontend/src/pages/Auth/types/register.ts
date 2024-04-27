export enum RegisterPages {
  PERSONAL_DETAILS,
  HOSPITAL_SELECTION,
  ADMIN_HOSPITAL_SELECT,
  REGISTER_HOSPITAL,
  LOGIN_DETAILS
}

export type UserRegisterInfo = {
  firstName: string,
  lastName: string,
  email: string,
  role: string,
  username: string,
  password: string
  hospitalId: string,
}

export type HospitalRegisterInfo = {
  name: string,
  street: string,
  city: string,
  state: string,
  zipcode: string,
  country: string
}

export type RegisterDataControls = {
  registerData: UserRegisterInfo;
  setRegisterData: (data: UserRegisterInfo | ((data: UserRegisterInfo) => UserRegisterInfo)) => void;
}

export type HospitalDataControls = {
  hospitalData: HospitalRegisterInfo | undefined;
  setHospitalData: (data: (HospitalRegisterInfo | undefined) | ((data: (HospitalRegisterInfo | undefined)) => (HospitalRegisterInfo | undefined))) => void;
}