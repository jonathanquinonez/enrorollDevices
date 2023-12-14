import appConfig from 'config/index';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './httpClient';
import registerMapper from './mappers/registerMapper';
// INFRASTRUCTURE
import AuthConfig, { authEndpoint } from 'infrastructure/keraltyApi/repositories/authConfig';
// DOMAIN
import { validateAccountContact } from 'domain/entities/validateAccountContact';
import { videoCallRegistry } from 'domain/entities/videoCallRegistry';
import { AvailityCoverage, AvailityCoverageInsurance, ParametersHint, ParametersPartialRecord, ParamsConsents, ReSendRecoverEmailInitialSave, TriesToBlock, Validateviacode } from 'infrastructure/keraltyApi/models/auth';
//

export const registerApi = createApi({
	baseQuery: axiosBaseQuery({
		baseUrl: `${appConfig.API_URL}/${authEndpoint}`,
		prepareHeaders: (headers: any, { getState }) => {
			const { token } = (getState() as any).user;
			headers.set('Authorization', `Bearer ${token ? token : appConfig.PUBLIC_API_TOKEN}`);
			headers.set('Content-Type', 'application/json');
			headers.set('recaptcha', "03AGdBq26Jdo7Qob1O9m4xcCHdLoV9uS75dIW4neNgfDkC1turMf_9I2OGZXinG8Ys7sbkfqYU_MXFT1QVoIxOCIpValAOqcvYjGKRmQ-NDWE-imfE3x9pTOi2WnsBqjg75vJDdAQy5Jo9wr-J811F6lNZOfoLSBvf-NM4rjuSrDOILkYY0vxDH3XOJysmXes1jO1zDXbocLMUNRdTx295t2RCAFMLuj_i7zCcmi-S5iWhMc64M32sZcHzgY8xxJci0qRjoFgW7uGzUCQ6VURO8_Ko4OJQE7ea1xSPNa97p68i3U0QcxV1tcOJsiXczeMo3kzu9TaRozdDz3TU99SmSslUnpY34WsK37CNiBz9HnaHJuBOocbEpojjCMH2xk51J170nxmkGnYNpqg-pEAPlhB9PT5TZJL0764bou9Ii5LTkf42O7KSBvUu4pAXzpEa9YcKyaIRoTk52UhJomlqVqJLX9ZZJAhgM7PbwScc040VuqI9FYcDsvLlFP__70Te80DAJ1B948cnfuYAU9LtufkBg7cHmJm96k6mOh12KF5F-FzeWAXaV2EAzHPU3A8fZ843FkVVdHtZ9B0fDp1t6EZBAKoa-tNPAC5WKParOZmrvabu7rQX3j8vCRJayL_ZufbaNLYTRxnSOzstDNP1xTFegEd3McafmOW-P2YoxuU3G58gbozeEnNPSzBOiO1i7vsOL25BKmIbyqQOeTDwveZy9J8uUeXti8GZMPSyCUD5uqw-0yaxuDG3qZUl9Irayp6lt79ocKyFnRcsvrPvToV2mhbLGEl256XLodE3emFEZ2f9gT0tS8s6v1rxQTzHAwgx6YTCdhTsjy1sE5M9M3-qpprEqJEZK0iYqw9ew2HB1lckyJbRNBZoPIKYFUb8pAgiKCwdpudehE7lK4zC--_G6CJUoxNrI8MEir5E4zHPFEol3oNXKIH5zH7CnWJ1TCqvu93ejhZDl5CjwZHSK56Ed_MazzTv17OOj0rnQo8vZBXpj4x7RhXSNz3REwpKhaJFCeIaJ-Fz56Zb1njNJ2LHWjkxzWU5ekOufBeWYIp46cczltvjt-nNYhH6GtNH99VURJdW1vkB4ggTtFk5_DGR_SnwF-saBI-rrQFw623tKlo5TWci869XxjBMeYGnjBS2PIubVYd1UmRTFdNnEuz805cBcM6PPpIH3ziWrdZTt6OfGnpLgX8p8yMxNoatyGAnOaS64yv")
			return headers;
		},
	}),
	reducerPath: 'registerApi',

	endpoints: (build) => ({
		registrationCheck: build.mutation<any, any>({
			query: (data) => AuthConfig.registrationCheck(
				registerMapper.mapToInitialRegistrationCheck(data)
			)
		}),
		verifyCodeEcw: build.mutation<any, any>({
			query: (data) => AuthConfig.verifyCodeEcw(data)
		}),
		validateAccount: build.mutation<any, any>({
			query: (data) => AuthConfig.validateAccount(
				registerMapper.mapToValidateAccount(data)
			)
		}),
		validateAccountContactMethods: build.mutation<any, validateAccountContact>({
			query: (data) => AuthConfig.validateAccountContactMethods(
				registerMapper.mapToValidateAccountContactMethods(data)
			)
		}),
		matchAccountInfo: build.mutation<any, any>({
			query: (data) => AuthConfig.matchAccountInfo(
				registerMapper.mapMatchAccountInfo(data)
			)
		}),
		loadElegibilityData: build.mutation<any, string>({
			query: (data) => AuthConfig.loadElegibilityData(data)
		}),
		initialSave: build.mutation<any, any>({
			query: (data) => AuthConfig.initialSave(
				registerMapper.mapToInitialSaveMethods(data)
			)
		}),
		triesToBlock: build.mutation<any, TriesToBlock>({
			query: (data) => AuthConfig.triesToBlock(data)
		}),
		reSendRecoverEmailInitialSave: build.mutation<any, ReSendRecoverEmailInitialSave>({
			query: (data) => AuthConfig.reSendRecoverEmailInitialSave(data)
		}),
		resendsmscode: build.mutation<any, any>({
			query: (data) => AuthConfig.resendsmscode(data)
		}),
		initialSaveByAccountNumber: build.mutation<any, any>({
			query: (data) => AuthConfig.initialSaveByAccountNumber(data)
		}),	// 					PENGIND TYPE
		loadUserInfo: build.query<any, { code: string, state: string, email: string }>({
			query: (data) => AuthConfig.loadUserInfo(data),
			transformResponse: (response) => response
		}),
		// 						PENGIND TYPE
		loadMaxUserInfo: build.query<any, Validateviacode>({
			query: (data) => AuthConfig.loadMaxUserInfo(data),
			transformResponse: (response) => registerMapper.mapFromLoadMaxUserInfo(response)
		}),
		loadUserInfoByCode: build.query<any, { code: string, state: string, email: string }>({
			query: (data) => AuthConfig.loadUserInfoByCode(data),
			transformResponse: (response) => response
		}),
		// 						PENGIND TYPE
		loadMaxUserInfoByCode: build.query<any, Validateviacode>({
			query: (data) => AuthConfig.loadMaxUserInfoByCode(data),
			transformResponse: (response) => registerMapper.mapFromLoadMaxUserInfo(response)
		}),
		loadMaxUserInfoSSO: build.query<any, string>({
			query: (data: any) => AuthConfig.loadMaxUserInfoSSO(data),
			transformResponse: (response) => registerMapper.mapFromLoadMaxUserInfo(response)
		}),
		finalSave: build.mutation<any, { isNewVersion:boolean, authUid:any, firstData: any, secondData: any, tempValues: any, email: boolean, phone: boolean, messagePush: boolean, isEnglish: boolean }>({
			query: (data) => AuthConfig.finalSave(
				registerMapper.mapToFinalSave(data)
			)
		}),
		updateConsents: build.mutation<any, { isNewVersion:boolean,  authUid:any, firstData: any, secondData: any, tempValues: any, email: boolean, phone: boolean, messagePush: boolean, isEnglish: boolean }>({
			query: (data) => AuthConfig.updateConsents(
				registerMapper.mapToFinalSave(data)
			)
		}),
		availityCoverage: build.mutation<any, videoCallRegistry & { authUid: string }>({
			query: (data) => AuthConfig.coverage(
				registerMapper.mapToValidateTelevisita(data)
			),
		}),
		availityCoverageInsurance: build.mutation<any, AvailityCoverageInsurance>({
			query: (data) => AuthConfig.coverageInsurance(data),
			transformResponse: (response) => response
		}),
		validateHintForm: build.mutation<any, ParametersHint>({
			query: (data) => AuthConfig.validateHint(data),
			transformResponse: (response) => response
		}),
		partialRecordMethod: build.mutation<any, ParametersPartialRecord>({
			query: (data) => AuthConfig.deletePartialRecord(data),
			transformResponse: (response) => response
		}),
		registerConsentsTime: build.mutation<any, ParamsConsents>({
			query: (data) => AuthConfig.registerConsentsTime(data),
			transformResponse: (response) => response
		}),

	})
});

const RegisterService = registerApi;
export default RegisterService;
