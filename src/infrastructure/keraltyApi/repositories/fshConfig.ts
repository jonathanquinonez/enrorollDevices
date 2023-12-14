import { Method } from 'axios';

type Endpoint = { url: string; method: Method; body?: any };
export type Object = { 
	comments: string, date: Date, email: string, idEcw: string, inEnglish: true, mobile: string, name: string, state: string
};
export const mentalHealthEndpoint = 'auth/mental-health';

const fshConfig = {
	sendMail: (body: Object): Endpoint => ({
		method: 'post',
		url: `sendEmail`,
		body
	}),
};

export default fshConfig;
