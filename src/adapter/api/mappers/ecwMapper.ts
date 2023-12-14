import moment from 'moment';
import formats from 'ui-core/utils/formats';

// DOMAIN
import { Referral } from 'domain/entities/referral';
import { LabResult } from 'domain/entities/labResult';
import { Immunization } from 'domain/entities/immunization';
import { PastAppointments } from 'domain/entities/pastAppointments';
import { ReferralsCredentialsDTO } from 'infrastructure/keraltyApi/models/ecw';
import { UpcomingResult } from 'domain/entities/upcomingResult';
import { PreviusResult } from 'domain/entities/previusResponse';
import { MedicatonInfo } from 'domain/entities/medicationInfo';

const ecwMapper = {
	mapFromReferrals: (dto: any): Array<ReferralsCredentialsDTO> => {
		const values = dto.map(({ endDate, referralDate, startDate, ...remain }: Referral) => ({
			endDate: moment(endDate).format(formats.date),
			referralDate: moment(referralDate).format(formats.date),
			startDate: moment(startDate).format(formats.date),
			...remain,
		}));
		return values;
	},
	mapFromLabDis: (dto: any): Array<LabResult> => {
		const values = dto.map(({ receivedDate, orderDate, ...remain }: LabResult) => ({
			receivedDate: moment(receivedDate).format(formats.date),
			orderDate: moment(orderDate).format(formats.date),
			...remain,
		}));
		return values;
	},
	mapFromImmunization: (dto: any): Array<Immunization> => {
		const values = dto.map(({ expDate, givenDate, ...remain }: Immunization) => ({
			expDate: moment(expDate).format(formats.date),
			givenDate: moment(givenDate).format(formats.date),
			...remain,
		}));
		return values;
	},
	mapFromMedicaton: (dto: any): Array<MedicatonInfo> => {
		const values = dto.map(({ endDate, startDate, ...remain }: MedicatonInfo) => ({
			endDate: endDate ? moment(endDate).format(formats.date) : '',
			startDate: startDate ? moment(startDate).format(formats.date) : '',
			...remain,
		}));
		return values;
	},
	mapFromPastAppointments: (dto: PastAppointments[]): Array<PastAppointments> => {
		const values = dto.map(({ date, ...remain }) => ({
			date: moment(date, 'YYYY-MM-DD').format(formats.date),
			...remain,
		}));
		return values;
	},
	mapFromUpcomingApointments: (dto: any): Array<UpcomingResult> => {
		const values = dto.map(({ date, ...remain }: UpcomingResult) => ({
			date: moment(date, 'YYYY-MM-DD').format(formats.date),
			...remain,
		}));
		return values;
	},

	mapFromPreviusApointments: (dto: any): Array<PreviusResult> => {
		const values = dto.map(({ date, ...remain }: PreviusResult) => ({
			date: moment(date, 'YYYY-MM-DD').format(formats.date),
			...remain,
		}));
		return values;
	},
};

export default ecwMapper;
