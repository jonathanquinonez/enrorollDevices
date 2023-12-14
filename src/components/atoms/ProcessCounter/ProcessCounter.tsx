import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native';
// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { ProcessButtonProps, ProcessCounterProps as Props } from './ProcessCounter.types';
import componentStyles from './ProcessCounter.styles';

/**
 * Render a ProcessCounter.
 * @since 2.0.0
 */
const ProcessCounter = (props: Props) => {
  const { titles, currentPosition, onPress } = props;
  const { styles } = useStyles(componentStyles);

  return (
    <View style={styles.container}>
      {titles.map((title, index) => {
        return <ProcessButton
          key={index}
          title={title}
          totalItems={titles.length}
          progressNumber={index}
          currentPosition={currentPosition} onPress={(num) => onPress(num)} />
      })}
    </View>
  )
};

const ProcessButton = (props: ProcessButtonProps) => {
  const { styles } = useStyles(componentStyles);
  const { title, progressNumber, currentPosition, onPress, totalItems } = props;

  const colors = {
    active: ['#FFFFFF', '#016099', '#FFFFFF'],
    inactive: ['#B4B4B4', '#5B5C5B', '#B4B4B4']
  }

  return (
    <TouchableOpacity
      disabled={currentPosition < progressNumber}
      style={[styles.touchableContainer, {width: 360 / totalItems}]}
      onPress={() => onPress(progressNumber)}>
      <View style={[{
        backgroundColor: currentPosition - 1 >= progressNumber ? colors.active[0] : colors.inactive[0],
        display: progressNumber + 1 >= totalItems ? 'none' : 'flex',
        left: (360 / totalItems)/2,
      }, styles.progressLine]} />
      <View style={[{
        backgroundColor: currentPosition >= progressNumber ? colors.active[0] : colors.inactive[0]
      }, styles.circleButton]}>
        <Text style={[{
          color: currentPosition >= progressNumber ? colors.active[1] : colors.inactive[1]
        }, styles.progressNumber]} maxFontSizeMultiplier={1.3}>{progressNumber + 1}</Text>
      </View>
      <Text
        numberOfLines={2}
        maxFontSizeMultiplier={1.3}
        style={[{
          color: currentPosition >= progressNumber ? colors.active[2] : colors.inactive[2]
        }, styles.text]}>{title}</Text>
    </TouchableOpacity>
  )
};


export default ProcessCounter