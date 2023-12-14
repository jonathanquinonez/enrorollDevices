import axios from 'axios';
import appconfig from 'config/index';
import { Platform } from 'react-native';

export type senslyAutheticationDto = {
	locale: string
    
}

export default function useTokenizeSensly( ) {


	const requestTokenize = async (token: string , body : senslyAutheticationDto) => {
		return axios({
			method: 'post',
			url: `${appconfig.API_URL}/auth/sensely/authenticate`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ` + token,
			},
            data:body
		});
	};

	return {  requestTokenize };
}
