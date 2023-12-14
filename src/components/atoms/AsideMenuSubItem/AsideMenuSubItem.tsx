import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

// Components
import DividerLine from '../DividerLine/DividerLine';
// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { AsideMenuSubItemProps as Props } from './AsideMenuSubItem.types';
import componentStyles from './AsideMenuSubItem.styles';

/**
 * Render a asideMenuSubItem.
 * @since 1.0.0
 */
const AsideMenuSubItem: React.FC<Props> = (props) => {
  const { text,
    divider = true,
    onPress,
    btnDisabled,
    accessibilityHint,
    accessibilityLabel,
    accessibilityRole = 'button' } = props;
  const { styles } = useStyles(componentStyles);

  return (
    <TouchableOpacity accessibilityRole={accessibilityRole} accessibilityHint={accessibilityHint} accessibilityLabel={accessibilityLabel} style={styles.container} onPress={onPress} disabled={btnDisabled}>
      <Text style={styles.text} maxFontSizeMultiplier={1.3} >{text}</Text>
      {divider ? <DividerLine style={styles.divider} /> : null}
    </TouchableOpacity>
  );
};

export default AsideMenuSubItem;
