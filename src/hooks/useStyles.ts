import { useMemo } from 'react';
import { useTheme } from '@react-navigation/native';

// Config
import { KeraltyColors } from 'config/theme';

const useStyles = <T extends unknown>(componentStyles: (colors: KeraltyColors) => T) => {
	const { colors, dark } = useTheme();
	return useMemo(
		() => ({
			styles: componentStyles(colors as KeraltyColors),
			colors: colors as KeraltyColors,
		}),
		[dark],
	);
};

export default useStyles;
