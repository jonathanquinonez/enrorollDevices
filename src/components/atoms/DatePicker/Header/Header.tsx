import React from 'react';
import { View, Text } from 'react-native';

// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { HeaderProps as Props } from './Header.types';
import componentStyles from './Header.styles';

/**
 * Render a header.
 * @since 1.0.0
 */
const Header: React.FC<Props> = (props) => {
  const { day } = props;
  const { styles } = useStyles(componentStyles);

  return (
    <View style={styles.dayHeader}>
      <Text style={styles.dayHeaderText} maxFontSizeMultiplier={1.3}>{day}</Text>
    </View>
  );
};

export default Header;
