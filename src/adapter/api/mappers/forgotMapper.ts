// INFRASTRUCTURE
import { UserIdentifierDTO, ChangePasswordDTO } from 'infrastructure/keraltyApi/models/auth';
// DOMAIN
import { UserIdentifier } from 'domain/entities/userIdentifier';
import { ResetPassword } from 'domain/entities/resetPassword';
//

const forgotMapper = {
	// ------------------ Domain Object => Data Transfer Object ------------------ //
	mapToUserIdentifier: (domainObject: UserIdentifier & {states: string[]}): UserIdentifierDTO => {
		const { firstName, lastName, email, states} = domainObject;
		return { name: firstName, surname: lastName, email, states };
	},
	// ------------------ Domain Object => Data Transfer Object ------------------ //
	
	
	// ------------------ Domain Object => Data Transfer Object ------------------ //
	mapToNewPassword: (domainObject: ResetPassword): ChangePasswordDTO => {
		const { resetId, password } = domainObject;
		return { id: resetId, pass: password };
	}
};

export default forgotMapper;
