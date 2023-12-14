import { ReactElement } from 'react';

/**
 * @interface ModalPaymentsProviderProps
 * @since 1.0.x
 */
export interface ModalPaymentsProviderProps {
  /**
   * Description of the property
   * @since  1.0.x
   * @example property='Some example value'
   */
  // property: string;
}

export interface SetBottomSheetProps {
  /**
   * Custom component to render in the body, this overrides the text property
   * @since 1.0.0
   * @example render: <Text>Hello!</Text>
   */
  render?: () => ReactElement;
  /**
   * True if the backdrop can be used to close the modal.
   * @since 1.0.0
   * @default true
   */
  backDropDismiss?: boolean;
  /**
   * Method called after pressing the backdrop or the primary button if no method is provided for it
   * @since 1.0.0
   * @example onClose: ()=>{}
   */
  onClose?: () => void;
  /**
   * Custom heigth for the component
   * @since 1.0.0
   * @default 45% of the screen
   */
  height?: number;

  /**
   * option for block modal
   * @since 1.0.0
   * @default false
   */
  blockModal?: boolean;
}

export interface BottomSheetContextProps {
  /**
   * Open the modal with the properties passed
   * @since 1.0.0
   */
  setModal2: (values: SetBottomSheetProps) => void;
  /**
   * Closes the current opened modal
   * @since 1.0.0
   */
  closeModal2: () => void;
}
