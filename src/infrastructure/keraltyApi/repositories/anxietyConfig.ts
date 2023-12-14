import { Method } from 'axios';

type Endpoint = { url: string; method: Method; body?: any };
type Object = { authUi: string; state: string };
export const mentalHealthEndpoint = 'mental-health';

const anxietyConfig = {
	getMyAnxiety: (obj: Object): Endpoint => ({
		method: 'get',
		url: `anxiety/byUser?authUid=${obj.authUi}&state=${obj.state}`,
	}),
	getMyAnxietyParams: (type : string): Endpoint => ({
		method: 'get',
		url: `anxiety-parameters/name-type/${type}`,
	}),
	setDataParams: (data : object): Endpoint => ({
		method: 'post',
		url: `anxiety/`,
		body: data
	}),  
};

export default anxietyConfig;