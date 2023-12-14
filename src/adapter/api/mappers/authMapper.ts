// INFRASTRUCTURE
import {
	LoginCredentialsDTO, LoadUserBySessionResponseDTO, LoginSecurityDTO, DeleteAccountDTO, UserInformationEdit
} from 'infrastructure/keraltyApi/models/auth';
import { Buffer } from "buffer";

// DOMAIN
import { User } from 'domain/entities/user';
import { LoginCredentials } from 'domain/entities/loginCredentials';
import { deleteAccount } from 'domain/entities/deleteAccount';
//

const authMapper = {
	// ------------------ Domain Object => Data Transfer Object ------------------ //
	mapToLogin: ({ email, password }: LoginCredentials): LoginCredentialsDTO => ({
		email,
		pass: password
	}),
	mapToDelete: ({ email, motive, state }: deleteAccount): DeleteAccountDTO => ({
		email,
		motive,
		state
	}),
	// ------------------ Domain Object => Data Transfer Object ------------------ //
	mapToUserSecurityCredentials: ({ email, password, state, isBiometric }: LoginCredentials): LoginSecurityDTO => {
		const buff = Buffer.from(JSON.stringify({ email: email.trim(), pass: password.trim(), state, isBiometric }));
		const encodedData = buff.toString('base64');
		return {
			info: encodedData
		};
	},
	// ------------------ Domain Object => Data Transfer Object ------------------ //
	mapToUpdateUsersPatientInfo: (value: UserInformationEdit) => {

		return {
			authUid: value?.authUid,
			sexAssignedAtBirth: value?.sex,
			maritalStatus: value?.maritalStatus,
			homePhone: value.homePhone,
			mobile: value.mobile,
			address: value.address,
			zipCode: value.zipCode,
			city: value.city,
			state: value.state,
			employerName: value.employmentStatusLabel,
			// workPhone: value.,
			genderIdentity: {
				id: value.genderIdentity,
				value: value.genderIdentityLabel == 'Otro' ? 'Other' : value.genderIdentityLabel,
				description: value.genderIdentityOther
			},
			sexOrientation: {
				id: value.sexualOrientiation,
				value: value.sexualOrientiationLabel == 'Otro' ? 'Other' : value.sexualOrientiationLabel,
				description: value.sexualOrientiationOther
			},
			ethnicity: {
				id: value.etnicity,
				value: value.etnicityLabel == 'Otro' ? 'Other' : value.etnicityLabel,
				description: ""
			},
			race: {
				id: value.race,
				value: value.raceLabel == 'Otro' ? 'Other' : value.raceLabel,
				description: value.raceOther
			},
			primaryLanguage: {
				id: value.languagePreference,
				value: value.languagePreferenceLabel == 'Otro' ? 'Other' : value.languagePreferenceLabel,
				description: value.languagePreferenceOther
			},
			employmentStatus: {
				id: value.employmentStatus,
				value: value.employmentStatusLabel == 'Otro' ? 'Other' : value.employmentStatusLabel,
				description: ""
			}
		}
			;
	},
	// ------------------ Data Transfer Object => Domain Object ------------------ //
	mapFromLoadUserBySession: (dto: LoadUserBySessionResponseDTO): User => {
		const { dateOfBirth, mobile, ...restPatientoInfo } = dto.patientInformation;
		return {
			authUid: dto.authUid,
			id: dto.id,
			ecwId: dto.idEcw,
			externalPartyId: dto.externalPartyId,
			role: dto.role,
			info: {
				birthdate: dateOfBirth,
				phone: mobile,
				...restPatientoInfo
			}
		};
	}
};

export default authMapper;
