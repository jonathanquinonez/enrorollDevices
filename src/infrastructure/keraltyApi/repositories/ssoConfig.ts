/* eslint-disable arrow-body-style */
/* eslint-disable semi */
/* eslint-disable quotes */
import { Method } from 'axios';

type Endpoint = { url: string; method: Method; body?: any };

const SSOConfig = {
	ssoAuth: (body: any): Endpoint =>
		({ method: 'get', url: `ssoToken`}),
};

export default SSOConfig;
