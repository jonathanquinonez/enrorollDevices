export interface User {
	authUid?: string;
	id?: string;
	ecwId?: string;
	externalPartyId?: string;
	role?: string;
	info?: {
		[key: string]: any;
	} | any;
};
