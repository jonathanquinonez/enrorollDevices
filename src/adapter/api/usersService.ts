import appConfig from 'config/index';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './httpClient';
import forgotMapper from './mappers/forgotMapper';
import authMapper from './mappers/authMapper';
// INFRASTRUCTURE
import UsersConfig, { usersEndpoint } from 'infrastructure/keraltyApi/repositories/usersConfig';
import {
	LoadUserBySession,
	LoadUserBySessionResponseDTO,
} from 'infrastructure/keraltyApi/models/auth';

export const usersApi = createApi({
	baseQuery: axiosBaseQuery({
		baseUrl: `${appConfig.API_URL}/${usersEndpoint}`,
		prepareHeaders: (headers: any, { getState }) => {
			const { token } = (getState() as any).user;
			headers.set('Authorization', `Bearer ${token ? token : appConfig.PUBLIC_API_TOKEN}`);
			headers.set('Content-Type', 'application/json');
			headers.set(
				'recaptcha',
				'03AGdBq26Jdo7Qob1O9m4xcCHdLoV9uS75dIW4neNgfDkC1turMf_9I2OGZXinG8Ys7sbkfqYU_MXFT1QVoIxOCIpValAOqcvYjGKRmQ-NDWE-imfE3x9pTOi2WnsBqjg75vJDdAQy5Jo9wr-J811F6lNZOfoLSBvf-NM4rjuSrDOILkYY0vxDH3XOJysmXes1jO1zDXbocLMUNRdTx295t2RCAFMLuj_i7zCcmi-S5iWhMc64M32sZcHzgY8xxJci0qRjoFgW7uGzUCQ6VURO8_Ko4OJQE7ea1xSPNa97p68i3U0QcxV1tcOJsiXczeMo3kzu9TaRozdDz3TU99SmSslUnpY34WsK37CNiBz9HnaHJuBOocbEpojjCMH2xk51J170nxmkGnYNpqg-pEAPlhB9PT5TZJL0764bou9Ii5LTkf42O7KSBvUu4pAXzpEa9YcKyaIRoTk52UhJomlqVqJLX9ZZJAhgM7PbwScc040VuqI9FYcDsvLlFP__70Te80DAJ1B948cnfuYAU9LtufkBg7cHmJm96k6mOh12KF5F-FzeWAXaV2EAzHPU3A8fZ843FkVVdHtZ9B0fDp1t6EZBAKoa-tNPAC5WKParOZmrvabu7rQX3j8vCRJayL_ZufbaNLYTRxnSOzstDNP1xTFegEd3McafmOW-P2YoxuU3G58gbozeEnNPSzBOiO1i7vsOL25BKmIbyqQOeTDwveZy9J8uUeXti8GZMPSyCUD5uqw-0yaxuDG3qZUl9Irayp6lt79ocKyFnRcsvrPvToV2mhbLGEl256XLodE3emFEZ2f9gT0tS8s6v1rxQTzHAwgx6YTCdhTsjy1sE5M9M3-qpprEqJEZK0iYqw9ew2HB1lckyJbRNBZoPIKYFUb8pAgiKCwdpudehE7lK4zC--_G6CJUoxNrI8MEir5E4zHPFEol3oNXKIH5zH7CnWJ1TCqvu93ejhZDl5CjwZHSK56Ed_MazzTv17OOj0rnQo8vZBXpj4x7RhXSNz3REwpKhaJFCeIaJ-Fz56Zb1njNJ2LHWjkxzWU5ekOufBeWYIp46cczltvjt-nNYhH6GtNH99VURJdW1vkB4ggTtFk5_DGR_SnwF-saBI-rrQFw623tKlo5TWci869XxjBMeYGnjBS2PIubVYd1UmRTFdNnEuz805cBcM6PPpIH3ziWrdZTt6OfGnpLgX8p8yMxNoatyGAnOaS64yv',
			);
			return headers;
		},
	}),
	reducerPath: 'usersApi',
	endpoints: (build) => ({
		getPersonalInfo: build.mutation<any, { authUid: string; state: string }>({
			query: (data) => UsersConfig.getPersonalInfo(data),
		}),
		onboardingValueByEmail: build.mutation<any, { email: string; state: string }>({
			query: (data) => UsersConfig.onboardingValueByEmail(data),
		}),
		updateOnboardingByEmail: build.mutation<any, { email: string; state: string }>({
			query: (data) => UsersConfig.updateOnboardingByEmail(data),
		}),
		notificationsSetting: build.mutation<any, { state: string }>({
			query: (data) => UsersConfig.notificationsSetting(data),
		}),
		userData: build.mutation<any, LoadUserBySession>({
			query: (data) => UsersConfig.userData(data),
		}),
		getEmergencyContactData: build.query<any, { id: string; state: string }>({
			query: (data) => UsersConfig.getEmergencyContactData(data),
		}),
		createNotifications: build.mutation<any, any>({
			query: (data) => UsersConfig.createNotifications(data),
		}),
		updateNotifications: build.mutation<any, any>({
			query: (data) => UsersConfig.updateNotifications(data),
		}),
		notificationApp: build.mutation({
			query: (data) => UsersConfig.notificationApp(data),
		}),
		createNotificationApp: build.mutation<any, any>({
			query: (data) => UsersConfig.createNotificationApp(data),
		}),
		remindLaterUndo: build.mutation<any, { id: string; state: string }>({
			query: (data) => UsersConfig.remindLaterUndo(data.id, data.state),
		}),
		notificationViewAll: build.mutation({
			query: (data) => UsersConfig.notificationViewAll(data),
		}),
		remindLater: build.mutation<any, { id: string; state: string }>({
			query: (data) => UsersConfig.remindLater(data.id, data.state),
		}),
		deleteNotification: build.mutation<any, { id: string; state: string }>({
			query: (data) => UsersConfig.deleteNotification(data.id, data.state),
		}),
	}),
});
const UsersService = usersApi;
export default UsersService;
