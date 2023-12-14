import { StyleProp, ViewStyle } from 'react-native';

/**
 * @interface ModalForgotStateProps
 * @since 1.0.0
 */
export interface ModalForgotStateProps {
  /**
  * @since  1.0.0
  * @example closeModal={closeModal}
  */
  closeModal: () => void;
  handlerNext: () => void;
  setOpen: (state: boolean) => void;
  setError: (state: boolean) => void;
  stateCheckbox: (num: number) => void;
  inputA: boolean;
  showError: boolean;
  inputB: boolean;
}