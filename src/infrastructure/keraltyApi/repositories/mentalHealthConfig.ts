/* eslint-disable arrow-body-style */
/* eslint-disable semi */
/* eslint-disable quotes */
import { Method } from 'axios';

type Endpoint = { url: string; method: Method; body?: any };

export const mentalHealthEndpoint = 'mental-health';

const mentalHealthConfig = {
	getAllBaseInfo: (): Endpoint => ({
		method: 'get',
		url: "educational/getAllBaseInfo",
	}),
	getAllDirectoryInfo: (): Endpoint => ({
		method: 'get',
		url: "educational/getAllDirectoryInfo/parent/true",
	}),
	getFile: (data: { uuid: string }): Endpoint => ({
		method: 'get',
		url: `educational/getFile/${data.uuid}`,
	}),
};

export default mentalHealthConfig;
