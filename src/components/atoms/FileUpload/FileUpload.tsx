import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { t } from 'i18next';

// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { FileUploadProps as Props } from './FileUpload.types';
import componentStyles from './FileUpload.styles';

/**
 * Render a fileUpload.
 * @since 1.0.x
 */
const FileUpload: React.FC<Props> = (props) => {
  const { placeholder, helperText, onChange, style, value } = props;
  const { styles } = useStyles(componentStyles);
  const [maxSizeError, setMaxSizeError] = useState(false);
  const [documentSelected, setDocumentSelected] = useState<
    DocumentPicker.DocumentResult | undefined
  >(undefined);

  const pickDocument = async () => {
    try {
      const document: DocumentPicker.DocumentResult = await DocumentPicker.getDocumentAsync({
        type: [
          'image/jpeg',
          'image/png',
          'image/heic',
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ],
        multiple: false,
      });
      if (document.type !== 'cancel') {
        if (document.size && document.size > 3000000) {
          setMaxSizeError(true);
          setDocumentSelected(undefined);
          return;
        }
        setMaxSizeError(false);
        setDocumentSelected(document);
        if (onChange) {
          onChange(document);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setDocumentSelected(value);
  }, [value]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <Text style={styles.textInput} numberOfLines={2} maxFontSizeMultiplier={1.3}>
            {documentSelected && documentSelected.type !== 'cancel'
              ? documentSelected.name
              : placeholder}
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={pickDocument}>
          <Text style={styles.buttonText} maxFontSizeMultiplier={1.3}>{t('common.attach')}</Text>
        </TouchableOpacity>
      </View>
      {helperText ? (
        <Text style={[styles.helperText, maxSizeError ? styles.errorText : null]} maxFontSizeMultiplier={1.3}>
          {helperText}
        </Text>
      ) : null}
    </View>
  );
};

export default FileUpload;
