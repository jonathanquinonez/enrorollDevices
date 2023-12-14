export interface PatientHipaaInfo {
	name: string;
	birthdate: Date | string;
	isNoticeSelected: boolean | undefined;
	isReleaseSelected: boolean | undefined;
	isMedStudentSelected: boolean | undefined;
	signature: string;
	date: Date | string;
}
