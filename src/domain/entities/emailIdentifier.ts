export interface EmailIdentifier {
    email: string;
    phoneNumber: string | null | undefined;
    idBelongState: any;
    isEnglish: boolean;
    byEmail: boolean
};
export interface ValidationCodeFP {
    code: string
    tempSessionId: string
    state: string
};

interface IdBelongState {
	FL?: string;
	TN?: string;
}
