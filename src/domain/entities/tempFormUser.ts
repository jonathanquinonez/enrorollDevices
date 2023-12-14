export interface TempFormUser {
    externalPartyID: null | string;
    mrn: null | string;
    authUid: null | string;
    role: null | string;
    idEcw: null | string;
    defaultFacility: null | string;
    id: null | string;
    idUser: null | string;
    patientInformation: PatientInformation;
    responsiblePartyInformation: null | string;
    primaryInsuranceInformation: null | string;
    secondaryInsuranceInformation: null | string;
    pharmacyInformation: null | string;
    healthOptins: null | string;
    isFBMax: boolean;
    sendByEmail: boolean;
    ecwIDPending: null | string;
    inclusionDate: null | string | number;
    lastActiveInAvaility: null | string;
    signature: null | string;
    registrationDate: null | string;
    otherFolder: boolean;
    isEnglish: null | string;
}

export interface PatientInformation {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    email: string;
    mobile: string;
    sex: string;
    homePhone: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipCode: string;
    ssn: string;
}

export const patientRelationship = [
    'self',
    'spouse',
    'naturalChild',
    'naturalChild2',
    'stepChild',
    'fosterChild',
    'ward',
    'employee',
    'unknown',
    'handicapped',
    'organ',
    'cadaver',
    'granchild',
    'nephew',
    'injured',
    'sponsored',
    'minor',
    'parent',
    'grandparent',
    'other',
];

export const patientRelationshipEs = ["Uno mismo",
    "Esposo(a)", "Hijo(a) Natural-Garante/Asegurado responde económicamente",
    "Hijo(a) Natural-Garante/Asegurado no responde económicamente",
    "Hijastro(a)", "Hijo(a) adoptivo", "Responsable por orden judicial",
    "Empleado", "Desconocido - Relación no listada", "Dependiente discapacitado",
    "Donante de órganos", "Donante de cadáver", "Nieto(a)", "Sobrino(a)", "Demandante lesionado",
    "Dependiente patrocinado", "Dependiente menor", "Padre/Madre", "Abuelo(a)", "Otro"];

export const patientRelationshipEn = ["Self",
    "Spouse", "Child-Guarant/Insured responds financially",
    "Child-Guarant/Insured doesn´t respond financially",
    "Stepchild", "Foster Child", "Ward of the court", "Employee",
    "Unknown - Other relationship", "Handicapped Dependent", "Organ Donor",
    "Cadaver Donor", "Granchild", "Niece/Nephew", "Injured Plaintiff", "Sponsored Dependent",
    "Minor Dependent", "Parent", "Grandparent", "Other"];
