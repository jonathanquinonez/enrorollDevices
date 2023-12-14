export interface patientInformation {
  firstName:string, 
  lastName:string, 
  dateOfBirth:string, 
  email:string,
  mobile: string
  sex: string, 
  homePhone:string,
  address1:string,
  address2:string,
  city:string,
  state:string,
  zipCode:number,
  ssn:null
}

export interface dataInsurance {
  service:string, 
  cost:number, 
  quantity:number, 
  tax:number, 
  subtotal:number, 
  total:number, 
  totalTax:number, 
  code:number | string, 
  message:string, 
  patientInformation: patientInformation,
  transactionId?: any
}

export type PropsBody = {
  ageDataInsurance?: dataInsurance | undefined | any,
  setShowBodyModal?: any,
  setShowModal?: any,
  modalPaypal: () => void,
}
export interface PropsLocation  {
  setShowBodyModal?: any,
  setShowModal?: any,
  onPress: () => void,
}

export interface PaymentTransaction {
  authUid:                    string;
  city:                       string;
  dateBirth:                  number;
  email:                      string;
  externalMRN:                any;
  firstName:                  string;
  groupNumberID:              any;
  id:                         number;
  insuranceCompany:           any;
  ipaddress:                  string;
  lastName:                   string;
  lastNamePrimaryInsured:     any;
  memberID:                   any;
  mobile:                     string;
  namePrimaryInsured:         any;
  notifySMS:                  any;
  otherValues:                any;
  patientRelationshipInsured: any;
  sanitasAccountNumber:       any;
  state:                      string;
  transactionAttendant:       any;
  transactionInformation:     TransactionInformation;
  uuid:                       any;
}

export interface TransactionInformation {
  changeServiceUser: any;
  changeStatusDate:  any;
  creationDate:      number;
  customerId:        any;
  paymentDate:       any;
  paymentID:         any;
  paymentMethod:     any;
  paymentStatus:     any;
  paymentType:       any;
  quantity:          number;
  serviceSold:       string;
  serviceStatus:     string;
  serviceStatusDate: any;
  serviceTotalValue: number;
  serviceValue:      number;
  sessionId:         any;
  sessionStatus:     any;
  sessionUrl:        any;
  status:            string;
  totalRate:         number;
  totalTax:          number;
}
