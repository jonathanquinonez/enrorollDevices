import appConfig from 'config/index';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './httpClient';
import authMapper from './mappers/authMapper';
// INFRASTRUCTURE
import AuthConfig, { authEndpoint } from 'infrastructure/keraltyApi/repositories/authConfig';
import { LoadUserBySessionResponseDTO, LoginResponseDTO, DeleteAccountDTO, UpdateMyInsurace, LoadUserBySession, CodeState, CheckTermsAndPrivacyVersion, UpdateTermsAndPrivacyVersion, InsuranceDto } from 'infrastructure/keraltyApi/models/auth';
// DOMAIN
import { LoginCredentials } from 'domain/entities/loginCredentials';
import { deleteAccount } from 'domain/entities/deleteAccount';
//


export const authApi = createApi({
	baseQuery: axiosBaseQuery({
		baseUrl: `${appConfig.API_URL}/${authEndpoint}`,
		prepareHeaders: (headers: any, { getState }) => {
			const { token } = (getState() as any).user;
			headers.set('Authorization', `Bearer ${token ? token : appConfig.PUBLIC_API_TOKEN}`);
			headers.set('Content-Type', 'application/json');
			headers.set('recaptcha', "03AGdBq26Jdo7Qob1O9m4xcCHdLoV9uS75dIW4neNgfDkC1turMf_9I2OGZXinG8Ys7sbkfqYU_MXFT1QVoIxOCIpValAOqcvYjGKRmQ-NDWE-imfE3x9pTOi2WnsBqjg75vJDdAQy5Jo9wr-J811F6lNZOfoLSBvf-NM4rjuSrDOILkYY0vxDH3XOJysmXes1jO1zDXbocLMUNRdTx295t2RCAFMLuj_i7zCcmi-S5iWhMc64M32sZcHzgY8xxJci0qRjoFgW7uGzUCQ6VURO8_Ko4OJQE7ea1xSPNa97p68i3U0QcxV1tcOJsiXczeMo3kzu9TaRozdDz3TU99SmSslUnpY34WsK37CNiBz9HnaHJuBOocbEpojjCMH2xk51J170nxmkGnYNpqg-pEAPlhB9PT5TZJL0764bou9Ii5LTkf42O7KSBvUu4pAXzpEa9YcKyaIRoTk52UhJomlqVqJLX9ZZJAhgM7PbwScc040VuqI9FYcDsvLlFP__70Te80DAJ1B948cnfuYAU9LtufkBg7cHmJm96k6mOh12KF5F-FzeWAXaV2EAzHPU3A8fZ843FkVVdHtZ9B0fDp1t6EZBAKoa-tNPAC5WKParOZmrvabu7rQX3j8vCRJayL_ZufbaNLYTRxnSOzstDNP1xTFegEd3McafmOW-P2YoxuU3G58gbozeEnNPSzBOiO1i7vsOL25BKmIbyqQOeTDwveZy9J8uUeXti8GZMPSyCUD5uqw-0yaxuDG3qZUl9Irayp6lt79ocKyFnRcsvrPvToV2mhbLGEl256XLodE3emFEZ2f9gT0tS8s6v1rxQTzHAwgx6YTCdhTsjy1sE5M9M3-qpprEqJEZK0iYqw9ew2HB1lckyJbRNBZoPIKYFUb8pAgiKCwdpudehE7lK4zC--_G6CJUoxNrI8MEir5E4zHPFEol3oNXKIH5zH7CnWJ1TCqvu93ejhZDl5CjwZHSK56Ed_MazzTv17OOj0rnQo8vZBXpj4x7RhXSNz3REwpKhaJFCeIaJ-Fz56Zb1njNJ2LHWjkxzWU5ekOufBeWYIp46cczltvjt-nNYhH6GtNH99VURJdW1vkB4ggTtFk5_DGR_SnwF-saBI-rrQFw623tKlo5TWci869XxjBMeYGnjBS2PIubVYd1UmRTFdNnEuz805cBcM6PPpIH3ziWrdZTt6OfGnpLgX8p8yMxNoatyGAnOaS64yv")
			return headers;
		}
	}),
	reducerPath: 'authApi',
	endpoints: (build) => ({
		login: build.mutation<LoginResponseDTO, LoginCredentials>({
			query: (data) => AuthConfig.login(
				authMapper.mapToLogin(data)
			)
		}),
		delete: build.mutation<string, deleteAccount>({
			query: (data) => AuthConfig.delete(
				authMapper.mapToDelete(data)
			)
		}),
		loginSecurity: build.mutation<LoginResponseDTO, LoginCredentials>({
			query: (data) => AuthConfig.loginSecurity(
				authMapper.mapToUserSecurityCredentials(data)
			)
		}),
		updateUsersPatientInfo: build.mutation<any, any>({
			query: (data) => AuthConfig.updateUsersPatientInfo(
				authMapper.mapToUpdateUsersPatientInfo(data)
			)
		}),
		loadUserBySession: build.query<any, LoadUserBySession>({
			query: (data) => AuthConfig.loadUserBySession(data),
			transformResponse(response: LoadUserBySessionResponseDTO) {
				return authMapper.mapFromLoadUserBySession(response);
			}
		}),
		validatesession: build.mutation<any, LoadUserBySession>({
			query: (data) => AuthConfig.validatesession(data),
			transformResponse(response: LoadUserBySessionResponseDTO) {
				return authMapper.mapFromLoadUserBySession(response);
			}
		}),
		validatesession2: build.mutation<any, LoadUserBySession>({
			query: (data) => AuthConfig.validatesession(data),
			transformResponse: (response) => response
		}),
		senselyAuthentication: build.mutation<any, any>({
			query: (data) => AuthConfig.senselyAuthentication(data)
		}),
		updateMyInsurance: build.mutation<any, UpdateMyInsurace>({
			query: (data) => AuthConfig.updateInsurance(data),
			transformResponse: (response) => response
		}),
		checkAnnualVisitCode: build.mutation<string, CodeState>({
			query: (data) => AuthConfig.checkAnnualVisitCode(data),
		}),
		updateAnnualVisitCode: build.mutation<string, CodeState>({
			query: (data) => AuthConfig.updateAnnualVisitCode(data)
		}),
		doLoginAllStates: build.mutation<any, any>({
			query: (data) => AuthConfig.doLoginAllStates(data)
		}),
		checkTermsAndPrivacyVersion: build.mutation<any, CheckTermsAndPrivacyVersion>({
			query: (data) => AuthConfig.checkTermsAndPrivacyVersion(data)
		}),
		updateTermsAndPrivacyVersion: build.mutation<any, UpdateTermsAndPrivacyVersion>({
			query: (data) => AuthConfig.updateTermsAndPrivacyVersion(data)
		}),
		fetchInformationInsurance : build.mutation<any, InsuranceDto>({
			query: (data) => AuthConfig.getInsuranceProviderInformation(data.authUid , data.state),
		}),
		fetchVerifyEmailAndMobile: build.mutation<any, any>({
			query: (data) => AuthConfig.verifyEmailAndMobile(data)
		}),
		fetchRequestCodeEmailMobile: build.mutation<any, any>({
			query: (data) => AuthConfig.requestCodeEmailMobile(data)
		}),
		sendConfirmCode: build.mutation<any, any>({
			query: (data) => AuthConfig.confirmCode(data)
		}),
	})
});

const AuthService = authApi;
export default AuthService;
