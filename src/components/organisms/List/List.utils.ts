import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';
import { InfLabels } from 'src/components/molecules/Card/CardList/CardList.type';
import FORMATS from 'ui-core/utils/formats';

export const mappingCardList = (
	type: string,
	object: InfLabels[],
	information: any,
	lang?: string,
	location?: string,
) => {
	switch (type) {
		case 'referals':
			return mapReferals(object, information);
		case 'referralsDetails':
			return mapreferralsDetails(object, information);
		case 'register':
			return informationLabel(object, information);
		case 'inmunization':
			return inmunizationLabel(object, information);
		case 'medication':
			return medicationLabel(object, information);
		case 'labs':
			return labsLabel(object, information);
		case 'previus':
			return informationLabelPrevius(object, information, lang as string);
		case 'upcoming':
			return informationLabelUpcoming(object, information, lang as string);
		case 'insurance':
			return informationInsurance(object, information, location);
		default:
			return object;
	}
};

const labsLabel = (object: InfLabels[], information: any) => {
	let res: InfLabels[] = [];

	object.map((item) => {
		item.subTitle = item.id === 1 ? information.clinicalCenter : information.orderDate;
		res.push(item);
	});

	return res;
};

const inmunizationLabel = (object: InfLabels[], information: any) => {
	let res: InfLabels[] = [];

	object.map((item) => {
		item.subTitle =
			item.id === 1
				? information.givenDate
				: item.id === 2
				? information.dose
				: information.manufacturer;

		res.push(item);
	});

	return res;
};

const medicationLabel = (object: InfLabels[], information: any) => {
	let res: InfLabels[] = [];
	object.map((item) => {
		switch (item.id) {
			case 1:
				item.subTitle = information.doses;
				break;
			case 2:
				item.subTitle = information.directions;
				break;
			case 3:
				item.subTitle = information.frequency;
				break;
			case 4:
				item.subTitle = information.startDate;
				break;
			case 5:
				item.subTitle = information.endDate;
				break;
			case 6:
				item.subTitle = information.prescribedBy;
				break;
			default:
				item.subTitle = information.prescribedBy;
				break;
		}
		res.push(item);
	});

	return res;
};
const informationLabel = (object: InfLabels[], information: any) => {
	let res: InfLabels[] = [];
	object.map((item) => {
		switch (item.id) {
			case 1:
				item.subTitle = moment(information.appointmentDate).format(FORMATS.date);
				break;
			case 2:
				item.subTitle = moment(information.startTime, 'hh:mm:ss').format('hh:mm A');
				break;
			case 3:
				item.subTitle = information.medicalCenter;
				break;
			case 4:
				item.subTitle = information.medicalCenterAddress;
				break;
			case 5:
				item.subTitle = information.reason;
				break;
			case 6:
				item.subTitle = information.visitType;
				break;
			default:
				item.subTitle = '';
				break;
		}
		res.push(item);
	});

	return res;
};

const mapreferralsDetails = (object: InfLabels[], information: any) => {
	object.map((item) => {
		switch (item.id) {
			case 1:
				item.subTitle = information.status;
				break;
			case 2:
				item.subTitle = moment(information.startDate).format('MM-DD-YYYY');
				break;
			case 3:
				item.isTitle2 = item.title;
				break;
			case 4:
				item.subTitle = `${information.toFirstName ?? ''} ${information.toLastName ?? ''}`;
				break;
			case 5:
				item.subTitle = information.speciality;
				break;
			case 6:
				item.subTitle = information.toFacilityName;
				break;
			case 7:
				item.subTitle = information.toAddress;
				break;
			case 8:
				item.subTitle = information.toTel;
				break;
			case 9:
				item.isTitle2 = item.title;
				break;
			case 10:
				item.subTitle = information.fromFacilityName;
				break;
			case 11:
				item.subTitle = information.fromFacility;
				break;
			case 12:
				item.subTitle = information.refFromNPI;
				break;
			case 13:
				item.isTitle2 = item.title;
				break;
			case 14:
				item.subTitle = moment(information.startDate).format('MM-DD-YYYY');
				break;
			case 15:
				item.subTitle = moment(information.endDate).format('MM-DD-YYYY');
				break;
			case 16:
				item.subTitle = information.authNo;
				break;
			case 17:
				item.subTitle = information.reason;
				break;
			case 18:
				item.subTitle = information.diagnosisDesc;
				break;
			default:
				item.subTitle = moment(information.startDate).format('MM-DD-YYYY');
				break;
		}
	});
	return object;
};

const mapReferals = (object: InfLabels[], information: any) => {
	object.map((item) => {
		switch (item.id) {
			case 1:
				item.subTitle = `${information.fromFirstName} ${information.fromLastName}`;
				break;
			case 2:
				item.subTitle = information.speciality;
				break;
			case 3:
				item.subTitle = information.toFacilityName;
				break;
			case 4:
				item.subTitle = information.status;
				break;
			case 5:
				item.subTitle = information.authNo;
				break;
			case 6:
				item.subTitle = moment(information.startDate).format('MM-DD-YYYY');
				break;
			default:
				item.subTitle = moment(information.startDate).format('MM-DD-YYYY');
				break;
		}
	});
	return object;
};

const informationLabelUpcoming = (object: InfLabels[], information: any, lang: string) => {
	let objClone = [...object];
	objClone.map((item, index) => {
		const startTime = moment(information.date).format(FORMATS.date2);
		const date = information.startTime;
		const utcDate = `${startTime}T${date}:00Z`;
		const newDate: Date = new Date(utcDate);

		switch (item.id) {
			case 1:
				item.subTitle = moment(newDate).format('dddd, MMMM D, YYYY');
				break;
			case 2:
				item.subTitle = moment(newDate, 'hh:mm:ss').format('hh:mm A');
				break;
			case 3:
				item.subTitle = information.name;
				break;
			case 4:
				item.subTitle = `${information.ufName} ${information.ulName}`;
				break;
			case 5:
				item.subTitle = information.reason;
				break;
			case 6:
				item.subTitle = information.newStatus;
				break;
			case 7:
				item.subTitle = item.subTitle;
				break;
			default:
				item.subTitle = information.startTime;
				break;
		}
	});

	return objClone;
};

const informationLabelPrevius = (object: InfLabels[], information: any, lang: string) => {
	object.map((item) => {
		switch (item.id) {
			case 1:
				item.subTitle = capitalize(
					moment(information.date).locale(lang).format('MMMM D, YYYY'),
				);
				break;
			case 2:
				item.subTitle = `${information.ufName} ${information.ulName}`;
				break;
			case 3:
				item.subTitle = information.name;
				break;
			case 4:
				item.subTitle = moment(information.startTime, 'hh:mm:ss').format('hh:mm A');
				break;
			default:
				item.subTitle = moment(information.startTime, 'hh:mm:ss').format('hh:mm A');
				break;
		}
	});
	return object;
};

const informationInsurance = (object: InfLabels[], information: any, location?: string) => {
	let endMap = false;

	if (
		(location === 'TN' && information?.isTn) ||
		(location === 'FL' && information?.isFb) ||
		information?.isSc
	) {
		endMap = true;
	} else {
		endMap = false;
	}

	const filteredObject = object
		.map((item) => {
			switch (item.id) {
				case 0:
					item.subTitle = information.insuredFirstName
						? information.insuredFirstName + ' ' + information.insuredLastName
						: '';
					break;
				case 1:
					item.subTitle =
						information.insuredRelationshipToPatient ??
						information.subscriberRelationship;
					break;
				case 2:
					item.subTitle = information.memberId;
					break;
				case 3:
					item.subTitle = information.groupId;
					break;
				case 4:
					item.subTitle = information.newStatus;
					break;
				case 5:
					if (information.holderInsuredDto && information.holderInsuredDto.name) {
						item.subTitle = information.holderInsuredDto.name;
					} else {
						return null; 
					}
					break;
				case 6:
					if (information.holderInsuredDto && information.holderInsuredDto.lastName) {
						item.subTitle = information.holderInsuredDto.lastName;
					} else {
						return null;
					}
					break;
				case 7:
					if (information.holderInsuredDto && information.holderInsuredDto.dateOfBirth) {
						item.subTitle = moment(information.holderInsuredDto.dateOfBirth).format(FORMATS.date);
					} else {
						return null;
					}
					break;
				default:
					item.subTitle = information.memberId;
					break;
			}
			return item;
		})
		.filter((item) => {
			return !endMap ? item !== null && item.id !== 4 : item !== null;
		});

	return filteredObject;
};
  
const capitalize = (text: string) => {
	return text
		.split(' ')
		.map(
			(sub: string) =>
				`${sub.substring(0, 1).toUpperCase()}${sub.substring(1, sub.length).toLowerCase()}`,
		)
		.join(' ');
};
