import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// Hooks
import useStyles from 'hooks/useStyles';
// Helpers
import { getMonthList, getYearsList } from './YearPicker.helpers';
// Types, Styles
import { YearPickerProps as Props } from './YearPicker.types';
import componentStyles from './YearPicker.styles';
// Images
import LeftArrowIcon from 'icons/LeftArrowIcon.svg';
import RightArrowIcon from 'icons/RightArrowIcon.svg';
import { Moment } from 'moment';

/**
 * Render a yearPicker.
 * @since 1.0.x
 */
const YearPicker: React.FC<Props> = (props) => {
  const { currentDate, type, onChange, onChangeType } = props;
  const { styles, colors } = useStyles(componentStyles);
  // Component states
  const [years, setYears] = useState(getYearsList(currentDate.clone().subtract(4, 'year'), 9));
  const months = useMemo(() => getMonthList(currentDate), [currentDate.format('YY')]);
  const list = type === 'Years' ? years : months;

  /**
   * Method called after pressing the right arrow button
   * @since 1.0.0
   */
  const handleNextButton = () => {
    if (type === 'Years') {
      setYears(getYearsList(years[8].value.clone().add(1, 'year'), 9));
      return;
    }
    if (type === 'Months') {
      onChange(currentDate.clone().add(1, 'month'));
    }
  };

  /**
   * Method called after pressing the left arrow button
   * @since 1.0.0
   */
  const handlePreviousButton = () => {
    if (type === 'Years') {
      setYears(getYearsList(years[0].value.clone().subtract(9, 'year'), 9));
      return;
    }
    if (type === 'Months') {
      onChange(currentDate.clone().subtract(1, 'month'));
    }
  };

  /**
   * Checks if are the same date
   * @since 1.0.0
   * @param oldDate Initial date
   * @param newDate Date to compare with
   * @returns {boolean} True if are the same date
   */
  const isSameDate = (oldDate: Moment, newDate: Moment) =>
    oldDate.format('DD/MM/YY') === newDate.format('DD/MM/YY');

  return (
    <View>
      <View style={styles.header}>
        {type === 'Years' ? (
          <TouchableOpacity onPress={handlePreviousButton} style={styles.monthButtonContainer}>
            <LeftArrowIcon stroke={colors.BLUEDC1} />
          </TouchableOpacity>
        ) : null}
        <View style={styles.headerTextContainer}>
          <TouchableOpacity onPress={() => onChangeType('Months')}>
            <Text style={styles.headerText} maxFontSizeMultiplier={1.3}>{currentDate.format('MMMM')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onChangeType('Years')}>
            <Text style={styles.headerText} maxFontSizeMultiplier={1.3}>{currentDate.format('YYYY')}</Text>
          </TouchableOpacity>
        </View>
        {type === 'Years' ? (
          <TouchableOpacity onPress={handleNextButton} style={styles.monthButtonContainer}>
            <RightArrowIcon stroke={colors.BLUEDC1} />
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.container}>
        {list.map((item) => (
          <TouchableOpacity
            key={item.key}
            style={styles.itemContainer}
            onPress={() => onChange(item.value)}
          >
            <Text
              style={[styles.text, isSameDate(currentDate, item.value) ? styles.selected : null]}
              maxFontSizeMultiplier={1.3}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default YearPicker;
