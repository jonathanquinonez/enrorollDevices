export interface AppointmentsInfo {
  date: string;
  doctorId: number;
  encounterId: number;
  facilityId: number;
  name: string;
  patientId: string;
  reason: string;
  startTime: {
    hour: number;
    minute: number;
    nano: number;
    second: number;
  };
  status: string;
  ufName: string;
  ulName: string;
  visitType: string;
}
