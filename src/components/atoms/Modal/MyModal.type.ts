import { Component } from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';
import { ReactElement } from 'react';


export interface MyModalProps {
  open: boolean;
  height: number;
  width?: number;
  closeFunction?: () => void;
  hasDraggableIcon?: boolean;
  backgroundColor?: string;
  sheetBackgroundColor?: string;
  dragIconColor?: string;
  dragIconStyle?: StyleProp<ViewStyle>;
  draggable?: boolean;
  onRequestClose?: () => void;
  onClose?: () => void;
  radius?: number;
  children?: ReactElement | ReactElement[];
  blockModal?: boolean;
}

export default MyModalProps;