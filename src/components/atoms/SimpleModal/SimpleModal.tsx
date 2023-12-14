import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, TouchableOpacity } from 'react-native';

// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { SimpleModalProps as Props } from './SimpleModal.types';
import componentStyles from './SimpleModal.styles';

/**
 * Render a modal.
 * @since 1.0.x
 */
const SimpleModal: React.FC<Props> = (props) => {
  const { children, open = false, dismiss, backDropDismiss } = props;
  // Hooks
  const { styles } = useStyles(componentStyles);
  // Components states
  const animation = useRef(new Animated.Value(0)).current;
  const [showModal, setShowModal] = useState(open);

  const opacityStyle = {
    opacity: animation,
  };
  const marginStyle = {
    marginTop: animation.interpolate({ inputRange: [0, 1], outputRange: ['0%', '50%'] }),
  };

  /**
   * Handle animation on close
   * @since 1.0.0
   */
  const close = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      if (dismiss) {
        dismiss(false);
      }
    });
  };

  useEffect(() => {
    if (open) {
      setShowModal(true);
      Animated.timing(animation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => setShowModal(false));
    }
  }, [open]);

  if (!showModal) return null;

  return (
    <>
      <Animated.View style={[opacityStyle, styles.touchableArea]}>
        <TouchableOpacity
          style={{ width: '100%', height: '100%' }}
          activeOpacity={1}
          onPress={() => (backDropDismiss ? close() : null)}
          testID="backdrop"
        />
      </Animated.View>
      <Animated.View style={[styles.modalContainer, marginStyle, opacityStyle]}>
        <View style={[styles.modal]}>{children}</View>
      </Animated.View>
    </>
  );
};

export default SimpleModal;
