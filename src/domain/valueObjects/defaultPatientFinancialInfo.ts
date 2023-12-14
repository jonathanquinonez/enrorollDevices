import moment from "moment";
import { PatientFinancialInfo } from "../entities/patientFinancialInfo";

import FORMATS from 'app/ui-core/utils/formats';

export const DefaultPatientFinancialInfo: PatientFinancialInfo = {
	isFeeSelected: false,
	isCopaySelected: false,
	isIncorrectDataSelected: false,
	isMedicareSelected: false,
	signature: '',
	date: moment().format(FORMATS.date)
};
