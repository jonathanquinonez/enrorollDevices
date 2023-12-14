import { DocumentResult } from 'expo-document-picker';
import { StyleProp, ViewStyle } from 'react-native';

/**
 * @interface FileUploadProps
 * @since 1.0.0
 */
export interface FileUploadProps {
  /**
   * Placeholder text to show in the input
   * @since  1.0.0
   * @example placeholder='Attach some documents'
   */
  placeholder: string;
  /**
   * Helper text to show in an the bottom on the input
   * @since 1.0.0
   * @example helperText='Allowed types JPG, PDF'
   */
  helperText?: string;
  /**
   * Method called after selecting a file from the device
   * @since 1.0.0
   * @example onChange={(doc)=>console.log(doc.uri)}
   */
  onChange?: (document: DocumentResult) => void;
  /**
   * Component styles
   * @since 1.0.0
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Value for controlled component
   * @since 1.0.0
   */
  value?: DocumentResult;
}
