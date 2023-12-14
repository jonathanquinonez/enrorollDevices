/* eslint-disable prefer-const */
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { MaybePromise } from '@reduxjs/toolkit/dist/query/tsHelpers';
import axios, { AxiosRequestConfig, AxiosError, Method } from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { ASYNC_STORAGE } from 'config/constants/Global';

type AxiosHeaders = typeof axios.defaults.headers;
type AxiosQueryOptions = {
	baseUrl: string;
	prepareHeaders?: (headers: AxiosHeaders, api: Pick<BaseQueryApi, 'getState'>)
		=> MaybePromise<AxiosHeaders>;
};
type AxiosQueryArgs = {
	url: string;
	method: Method;
	body?: AxiosRequestConfig['data'];
};

const customizeHeaders = function (h: any): any {
	let headers = { ...h };

	const set = (key: string, value: string | number) => {
		headers[key] = value;
	};

	return { headers, set };
};

export const axiosBaseQuery =
	({ baseUrl, prepareHeaders }: AxiosQueryOptions): BaseQueryFn<AxiosQueryArgs, unknown, unknown> =>
		async ({ url, method, body: data}, api) => {
			const captcha = await AsyncStorage.getItem(ASYNC_STORAGE.CAPTCHA);
			let headers = axios.defaults.headers.common;
			if(captcha){
				//headers['recaptcha'] = captcha;
			}
			if (prepareHeaders) {
				headers = {
					...(prepareHeaders(customizeHeaders(headers), api) as any).headers,
				};
			}

			try {
				console.log("DATA ======")
				console.log(data)
				console.log("HEADERS ======")
				console.log(headers)
				// console.log(method)
				console.log(baseUrl)
				console.log(url)
				const result = await axios({ method, url: `${baseUrl}/${url}`, data, headers });
				console.log(result.data)
				return { data: result.data };
			} catch (axiosError) {
				
				const error: any = axiosError as AxiosError;
				console.log(error?.response?.data)
				return {
					error: String(error?.response?.data?.code || 999)
				};
			}
		};

