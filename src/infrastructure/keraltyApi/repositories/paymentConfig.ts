/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-extra-semi */
import { Method } from 'axios';
import { CancelTransaction, Transaction } from '../models/paymentModels';

type Endpoint = { url: string; method: Method; body?: any };

export const paymentEndpoint = 'payment';

const PaimentConfig = {
	transaction: (body: Transaction): Endpoint =>
		({ method: 'post', url: `transaction`, body }),
	cancelTransaction: (body: CancelTransaction): Endpoint =>
		({ method: 'post', url: `transaction/cancel-transaction`, body }),
	rejectedTransaction: (body: CancelTransaction): Endpoint =>
		({ method: 'post', url: `transaction/rejected-transaction`, body }),
	init: (body: Transaction): Endpoint =>
		({ method: 'post', url: `${paymentEndpoint}/init`, body }),
	validateInsurance: (body: Transaction): Endpoint =>
		({ method: 'post', url: `${paymentEndpoint}/validate-insurance`, body }),
	paymentIntent: (id: string): Endpoint =>
		({ method: 'post', url: `transaction/payment-intent/${id}` }),

};

export default PaimentConfig;
