import { StyleProp, ViewStyle } from 'react-native';
import * as Yup from 'yup';
import { REGEX } from 'src/utils/regex';
import { dataInsurance, PaymentTransaction } from 'src/screens/GetCareNow/Payment/ModalBody/ModalBody.types';
/**
 * @interface PaymentScreenProps
 * @since 1.0.0
 */
export interface PaymentScreenProps {
  /**
  *
  * @since  1.0.0
  * @example style={{margin: 5}}
  */
  style?: StyleProp<ViewStyle>;
  ageDataInsurance: dataInsurance | undefined;
  cancelPayment: () => void;
  transactionId: string;
  setAlertErrorMessage: (satus: string) => void;
  closeModal: () => void
}


export const ValidateEmail: Yup.SchemaOf<{email: string}> = Yup.object().shape({
	email: Yup.string().required('required').matches(REGEX.email, 'invalidEmail'),
});
