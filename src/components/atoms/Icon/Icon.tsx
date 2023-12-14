import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons';

// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { IconProps as Props } from './Icon.types';
import componentStyles from './Icon.styles';

/**
 * Render a icon.
 * @since 1.0.0
 */
const Icon = (props: Props) => {
  const { name, color='#FFF', size=20, style } = props;
  const { styles } = useStyles(componentStyles);

  return (
    <FontAwesome5 name={name} color={color} size={size} style={style}/>
  )
}

export default Icon