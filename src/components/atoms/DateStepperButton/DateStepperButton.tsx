import { Text, View } from 'react-native';
import componentStyles from './DateStepperButton.styles';
import useStyles from 'src/hooks/useStyles';
import { IStepperButtonProps } from './DataStepperButton.types';
import { colorsLight } from 'config/theme';

const DateStepperButton = (props: IStepperButtonProps) => {
	const { label, isActive = false } = props;
	const { styles } = useStyles(componentStyles);

	return (
		<View
			style={[
				styles.button,
				{ backgroundColor: isActive ? colorsLight.WHITE : colorsLight.GRAY_MEDIUM_3 },
			]}
		>
			<Text style={styles.label}>{label}</Text>
		</View>
	);
};

export default DateStepperButton;
