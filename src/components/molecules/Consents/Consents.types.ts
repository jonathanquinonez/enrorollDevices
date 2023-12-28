import { TempFormUser } from 'domain/entities/tempFormUser';
import { REGEX } from 'src/utils/regex';
import * as Yup from 'yup';
/**
 * @interface ConsentsProps
 * @since 1.0.0
 */
export interface ConsentsProps {
    handlerNext: () => void;
    openwarning: () => void;
    firstData: any;
    statusMaintenance: "in_maintenance" | "upcoming_maintenance" | "no" | undefined;
    secondData: any;
}

export interface ConsentsList {
    email: boolean,
    phone: boolean,
    messagePush: boolean,
    accepted1: boolean,
    accepted2: boolean,
    accepted3: boolean,
    accepted4: boolean,
    accepted5: boolean,
    accepted6: boolean,
    accepted7: boolean,
    accepted8: boolean,
    accepted9: boolean,
    firm: string,
    date: Date,
    consentHippa?:boolean,
};

export const ConsentsYup: Yup.SchemaOf<ConsentsList> = Yup.object().shape({
    email: Yup.boolean()
        .required('required'),
    phone: Yup.boolean()
        .required('required'),
    messagePush: Yup.boolean()
        .required('required'),
    accepted1: Yup.boolean()
        .oneOf([true], 'required')
        .required('required'),
    accepted2: Yup.boolean()
        .oneOf([true], 'required')
        .required('required'),
    accepted3: Yup.boolean()
        .oneOf([true], 'required')
        .required('required'),
    accepted4: Yup.boolean()
        .oneOf([true], 'required')
        .required('required'),
    accepted5: Yup.boolean()
        .oneOf([true], 'required')
        .required('required'),
    accepted6: Yup.boolean()
        .oneOf([true], 'required')
        .required('required'),
    accepted7: Yup.boolean()
        .oneOf([true], 'required')
        .required('required'),
    accepted8: Yup.boolean()
        .oneOf([true], 'required')
        .required('required'),
    accepted9: Yup.boolean()
        .oneOf([true], 'required')
        .required('required'),
    firm: Yup.string()
        .required('required')
        .min(3, 'min')
        .max(255, 'max'),
    date: Yup.date()
    .required('required'),
    consentHippa: Yup.boolean()
    .nullable()
    .notRequired()
});
