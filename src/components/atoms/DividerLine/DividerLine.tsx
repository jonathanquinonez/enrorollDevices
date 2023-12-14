import React from 'react';
import { View } from 'react-native';

// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { DividerLineProps as Props } from './DividerLine.types';
import componentStyles from './DividerLine.styles';

/**
 * Render a dividerLine.
 * @since 1.0.x
 */
const DividerLine = (props: Props) => {
  const { style } = props;
  const { styles } = useStyles(componentStyles);

  return <View style={[styles.line, style]} />;
};

export default DividerLine;
