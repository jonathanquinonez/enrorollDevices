/* eslint-disable object-property-newline */
import moment, { utc } from 'moment';
// FORMAT
import FORMATS from 'ui-core/utils/formats';
import { formatPhone } from './formatsMapper';
// INFRASTRUCTURE
import {
	RegistrationCheckDTO, ValidateAccountDTO,
	ValidateAccountContactMethodsDTO, MatchAccountInfoDTO,
	InitialSaveDTO, InitialSaveByAccountNumberDTO, FinalSaveDTO, AvailityCoverage
} from 'infrastructure/keraltyApi/models/auth';
// DOMAIN
import { UserBasicInfo } from 'domain/entities/userBasicInfo';
import { EnrollDevice } from 'domain/entities/enrollDevice';
import { AccountInfo } from 'domain/entities/accountInfo';
import { ContactMethods } from 'domain/entities/contactMethods';
import { UserInfo } from 'domain/entities/userInfo';
import { PatientInfo } from 'domain/entities/patientInfo';
import { validateAccountContact } from 'domain/entities/validateAccountContact';
import { videoCallRegistry } from 'domain/entities/videoCallRegistry';
import SecondData from 'src/components/organisms/PatientRegistration/SecondData/SecondData';
import { ConsentsInfo } from 'domain/entities/consents';

//

const registerMapper = {
	// ------------------ Domain Object => Data Transfer Object ------------------ //
	mapToInitialRegistrationCheck: (domainObject: UserBasicInfo): RegistrationCheckDTO => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { birthdate, dateOfBirth, mobile, ...values } = domainObject;
		return {
			patientInformation: {
				...values,
				dateOfBirth: moment(dateOfBirth).format(FORMATS.dateISO8601),
				cellphone: mobile
			}
		};
	},
	// ------------------ Domain Object => Data Transfer Object ------------------ //
	mapToValidateAccount: ({ accountNumber, dateOfBirth }: AccountInfo): ValidateAccountDTO => ({
		accountNumber: accountNumber || '0',
		dateOfBirth: moment(dateOfBirth).format(FORMATS.dateISO8601)
	}),
	// ------------------ Domain Object => Data Transfer Object ------------------ //
	mapToValidateAccountContactMethods: (
		{ mobile, dateOfBirth, ...domainObject }: validateAccountContact
	): validateAccountContact => ({
		...domainObject,
		dateOfBirth: moment(dateOfBirth).format(FORMATS.dateISO8601),
		mobile: mobile || ''
	}),
	// ------------------ Domain Object => Data Transfer Object ------------------ //
	mapToInitialSaveMethods: (value: any) => {

		const patientInfo = value.user.patientInformation;
		const newPatientInfo = {
			email: patientInfo.email,
			firstName: patientInfo.firstName,
			lastName: patientInfo.lastName,
			dateOfBirth: patientInfo.dateOfBirth,
			mobile: patientInfo.mobile,
			sex: patientInfo.sex,
			address1: patientInfo.address1,
			address2: patientInfo.address2,
			city: patientInfo.city,
			ssn: patientInfo.ssn,
			state: patientInfo.state,
			zipCode: patientInfo.zipCode
		}
		value.user.patientInformation = newPatientInfo;

		return { ...value, user: { ...value.user, patientInformation: newPatientInfo } }
	},
	// ------------------ Domain Object => Data Transfer Object ------------------ //
	mapMatchAccountInfo: (domainObject: UserBasicInfo & { mobile: string, dateOfBirth: Date }): RegistrationCheckDTO => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { birthdate, cellphone, mobile, dateOfBirth, ...values } = domainObject;
		return {
			patientInformation: {
				...values,
				cellphone: mobile,
				dateOfBirth: moment(dateOfBirth).format(FORMATS.dateISO8601)
			}
		};
	},
	// ------------------ Domain Object => Data Transfer Object ------------------ //
	mapToMatchAccountInfo: (
		{ gender, cellphone, birthdate, ...domainObject }: UserBasicInfo
	): MatchAccountInfoDTO => ({
		patientInformation: {
			...domainObject,
			dateOfBirth: moment(birthdate).format(FORMATS.dateISO8601),
			sex: gender,
		}
	}),
	// ------------------ Domain Object => Data Transfer Object ------------------ //
	mapToInitialSave: (
		domainObject: UserInfo & { userId: string; }
	): InitialSaveDTO => {
		const { password, userId, email, ...attrs } = domainObject;
		// FORMATTING
		const mobile = formatPhone(attrs.cellphone) || '0';
		const homePhone = formatPhone(attrs.homePhone) || '0';
		const dateOfBirth = moment(attrs.birthdate).utc().format(FORMATS.dateISO8601);
		const isFBMax = Boolean(userId);
		const sendByEmail = attrs.contactMethod === 'email';
		//
		return {
			id: userId,
			email,
			pass: password,
			user: {
				id: userId,
				isFBMax, sendByEmail,
				...(!userId ? {
					patientInformation: {
						firstName: attrs.firstName,
						lastName: attrs.lastName,
						dateOfBirth,
						sex: attrs.gender,
						email, mobile, homePhone,
						address1: attrs.address1,
						address2: attrs.address2,
						state: attrs.state,
						city: attrs.city,
						zipCode: attrs.zipCode,
						ssn: attrs.ssn
					}
				} : { patientInformation: { mobile } })
			}
		};
	},
	// ------------------ Domain Object => Data Transfer Object ------------------ //
	mapToInitialSaveByAccountNumber: (
		domainObject: UserInfo & { userId: string; }
	): InitialSaveByAccountNumberDTO => {
		const { password, userId, email = '', ...attrs } = domainObject;
		// FORMATTING
		const mobile = formatPhone(attrs.phone) || '0';
		const dateOfBirth = moment(attrs.birthdate).utc().format(FORMATS.dateISO8601);
		const isFBMax = Boolean(userId);
		const sendByEmail = attrs.contactMethod === 'email';
		//
		return {
			id: userId,
			email,
			pass: password,
			user: {
				id: userId,
				idEcw: attrs.accountNumber || '0',
				isFBMax, sendByEmail,
				patientInformation: { dateOfBirth, email, mobile }
			}
		};
	},
	// ------------------ Data Transfer Object => Domain Object ------------------ //
	mapFromLoadUserInfo: (dto: any) => {
		const { patientInformation, id } = dto;
		const {
			dateOfBirth, sex, mobile, homePhone: hp, relationship, ...userInfo
		} = patientInformation;
		// FORMATTING
		const cellphone = formatPhone(mobile);
		const homePhone = formatPhone(hp);
		const birthdate = moment(dateOfBirth).utc().format(FORMATS.date);
		//
		return {
			...userInfo,
			tempId: id,
			birthdate,
			gender: sex,
			cellphone, homePhone,
			patientRelationship: relationship
		};
	},
	// ------------------ Data Transfer Object => Domain Object ------------------ //
	mapFromLoadMaxUserInfo: (dto: any): any => {


		const {
			id, memberNumber, memberFirstName, memberLastName, memberGender, memberRelationship,
			memberState, memberZipCode, memberHomePhoneNumber = '', memberEmailAddress,
			memberDateofBirth, memberCity, memberAddressLineOne, memberAddressLineTwo,
			contractNumber
		} = dto;
		//
		return {
			tempId: id,
			firstName: memberFirstName,
			lastName: memberLastName,
			birthdate: utc(memberDateofBirth).format(FORMATS.date),
			city: memberCity,
			state: memberState,
			zipCode: memberZipCode,
			address1: memberAddressLineOne,
			address2: memberAddressLineTwo,
			homePhone: memberHomePhoneNumber,
			cellphone: memberHomePhoneNumber,
			email: memberEmailAddress,
			gender: memberGender,
			externalPartyId: memberNumber,
			patientRelationship: memberRelationship,
			contractNumber
		};
	},
	mapFromLoadUserSSO: (dto: any): any => {

		const {
			zipcode, address2, city, address1, homePhone, ssn
		} = dto;
		//
		return {
			city: city,
			zipCode: zipcode,
			address1: address1,
			address2: address2,
			homePhone: homePhone,
			ssn: ssn,
		};
	},
	// ------------------ Domain Object => Data Transfer Object ------------------ //
	mapToValidateTelevisita: ({ birthDate, ...date }: videoCallRegistry & { authUid: string }): AvailityCoverage => ({
		...date,
		birthDate: moment(birthDate).format(FORMATS.date2),
		isActive: false,
	}),


	// ------------------ Domain Object => Data Transfer Object ------------------ //
	mapToFinalSave: (
		domainObject: ConsentsInfo
	): FinalSaveDTO => {
		const {
			isNewVersion, authUid, email, firstData, phone, messagePush, secondData, tempValues, isEnglish, editAccountdata , consentHippa, signature
		} = domainObject;

		const isFBMax: boolean = tempValues?.firstName ? true : false;
		let isFBMaxpatientInformation: any;
		if (isFBMax) {
			secondData.companyId = '999';
			secondData.insuranceCompany = 'My Blue Connected Care';
			secondData.patient_relationship_to_insured = tempValues.patientRelationship;
			secondData.name_of_insured = tempValues.firstName;
			secondData.lastname_of_insured = tempValues.lastName;
			secondData.subscriber_id = tempValues.contractNumber
			isFBMaxpatientInformation = {
				firstName: tempValues.firstName,
				lastName: tempValues.lastName,
				city: tempValues.city,
				state: tempValues.state,
				zipCode: tempValues.zipCode,
				address1: tempValues.address1,
				address2: tempValues.address2,
				email: tempValues.email,
				externalPartyId: tempValues?.externalPartyId ?? tempValues?.idEcw ?? '',
				patientRelationship: tempValues.patientRelationship,
				dateOfBirth: moment(tempValues.birthdate).format(FORMATS.date2),
				sex: tempValues.gender,
				mobile: tempValues.cellphone,
				homePhone: tempValues.homePhone
			}
		}

		const patientInformation = tempValues?.patientInformation ? tempValues.patientInformation : isFBMaxpatientInformation;
		let data: any = {
			authUid: authUid,
			id: tempValues.id ?? tempValues.tempId,
			isFBMax: isFBMax,
			externalPartyId: tempValues?.externalPartyId ?? tempValues?.idEcw ?? '',
			signature,
			isEnglish,
			consentHippa: consentHippa,
			doYouHave: firstData?.doYouHave,
			legalGuardianName: firstData?.legalGuardianName ?? '',
			legalGuardianContacPhone: firstData?.legalGuardianContacPhone ?? '',
			disclosureEmergency: patientInformation?.acceptedFriend,
			emergencyConsents: firstData.emergencyContact,
			emergencyContactName: firstData?.emergencyContactName ?? '',
			emergencyContactLastName: firstData?.emergencyContactLastName ?? '',
			emergencyContactMobile: firstData?.emergencyContactMobile ?? '',
			emergencyRelationship: firstData?.emergencyRelationship,
			familiarFriendOne: {
				name: firstData?.nameFriendOne ?? '',
				relationShip: firstData?.relationShipFriendOne ?? '',
				number: firstData?.numberFriendOne ?? ''
			},
			familiarFriendTwo: {
				name: firstData?.nameFriendTwo ?? '',
				relationShip: firstData?.relationShipFriendTwo ?? '',
				number: firstData?.numberFriendTwo ?? ''
			},

			patientInformation:
				{
					...patientInformation,
					address1: editAccountdata?.address1 ?? editAccountdata?.user?.patientInformation?.address1 ?? patientInformation.address1,
					homePhone: editAccountdata?.homePhone ?? editAccountdata?.user?.patientInformation?.homePhone ?? patientInformation.homePhone,
					genderIdentity: {
						id: patientInformation?.genderIdentity,
						value: patientInformation?.genderIdentityLabel == 'Otro' ? 'Other' : patientInformation?.genderIdentityLabel,
						description: patientInformation?.genderIdentityOther
					},
					sexualOrientation: {
						id: patientInformation?.sexualOrientiation,
						value: patientInformation?.sexualOrientiationLabel == 'Otro' ? 'Other' : patientInformation?.sexualOrientiationLabel,
						description: patientInformation?.sexualOrientiationOther
					},
					ethnicity: {
						id: patientInformation?.etnicity,
						value: patientInformation?.etnicityLabel == 'Otro' ? 'Other' : patientInformation?.etnicityLabel,
						description: ""
					},
					race: {
						id: patientInformation?.race,
						value: patientInformation?.raceLabel == 'Otro' ? 'Other' : patientInformation?.raceLabel,
						description: patientInformation?.raceOther
					},
					preferedLanguage: {
						id: patientInformation?.languagePreference,
						value: patientInformation?.languagePreferenceLabel == 'Otro' ? 'Other' : patientInformation?.languagePreferenceLabel,
						description: patientInformation?.languagePreferenceOther
					},
					employmentStatus: {
						id: patientInformation?.employmentStatus,
						value: patientInformation?.employmentStatusLabel == 'Otro' ? 'Other' : patientInformation?.employmentStatusLabel,
						description: ""
					},
					employerName: patientInformation.employerName,
					workPhone: patientInformation?.workPhone,
					contactMethod: 'email',
					emergencyContactName: firstData?.emergencyContactName ?? '',
					emergencyContactLastName: firstData?.emergencyContactLastName ?? '',
					emergencyContactMobile: firstData?.emergencyContactMobile ?? '',
					emergencyContactRelationshipToThePatient: firstData?.emergencyRelationship,
				} ?? '',
			primaryInsuranceInformation: {
				insuranceCompany: secondData.insuranceCompany ?? '',
				companyId: secondData.companyId ?? '',
				planType: secondData.planType ?? '',
				nameOfInsured: secondData.name_of_insured ?? '',
				lastNameOfInsured: secondData.lastname_of_insured ?? '',
				patientRelationshipToInsured: secondData.patient_relationship_to_insured ?? '',
				subscriberId: secondData.subscriber_id ?? '',
				groupId: secondData.group_id ?? '',
				holderInsured: {
					name: secondData?.name_of_insuredH ?? '',
					lastName: secondData?.lastname_of_insuredH ?? '',
					dateOfBirth: secondData.dateOfBirthH ? moment(secondData?.dateOfBirthH).format(FORMATS.date2) : '',
				},
			},
			secondaryInsuranceInformation: {
				insuranceCompany: secondData.insuranceCompany2 ?? '',
				companyId: secondData.companyId2 ?? '',
				planType: secondData.planType2 ?? '',
				nameOfInsured: secondData.name_of_insured2 ?? '',
				lastNameOfInsured: secondData.lastname_of_insured2 ?? '',
				patientRelationshipToInsured: secondData.patient_relationship_to_insured2 ? secondData.patient_relationship_to_insured2 : '',
				subscriberId: secondData.subscriber_id2 ?? '',
				groupId: secondData.group_id2 ?? '',
				holderInsured: {
					name: secondData?.name_of_insuredH2 ?? '',
					lastName: secondData?.lastname_of_insuredH2 ?? '',
					dateOfBirth: secondData.dateOfBirthH2 ? moment(secondData?.dateOfBirthH2).format(FORMATS.date2) : '',
				},
			},
			pharmacyInformation: {
				pharmacy: firstData.pharmacy ?? '',
				zipcode: firstData.zipcode ?? '',
				noFavoritePharmacy: firstData.noFavoritePharmacy,
			},
			healthOptins: {
				email: email,
				phone: phone,
				push: messagePush,
			},
		};

		delete data.patientInformation?.genderIdentityLabel
		delete data.patientInformation?.genderIdentityOther
		delete data.patientInformation?.sexualOrientiationLabel
		delete data.patientInformation?.sexualOrientiationOther
		delete data.patientInformation?.sexualOrientiation
		delete data.patientInformation?.etnicity
		delete data.patientInformation?.etnicityLabel
		delete data.patientInformation?.raceLabel
		delete data.patientInformation?.raceOther
		delete data.patientInformation?.languagePreference
		delete data.patientInformation?.languagePreferenceLabel
		delete data.patientInformation?.languagePreferenceOther
		delete data.patientInformation?.employmentStatusLabel
		// delete data.patientInformation?.emergencyRelationship
		isNewVersion ? delete data?.id : delete data?.authUid

		if (!data.patientInformation?.homePhone) delete data.patientInformation.homePhone
		if (firstData.self) {
			data.responsiblePartyInformation = {
				homePhone: patientInformation.homePhone ?? '',
				email: patientInformation.email ?? '',
				gender: patientInformation.sex ?? '',
				patientRelationshipLabel: firstData.self ? "Self" : "LegalGuardian",
				self: firstData.self,
				guarantor: !firstData.self,
				ssn: firstData.ssn ?? '',
				responsiblePartyFirstName: firstData.guarantorName ?? firstData.firstName ?? '',
				responsiblePartyLastName: firstData.guarantorLast ?? firstData.lastName ?? '',
				relationshipToThePatient: "1",
				reasonToHaveAGuarantor: firstData.reason ?? "",
				guarantorDateOfBirth: moment(firstData.dateOfBirth).format(FORMATS.date2) ?? '',
				mobile: firstData.mobile ?? '',
				address: firstData.address ?? '',
				state: firstData.state ?? '',
				city: firstData.city ?? '',
				zipCode: firstData.zipCode ?? '',
				idFileName: firstData.idFileName ?? '',
				idFile64: firstData.idFile64 ?? '',
				ethnicity: firstData.ethnicity ?? '',
				employmentStatus: {
					id: patientInformation?.employmentStatus,
					value: patientInformation?.employmentStatusLabel == 'Otro' ? 'Other' : patientInformation?.employmentStatusLabel,
					description: ""
				},
				employerName: patientInformation.employerName,
				workPhone: patientInformation?.workPhone,
			}
		} else {
			data.responsiblePartyInformation = {
				homePhone: firstData.homePhone ?? '',
				patientRelationshipLabel: firstData.self ? "Self" : "LegalGuardian",
				guarantorReasonLabel: firstData.guarantorReasonLabel ?? '',
				self: false,
				guarantor: true,
				guarantorSSN: firstData.guarantorSnn ?? '',
				responsiblePartyFirstName: firstData.guarantorName ?? '',
				responsiblePartyLastName: firstData.guarantorLast ?? '',
				relationshipToThePatient: "1",
				reasonToHaveAGuarantor: firstData.reason ?? '',
				guarantorDateOfBirth: moment(firstData.dateOfBirth).format(FORMATS.date2),
				mobile: firstData.mobile ?? '',
				address: firstData.address ?? '',
				state: firstData.state ?? '',
				city: firstData.city ?? '',
				zipCode: firstData.zipCode ?? '',
				idFileName: firstData.idFileName ?? '',
				idFile64: firstData.idFile64 ?? '',
				ethnicity: firstData.ethnicity ?? '',
				employmentStatus: {
					id: patientInformation?.employmentStatus,
					value: patientInformation?.employmentStatusLabel == 'Otro' ? 'Other' : patientInformation?.employmentStatusLabel,
					description: ""
				},
				employerName: patientInformation.employerName,
				workPhone: patientInformation?.workPhone,
			}
		}

		return data;
	},

	mapEnrollDevice: (
		{ authUid, state, tokenFCM, deviceName, deviceSOVersion }: EnrollDevice
	): EnrollDevice => ({
		patientInformation: {
		}
	}),
};

function padTo2Digits(num: number) {
	return num.toString().padStart(2, '0');
}

function formatDate(date: Date) {
	return [
		date.getFullYear(),
		padTo2Digits(date.getMonth() + 1),
		padTo2Digits(date.getDate()),
	].join('-');
}

export default registerMapper;
