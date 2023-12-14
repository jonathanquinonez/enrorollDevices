import { Method } from 'axios';

type Endpoint = { url: string; method: Method; body?: any };

export const EnrollDeviceEndPoint = 'users';

const EnrollDeviceConfig = {
	createEnrollDevice: (authUid: String, state: String, tokenFCM: String, deviceName: String, deviceSOVersion: String): Endpoint =>
	({
		method: 'post', url: `device`, 
		body: {
			authUid,
			state,
			tokenFCM,
			deviceName,
			deviceSOVersion
		}
	}),

	getEnrollDeviceByToken: (state: String, token: String): Endpoint =>
		({ method: 'get', url: `device/token?state=${state}&token=${token}` }),

	getByEnrollDevices: (state: String): Endpoint =>
		({ method: 'get', url: `device/user?state=${state}`}),

	deleteEnrollDevice: (state: String, authUid: String): Endpoint =>
		({ method: 'post', url: `device/delete/${state}/${authUid}` }),
};

export default EnrollDeviceConfig;