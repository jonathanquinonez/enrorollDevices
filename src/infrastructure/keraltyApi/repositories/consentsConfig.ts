import { Method } from 'axios';

type Endpoint = { url: string; method: Method; body?: any };

export const ConsentsEndPoint = 'ecw/general/';

const ConsentsConfig = {
	getGenders: (language: string): Endpoint =>
		({ method: 'get', url: `gender/${language}` }),
	getSexualOrientation: (language: string): Endpoint =>
		({ method: 'get', url: `sexualOrientation/${language}` }),
	getEthnicity: (language: string): Endpoint =>
		({ method: 'get', url: `ethnicity/${language}` }),
	getRace: (language: string): Endpoint =>
		({ method: 'get', url: `race/${language}` }),
	getPreferedLanguage: (language: string): Endpoint =>
		({ method: 'get', url: `preferedLanguage/${language}` }),
	getGuarantorEmployment: (language: string): Endpoint =>
		({ method: 'get', url: `guarantorEmployment/${language}` }),
	getDoYouHave: (language: string): Endpoint =>
		({ method: 'get', url: `doYouHave/${language}` }),
	getEmergencyContact: (language: string): Endpoint =>
		({ method: 'get', url: `emergency-contact/${language}` }),
};

export default ConsentsConfig;