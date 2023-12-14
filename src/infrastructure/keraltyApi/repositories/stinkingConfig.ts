import { Method } from 'axios';

type Endpoint = { url: string; method: Method; body?: any };
type Object = { authUi: string; state: string };
export const stinkingEndpoint = 'mental-health';

const stinkingConfig = {
	getStinkingCards: (): Endpoint => ({
		method: 'get',
		url: `stinking-thinking`,
	}),
};

export default stinkingConfig;
