import { Moment } from "moment";

export interface CreateUser {
    firstName: string;
    lastName: string;
    mobile: string;
    email: string;
    dateOfBirth: Date | string | Moment;
    sex: string
    state: string,

    genderIdentity: string,
    genderIdentityOther: string,
    sexualOrientiation: string,
    sexualOrientiationOther: string,
    etnicity: string,
    race: string,
    raceOther: string,
    languagePreference: string,
    languagePreferenceOther: string,
    employmentStatus: string,
    maritalStatus: string;
    maritalStatusOther: string;
    employerName: string,
    workPhone: string,
    emergencyContactName?: string,
    emergencyContactLastName?: string,
    emergencyContactMobile?: string,
    emergencyRelationship?: string,
    emergencyContact?: boolean,

    genderIdentityLabel?: string,
    sexualOrientiationLabel?: string,
    etnicityLabel?: string,
    raceLabel?: string,
    languagePreferenceLabel?: string,
};

