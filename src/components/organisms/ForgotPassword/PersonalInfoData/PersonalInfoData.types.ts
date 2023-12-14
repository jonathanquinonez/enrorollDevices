import { FontAwesome } from '@expo/vector-icons';
import { StyleProp, ViewStyle } from 'react-native';
import * as Yup from 'yup';
import { REGEX } from 'src/utils/regex';
import { UserIdentifier } from 'domain/entities/userIdentifier';
import { FormValues } from '../ContactInfoData/ContactInfoData.types';
import { PersonalInfFP } from 'infrastructure/keraltyApi/models/auth';
import { UseFormReset } from 'react-hook-form';
/**
 * @interface PersonalInfoDataProps
 * @since 1.0.0
 */
export interface PersonalInfoDataProps {
   /**
   * Method called after pressing the submit button
   * @since  1.0.0
   */
   onSubmit: (values: FormValues) => void;
   navigateSupportChat: any;
   /**
   * Method to clean the form passing the time to update and clean the data
   * @example resetForm={new Date()}
   * @since  1.0.0
   */
   resetForm: Date;
   position: number;
   actionResetForm: () => Promise<void>;
   openwarning: () => void;
   statusMaintenance?: string;
}

export const PersonalInf: Yup.SchemaOf<PersonalInfFP> = Yup.object().shape({
   email: Yup.string()
      .required('required')
      .min(5, 'min')
      .max(255, 'max')
      .matches(REGEX.email, 'invalidEmail'),
   dateOfBirth: Yup.date().required('required').max(new Date(), 'invalidBirthdate'),
   mobile: Yup.string()
      .required('required')
});
