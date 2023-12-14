export interface PatientFinancialInfo {
	isFeeSelected: boolean | undefined;
	isCopaySelected: boolean | undefined;
	isIncorrectDataSelected: boolean | undefined;
	isMedicareSelected: boolean | undefined;
	signature: string;
	date: Date | string;
}
