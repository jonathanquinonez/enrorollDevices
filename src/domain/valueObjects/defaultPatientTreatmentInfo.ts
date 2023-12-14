import moment from "moment";
import { PatientTreatmentInfo } from "../entities/patientTreatmentInfo";

import FORMATS from 'app/ui-core/utils/formats';

export const DefaultPatientTreatmentInfo: PatientTreatmentInfo = {
	isSanitasPatient: false,
	isServiceSelected: false,
	isResultsSelected: false,
	isAcknowledgeSelected: false,
	isConsentSelected: false,
	signature: '',
	date: moment().format(FORMATS.date)
};
