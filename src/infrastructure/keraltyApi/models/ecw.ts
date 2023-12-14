export type RegistriesCredentialsDTO = {
	ecwId: string;
	beginDate: string;
	endDate: string;
};

export type PersonalDataDTO = {
	firstName: string;
	lastName: string;
	birthdate: string;
	sex: string;
	state: string;
	email: string;
	phone: string;
};
export type ReferralsCredentialsDTO = {
    authNo: string;
    diagnosisDesc: string;
    endDate: string;
    id: number;
    reason: string;
    referralDate: string;
    startDate: string;
  };

//region Insurance Information

export type IInsuranceResponseDto = {
    id:    number;
    name:  string;
    phone: string;
    state: string;
}

//#end region Insurance Information

export type DocumentLabDownloadDTO = {
  patientId: string,
  reportId: string,
  dob: string,
  facilityInfo: string,
  providerInfo: string,
  itemName: string,
  clinicalCenter: string,
  notes: string,
  language: string,
}

//Visit Summary
export type DocumentVisitSummaryDownloadDTO = {
  encounterId: string,
  beginDate: string,
  endDate: string,
  birthDate: string,  
}
//Visit Summary

//Cancel Appoiment

export type CancelUpAppoimentDto = {
  identifier :[
    {
      type : string, 
      value: string
    }
  ],
  communication: {
    language: string
  }
}

//Information my insurance

export type InsuranceDto = {
  patientId: string,
  state : string
}
