export interface userUnblockAccount {
	name: string;
	surname: string;
	email: string;
	mobile?: string;
}; 

export interface userOptonValidate {
	email: string;
	phoneNumber: string;
	name: string;
	idBelongState?: object;
	isEnglish?: boolean;
	byEmail?: boolean;
}; 

export interface userReSendCodeMsj {
	email: string;
	phoneNumber: string;
	name: string;
	idBelongState?: object;
	isEnglish?: boolean;
	byEmail?: boolean;
};

export interface userSendCode {
	code: string;	
	tempSessionId?: string;
	state: string;
};

export interface userSendPass {
	pass: string;	
	idBelongState?: object;
	code: any;
}; 

export interface getTimeCodeExpired {
	email: string;
	state: string;
};