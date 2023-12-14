import React from 'react';
import { View } from 'react-native';

// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { MenuBoxProps as Props } from './MenuBox.types';
import componentStyles from './MenuBox.styles';

/**
 * Render a menuBox.
 * @since 1.0.x
 */
const MenuBox: React.FC<Props> = (props) => {
  const { children, noBorders } = props;
  const { styles } = useStyles(componentStyles);

  return (
    <View style={noBorders ? styles.containerNoBorder : styles.container}>
      {children}
    </View>
  );
};

export default MenuBox;
