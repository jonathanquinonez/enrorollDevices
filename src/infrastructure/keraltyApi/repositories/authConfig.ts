/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-extra-semi */
import { Method } from 'axios';
import { ContactSecurityCredentials } from 'domain/entities/ContactSecurityCredentials';
import { EmailIdentifier, ValidationCodeFP } from 'domain/entities/emailIdentifier';
import { validateAccountContact } from 'domain/entities/validateAccountContact';
import {
	ChangePasswordDTO, LoginCredentialsDTO, LoginSecurityDTO,
	SendRecoverEmailDTO, UserIdentifierDTO,
	RegistrationCheckDTO, ValidateAccountDTO,
	ValidateAccountContactMethodsDTO, MatchAccountInfoDTO,
	TriesToBlock, GetIdBelongState, GetPreviousProc, SendCodeMsj, SendPass, SendCode, getTimeCodeExpired, InitialSaveDTO, InitialSaveByAccountNumberDTO, FinalSaveDTO, AvailityCoverage, DeleteAccountDTO, ReSendRecoverEmailInitialSave, AvailityCoverageInsurance, UpdateMyInsurace, Tempnofbuserviacode, DoLoginAllStates, LoadUserBySession, CodeState, ValidateStates, PersonalInfFP, ValidateRequestFP, Validateviacode, CheckTermsAndPrivacyVersion, UpdateTermsAndPrivacyVersion, ParametersHint, ParamsConsents, getInfo, ParametersPartialRecord
} from '../models/auth';
import appConfig from 'config/base.config.json';

type Endpoint = { url: string; method: Method; body?: any };

export const authEndpoint = 'auth';



const AuthConfig = {
	// AUTHENTICATION
	login: (body: LoginCredentialsDTO): Endpoint =>
		({ method: 'post', url: `login`, body }),
	loginSecurity: (body: LoginSecurityDTO): Endpoint =>
		({ method: 'post', url: `loginsecurity`, body }),
	updateUsersPatientInfo: (body: any): Endpoint =>
		({ method: 'post', url: `updateUsers/patient-info`, body }),
	loadUserBySession: (data: LoadUserBySession): Endpoint =>
		({ method: 'get', url: `validatesession/${data.token}/${data.state}` }),
	validatesession: (data: LoadUserBySession): Endpoint =>
		({ method: 'get', url: `validatesession/${data.token}/${data.state}` }),
	senselyAuthentication: (body: { locale: string }): Endpoint =>
		({ method: 'post', url: `sensely/authenticate`, body }),
	//DELETE ACCOUNT

	delete: (body: DeleteAccountDTO): Endpoint =>
		({ method: 'post', url: `delete/userAccount`, body }),

	//unBlockAccount
	GetIdBelong: (body: GetIdBelongState): Endpoint =>
		({ method: 'post', url: `unblock/validate`, body }),
	GetPreviousProccess: (body: GetPreviousProc): Endpoint =>
		({ method: 'post', url: `unblock/hasAPreviousProcess`, body }),
	sendCodeValidate: (body: SendCodeMsj): Endpoint =>
		({ method: 'post', url: `unblock/sendCode`, body }),
	reSendCodeUser: (body: any): Endpoint =>
		({ method: 'post', url: `unblock/reSendCode`, body }),
	sendCodeUser: (body: SendCode): Endpoint =>
		({ method: 'post', url: `unblock/triesToBlock`, body }),
	sendValuePass: (body: SendPass): Endpoint =>
		({ method: 'post', url: `unblock/changePass`, body }),
	getCodeTimeExpired: (data: getTimeCodeExpired): Endpoint =>
		({ method: 'get', url: `unblock/canResetTimer/${data.email}/${data.state}` }),
	//unBlockAccount

	// FORGOT
	validateStates: (body: ValidateStates): Endpoint =>
		({ method: 'post', url: `forgotpass/validateStates`, body }),
	validateUserExistence: (body: ValidateRequestFP): Endpoint =>
		({ method: 'post', url: `forgotpass/validateRequest/forgotPass`, body }),
	validateTempSession: (data: { email: string, state: string }): Endpoint =>
		({ method: 'get', url: `forgotpass/validateTempSession/${data.email}/${data.state}` }),
	validateAccountByState: (body: ValidateStates): Endpoint =>
		({ method: 'post', url: `forgotpass/validateAccount/byState`, body }),
	sendRecoverEmail: (body: EmailIdentifier): Endpoint =>
		({ method: 'post', url: `forgotpass/sendemail`, body }),
	changePassword: (body: ChangePasswordDTO): Endpoint =>
		({ method: 'post', url: `forgotpass/changepass`, body }),
	reValidateUserExistence: (body: UserIdentifierDTO): Endpoint =>
		({ method: 'post', url: `forgotpass/revalidate`, body }),
	reSendRecoverEmail: (body: EmailIdentifier): Endpoint =>
		({ method: 'post', url: `forgotpass/resendemail`, body }),
	validationCode: (body: ValidationCodeFP): Endpoint =>
		({ method: 'post', url: `forgotpass/code`, body }),

	// REGISTER
	registrationCheck: (body: RegistrationCheckDTO): Endpoint =>
		({ method: 'post', url: `createuser/doCreateUser`, body }), //TODO: First Service - Validado
	verifyCodeEcw: (body: ValidateAccountDTO): Endpoint =>
		({ method: 'post', url: `createuser/verifyCodeEcw`, body }),
	validateAccount: (body: ValidateAccountDTO): Endpoint =>
		({ method: 'post', url: `createuser/validate-account`, body }),
	validateAccountContactMethods: (body: validateAccountContact): Endpoint =>
		({ method: 'post', url: `createuser/docreateuserecw`, body }),
	matchAccountInfo: (body: any): Endpoint =>
		({ method: 'post', url: `createuser/docreateuserecwmc`, body }),
	initialSave: (body: InitialSaveDTO): Endpoint =>
		({ method: 'post', url: `register/initialsave`, body }),
	resendsmscode: (body: any): Endpoint =>
		({ method: 'post', url: `register/resendsmscode`, body }),
	initialSaveByAccountNumber: (data: InitialSaveByAccountNumberDTO): Endpoint =>
		({ method: 'post', url: `register/initialsaveecw`, body: data }),
	reSendRecoverEmailInitialSave: (data: ReSendRecoverEmailInitialSave): Endpoint =>
		({ method: 'post', url: `register/resendemail`, body: data }),
	triesToBlock: (data: TriesToBlock): Endpoint =>
		({ method: 'post', url: `register/triesToBlock`, body: data }),
	loadUserInfo: (data: Tempnofbuserviacode): Endpoint =>
		({ method: 'get', url: `register/gettempusernofb/${data.code}/${data.state}/${data.email}` }),
	loadMaxUserInfo: (data: Validateviacode): Endpoint =>
		({ method: 'get', url: `register/eligibilitydata/${data.id}/${data.email}` }),
	loadElegibilityData: (id: string): Endpoint =>
		({ method: 'get', url: `register/loadElegibilityData/${id}` }),
	loadUserInfoByCode: (data: Tempnofbuserviacode): Endpoint =>
		({ method: 'get', url: `register/tempnofbuserviacode/${data.code}/${data.state}/${data.email}` }),
	loadMaxUserInfoByCode: (data: Validateviacode): Endpoint =>
		({ method: 'get', url: `register/tempfbuserviacode/${data.id}/${data.email}` }),
	loadMaxUserInfoSSO: (data: string): Endpoint =>
		({ method: 'get', url: `register/eligibilitydata/${data}` }),
	finalSave: (data: FinalSaveDTO): Endpoint =>
		({ method: 'post', url: `register/finalsave`, body: data }),
	updateConsents: (data: FinalSaveDTO): Endpoint =>
		({ method: 'post', url: `updateUsers/update-consents`, body: data }),
	registerConsentsTime: (data: ParamsConsents): Endpoint =>
		({ method: 'get', url: `register/can-user-continue-to-consents/${data.state}/${data.id}/${data.isFBMax}` }),
	coverage: (data: AvailityCoverage): Endpoint =>
		({ method: 'post', url: `insurance/coverage`, body: data }),
	coverageInsurance: (data: AvailityCoverageInsurance): Endpoint =>
		({ method: 'post', url: `insurance/status`, body: data }),
	validateHint: (data: ParametersHint): Endpoint => ({
		method: 'get', url: `hintValidation?patientId=${data.patientId}&state=${data.state}`
	}),
	deletePartialRecord: (data: ParametersPartialRecord): Endpoint => ({
		method: 'get', url: `/register/status?tempSessionId=${data.tempSessionId}&state=${data.state}`
	}),

	getInsuranceProviderInformation: (authUid: string, state: string): Endpoint => ({
		method: 'get',
		url: `insurance/information/${authUid}/${state}`,
	}),
	updateInsurance: (body: UpdateMyInsurace): Endpoint => ({
		method: 'post', url: `updateUsers/insured`, body
	}),
	doLoginAllStates: (body: any): Endpoint => ({
		method: 'post', url: `doLoginAllStates`, body
	}),
	//Annual visit
	checkAnnualVisitCode: (data: CodeState): Endpoint =>
		({ method: 'get', url: `checkAnnualVisit/${data.code}/${data.state}` }),
	updateAnnualVisitCode: (data: CodeState): Endpoint =>
		({ method: 'get', url: `updateUsers/updateAnnualVisit/${data.code}/${data.state}/1` }),
	checkTermsAndPrivacyVersion: (data: CheckTermsAndPrivacyVersion): Endpoint =>
		({ method: 'post', url: `checkTermsAndPrivacyVersion`, body: data }),
	updateTermsAndPrivacyVersion: (data: UpdateTermsAndPrivacyVersion): Endpoint =>
		({ method: 'post', url: `updateUsers/updateTermsAndPrivacyVersion`, body: data }),

	//Payment 
	GetInfoValidateInsurance: (body: getInfo): Endpoint =>
		({ method: 'post', url: `payment/validate-insurance`, body }),

	//
	verifyEmailAndMobile: (body: any): Endpoint => ({
		method: 'post', url: `verifyEmailAndMobile`, body
	}),
	requestCodeEmailMobile: (body: any): Endpoint => ({
		method: 'post', url: `requestCodeEmailMobile`, body
	}),
	confirmCode: (body: any): Endpoint => ({
		method: 'post', url: `confirmCode`, body
	}),
};

export default AuthConfig;
