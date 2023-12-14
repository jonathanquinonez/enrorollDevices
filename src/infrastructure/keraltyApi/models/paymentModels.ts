export type Transaction = {
	authUid: string,
	state: string,
	token: string,
	service: string,
}

export type CancelTransaction = {
	authUid: string,
	state: string,
	service: string,
}