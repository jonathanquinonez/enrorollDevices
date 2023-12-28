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

export const patientRelationship = ['associate',
    'brother',
    'care',
    'child',
    'handicapped',
    'life',
    'emergency',
    'employee',
    'employer',
    'extended',
    'foster',
    'friend',
    'father',
    'grandchild',
    'guardian',
    'grandparent',
    'mother',
    'natural',
    'none',
    'other',
    'other2',
    'owner',
    'parent',
    'stepchild',
    'self',
    'sibling',
    'sister',
    'spouse',
    'trainer',
    'unknown',
    'ward'
]

export const patientRelationshipEs = ["Asociado",
    "Hermano",
    "Cuidador",
    "Niño/a",
    "Discapacitado dependiente",
    "Compañero de vida",
    "Contacto de emergencia",
    "Empleado",
    "Empleador",
    "Familia extendida",
    "Niño/a adoptivo",
    "Amigo/a",
    "Padre",
    "Nieto",
    "Tutor",
    "Abuelo/a",
    "Mamá",
    "Niño/a natural",
    "Ninguna",
    "Otro adulto",
    "Otro",
    "Dueño",
    "Pariente",
    "Hijastro/a",
    "Si mismo",
    "Hermano",
    "Hermana",
    "Esposa",
    "Entrenador",
    "Desconocido",
    "Tutela de tribunal"
]

export const patientRelationshipEn = ["Associate",
    "Brother",
    "Care giver",
    "Child",
    "Handicapped dependent",
    "Life partner",
    "Emergency contact",
    "Employee",
    "Employer",
    "Extended family",
    "Foster child",
    "Friend",
    "Father",
    "Grandchild",
    "Guardian",
    "Grandparent",
    "Mother",
    "Natural child",
    "None",
    "Other adult",
    "Other",
    "Owner",
    "Parent",
    "Stepchild",
    "Self",
    "Sibling",
    "Sister",
    "Spouse",
    "Trainer",
    "Unknown",
    "Ward of court"
]
