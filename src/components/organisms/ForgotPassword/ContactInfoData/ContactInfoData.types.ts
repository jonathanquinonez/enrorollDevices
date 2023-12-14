import { EmailIdentifier } from 'domain/entities/emailIdentifier';
import { REGEX } from 'src/utils/regex';
import * as Yup from 'yup';

/**
 * @interface ContactInfoDataProps
 * @since 1.0.0
 */
export interface ContactInfoDataProps {
   /**
   * Variable that receives the object with the mail to show
   * @since  1.0.0
   */
   formValues: FormValues;
   /**
   * Method called after pressing the submit button
   * @since  1.0.0
   */
   onPress: (data?: EmailIdentifier) => void;
   /**
   * Method to clean the form passing the time to update and clean the data
   * @example resetForm={new Date()}
   * @since  1.0.0
   */
   resetForm: Date;
   actionResetForm: () => Promise<void>
   navigateSupportChat: any;
   idError: boolean;
   isByEmail: (byEmail: boolean | undefined) => void;
   openwarning: () => void;
   statusMaintenance?: string;

}

export interface IsChecked {
   check: boolean;
}

export const IsCheckedYup: Yup.SchemaOf<IsChecked> = Yup.object().shape({

   check: Yup.boolean()
      .notOneOf([false, null], 'required')
      .required('required'),
});


export interface FormValues {
   email: string;
   mobile?: string;
   id?: Object;
   dateOfBirth?: string;
}

