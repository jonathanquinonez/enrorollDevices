import useStyles from 'hooks/useStyles';
import React, { useState } from 'react';
import { View } from 'react-native';

import { RadioGroupProps as Props } from './RadioGroup.types';
import componentStyles from './RadioGroup.styles';

/**
 * Render a radioGroup.
 * @since 1.0.x
 */
const RadioGroup: React.FC<Props> = (props) => {
  const { children, onChange, initialValue, value, style } = props;
  const [selected, setSelected] = useState(initialValue);
  const { styles } = useStyles(componentStyles);

  const list = React.Children.map(children as React.ReactElement, (child: React.ReactElement) =>
    React.cloneElement(child, {
      onPress: (state: boolean, valueSelected: any) => {
        setSelected(valueSelected);
        if (onChange) {
          onChange(valueSelected);
        }
      },
      isSelected: JSON.stringify(child.props.value) === JSON.stringify(value ?? selected),
    }),
  );

  return <View style={[styles.container, style]}>{list}</View>;
};

export default RadioGroup;
