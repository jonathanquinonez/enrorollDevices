import React from "react";
import { View, Text } from "react-native";
import { Svg, Circle } from 'react-native-svg'
import Person from 'assets/icons/person.svg';
import PersonIcon from 'assets/icons/personIcon1.svg';

const CircularProgress = (props: any) => {
  const { size, strokeWidth, text } = props;
  const radius = (size - strokeWidth) / 2;
  const circum = radius * 2 * Math.PI;
  const svgProgress = 100 - props.progressPercent;

  return (
    <View>
      <Svg width={size} height={size}>
        {/* Background Circle */}
        <Circle
          stroke={props.bgColor ? props.bgColor : "#B4B4B4"}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          {...{ strokeWidth }}
        />

        {/* Progress Circle */}
        <Circle
          stroke={props.pgColor ? props.pgColor : "#3b5998"}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeDasharray={`${circum} ${circum}`}
          strokeDashoffset={radius * Math.PI * 2 * (svgProgress / 100)}
          strokeLinecap="round"
          transform={`rotate(-90, ${size / 2}, ${size / 2})`}
          {...{ strokeWidth }}
        />

        {/* Text */}
      </Svg>
      <View style={{ height: '100%', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', position: 'absolute' }}>
        <PersonIcon />
        <Text style={{ fontFamily: 'proxima-bold', fontSize: 20, color: '#002F87' }}>{text}</Text>
      </View>
    </View>
  )
}

export default CircularProgress;