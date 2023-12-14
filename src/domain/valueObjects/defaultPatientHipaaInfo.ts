import moment from "moment";
import { PatientHipaaInfo } from "../entities/patientHipaaInfo";

import FORMATS from 'app/ui-core/utils/formats';

export const DefaultPatientHipaaInfo: PatientHipaaInfo = {
	name: '',
	birthdate: '',
	isNoticeSelected: false,
	isReleaseSelected: false,
	isMedStudentSelected: false,
	signature: '',
	date: moment().format(FORMATS.date)
};
