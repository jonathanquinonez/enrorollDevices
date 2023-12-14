import axios from 'axios';
import appconfig from 'config/index';
import { Platform } from 'react-native';

export type vimAutheticationDto = {
	
    memberId: string,
    firstName:string,
    lastName: string,
    email: string,
    dateOfBirth : string,
    phoneNumber:{
       countryDialingCode:string,
       number: string
    }
}

export default function useTokenizeVim( ) {


	const requestTokenize = async (token: string , body : vimAutheticationDto) => {
		return axios({
			method: 'post',
			url: `${appconfig.API_URL}/appointment/tokenize`,
			/*headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ` + token,
			},*/
            data:body
		});
	};

	return {  requestTokenize };
}
