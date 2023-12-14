export interface UserAvaility {
	firstName: string,
    lastName: string,
    birthDate: Date | string,
    memberId: string,
    isActive: boolean,
    authUid?: string
}

export interface UserAvailityForm {
	firstName: string,
    lastName: string,
    birthDate: Date | string,
    memberId: string
}
