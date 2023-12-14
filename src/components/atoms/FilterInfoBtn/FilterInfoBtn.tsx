import React, { Children, useMemo } from 'react'
// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { FilterInfoBtnProps as Props } from './FilterInfoBtn.types';
import componentStyles from './FilterInfoBtn.styles';
import { Text, TouchableOpacity, View } from 'react-native';
import moment from 'moment';
import FORMATS from 'ui-core/utils/formats';
import { useTranslation } from 'react-i18next';

/**
 * Render a FilterInfoBtn.
 * @since 1.0.0
 */
const FilterInfoBtn = (props: Props) => {
  const { style, onPress, tempData, children } = props;
  const { styles } = useStyles(componentStyles);
  const { t } = useTranslation();

  return (
    <>
      {tempData ?
        <View style={{
          top: 30,
          flexDirection: "row",
          position: "absolute"
        }}>
          <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
            <Text maxFontSizeMultiplier={1.3} style={styles.text}>{`X    ${moment(tempData?.from).format(FORMATS.date5)} - ${moment(tempData?.to).format(FORMATS.date5)}`}</Text>
          </TouchableOpacity>
          {children}
        </View>
        : <></>
      }
    </>
  )
}

export default FilterInfoBtn