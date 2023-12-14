/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-extra-semi */
import { Method } from 'axios';


type Endpoint = { url: string; method: Method; body?: any };

const GeneralConfig = {
	serverDate: (): Endpoint =>
		({ method: 'get', url: 'core/general/serverDate' }),
	maintenance: (): Endpoint =>
		({ method: 'get', url: 'params/maintenance/info',  }),
};

export default GeneralConfig;
