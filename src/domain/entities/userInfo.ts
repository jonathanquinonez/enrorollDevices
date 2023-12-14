
import { UserBasicInfo } from './userBasicInfo';
import { UserComplementaryInfo } from './userComplementaryInfo';
import { UserContactMethods } from './userContactMethods';
import { UserConfirmCredentials } from './userConfirmCredentials';

export interface UserInfo extends UserBasicInfo, UserComplementaryInfo, UserConfirmCredentials, UserContactMethods {
	relationship?: string;
	externalPartyId?: string;
	isFBMax?: boolean;
	hadSanitas?: boolean;
	hasAccountNumber?: boolean;
	accountNumber?: string;
	emailDisabled?: boolean;
	phoneDisabled?: boolean;
};
