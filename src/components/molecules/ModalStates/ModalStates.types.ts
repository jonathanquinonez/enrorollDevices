import { StyleProp, ViewStyle } from 'react-native';
import * as Yup from 'yup';

/**
 * @interface ModalStatesProps
 * @since 1.0.0
 */
export interface ModalStatesProps {
  /**
  * @since  1.0.0
  * @example style={{margin: 5}}
  */
  style?: StyleProp<ViewStyle>;
  /**
  * @since  1.0.0
  * @example listStates={['FL','TN']}
  */
  listStates: string[]
  /**
  * @since  1.0.0
  * @example closeModal={closeModal}
  */
  closeModal: () => void
  /**
  * @since  1.0.0
  * @example state={console.log}
  */
  state: (state: string) => void
}

export const StatesInfo: Yup.SchemaOf<{ states: string }> = Yup.object().shape({
  states: Yup.string().required('required'),
});

export interface ListStatesType {
  key: number,
  label: string,
  value: string
}