import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { DayProps as Props } from './Day.types';
import componentStyles from './Day.styles';

/**
 * Render a day.
 * @since 1.0.0
 */
const Day: React.FC<Props> = (props) => {
  const { index, selected, disabled, select, empty, textStyle } = props;
  const { styles } = useStyles(componentStyles);

  /**
   * Method called after pressing the button
   * @since 1.0.0
   */
  const selectThis = () => {
    if (empty || disabled || !select || !index) return;
    select(index);
  };

  return (
    <TouchableOpacity key={`day_${index}`} onPress={selectThis}>
      <View style={styles.day}>
        <View
          style={{
            ...styles.day,
            ...(selected && styles.selected),
            ...(disabled && styles.disabled),
          }}
        >
          <Text
            style={[
              {
                ...styles.dayText,
                ...(selected && styles.selectedText),
                ...(disabled && styles.disabledText),
              },
              textStyle,
            ]}
            maxFontSizeMultiplier={1.3}
          >
            {index}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Day;
