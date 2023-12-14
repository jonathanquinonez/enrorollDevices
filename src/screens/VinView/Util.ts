import { IUtil } from "./Util.type";
import appConfig from 'config/index';

export const getConfigValues = ( props : IUtil) =>

 {
    const { lang , memberToken , userData } = props;

	const api_key = appConfig['VIM_API_KEY'];
	const environment =  appConfig['VIM_ENVIRONMENT'] ;


	return {
		api_key,
		environment,
		lang,
		memberToken,
		userData
	};
};

