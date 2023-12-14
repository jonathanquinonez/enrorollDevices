/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-extra-semi */
import { Method } from 'axios';

type Endpoint = { url: string; method: Method; body?: any };

export const authEndpoint = 'vitalsign';

const VitalSignConfig = {
	// AUTHENTICATION
	generateUrl: (body: any): Endpoint =>
		({ method: 'post', url: `keralty/nuralogix`, body }),
};

export default VitalSignConfig;
