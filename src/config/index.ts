import baseConfig from './base.config.json';
import development from './dev.config.json';
import qa from './qa.config.json';
import uat from './uat.config.json';
import production from './prod.config.json';
import nodeKeys from './node_keys.json';
import Config from 'react-native-config';

const getValues = (configObj: any, dataObj: any) => {
	for (const prop in configObj) {
		const envName = configObj[prop];
		if (typeof envName === 'string' || envName instanceof String) {
			const envValue = process.env[envName as string];
			if (envValue) dataObj[prop] = envValue;
		} else if (envName && dataObj[prop]) {
			getValues(envName, dataObj[prop]);
		} else {
			dataObj[prop] = {};
			getValues(envName, dataObj[prop]);
		}
	}
};

const validateEnv = () => {
	const envNode = Config.APP_ENV;
	console.log('Environment', envNode?.toString());
	switch (true) {
		case envNode === 'dev':
			return qa;
		case envNode === 'qal':
			return qa;
		case envNode === 'uat':
			return uat;
		case envNode === 'prd':
			return production;
		default:
			return qa;
	}
};

export default validateEnv();
