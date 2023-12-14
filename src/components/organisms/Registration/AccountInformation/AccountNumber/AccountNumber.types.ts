import { AccountInfo } from "domain/entities/accountInfo";
import * as Yup from 'yup';
import { REGEX } from 'src/utils/regex';

/**
 * @interface AccountNumberProps
 * @since 1.0.0
 */
export interface AccountNumberProps {
	setAsyncError: React.Dispatch<React.SetStateAction<string | undefined>>;
	handleNext: (value: any, num: number) => void;
	actionResetForm: () => Promise<void>
	openwarning: () => void;
	statusMaintenance?: string; 
	setAccountInfo: React.Dispatch<React.SetStateAction<{
		accountNumber: string;
		dateOfBirth: string;
		isFBMax: boolean;
		id: string;
	}>>
}

export const AccountInf: Yup.SchemaOf<AccountInfo> = Yup.object().shape({
	dateOfBirth: Yup.date().required('required').max(new Date(), 'invalidBirthdate'),
	accountNumber: Yup.string().required('required'),
});
