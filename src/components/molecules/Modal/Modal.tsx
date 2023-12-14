import React from 'react';
import { View } from 'react-native';

// Components
import Button from 'src/components/atoms/Button/Button';
import IconButton from 'src/components/atoms/IconButton/IconButton';
import SimpleModal from 'src/components/atoms/SimpleModal/SimpleModal';

// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { ModalProps as Props } from './Modal.types';
import componentStyles from './Modal.styles';

/**
 * Render a modal.
 * @since 1.0.0
 */
const Modal: React.FC<Props> = (props) => {
	const { children,
		variant="Text",
		containerButtonStyle,
		icon,
		primaryText,
		secondaryText,
		onPrimaryPress,
		buttonStyle } = props;
	const { onSecondaryPress, ...rest } = props;
	// Hooks
	const { styles } = useStyles(componentStyles);

	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<SimpleModal {...rest}>
			{icon && (
				<View style={styles.icon}>
					<IconButton icon={icon} />
				</View>
			)}
			<View>{children}</View>
			<View style={[styles.buttons, containerButtonStyle]}>
				{secondaryText && (
					<Button
						variant={variant}
						style={[styles.button, buttonStyle]}
						textStyle={styles.secondaryText}
						title={secondaryText}
						onPress={onSecondaryPress}
					/>
				)}
				{primaryText && (
					<Button
						variant={variant}
						style={[styles.button, buttonStyle]}
						title={primaryText}
						onPress={onPrimaryPress}
					/>
				)}
			</View>
		</SimpleModal>
	);
};

export default Modal;
