// @TODO should this be common ?
type EcwGender = 'male' | 'female' | 'unknown'

export interface Referral {
  appointmentDate: string;
  authNo: string;
  dateOfBirth: string;
  diagnosisCode: string;
  diagnosisDesc: string;
  endDate: string;
  ethnicityName: string;
  firstName: string;
  fromFacility: number;
  fromFacilityName: string;
  fromFirstName: string;
  fromLastName: string;
  fromMiddleInitial: string;
  lastName: string;
  notes: string;
  patientAccountNumber: number;
  patientId: string;
  race: string;
  reason: string;
  refFrom: number;
  refFromNPI: number;
  refTo: number;
  referralDate: string;
  referralId: string;
  sex: EcwGender,
  speciality: string;
  startDate: string;
  status: string;
  toFacilityName: string;
  toFirstName: string;
  toLastName: string;
  toMiddleInitial: string;
}