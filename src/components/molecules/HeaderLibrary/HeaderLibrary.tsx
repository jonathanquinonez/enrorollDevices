import { useNavigation } from '@react-navigation/native';
import useStyles from 'hooks/useStyles';
import React from 'react';
import { View, Text } from 'react-native';
//Components
import Row from 'src/components/atoms/Row/Row';
import IconButton from 'src/components/atoms/IconButton/IconButton';

//styles
import componentStyles from './HeaderLibrary.styles';

//Icons
import Icon from '../../../../assets/icons/close.svg';
import { IHeaderLibrary } from './HeaderLibrary.types';
import { useAppSelector } from 'adapter/hooks';
import { userSelectors } from 'adapter/user/userSelectors';

export const HeaderLibrary: React.FC<IHeaderLibrary> = (props) => {
	const { title , styleContainer , styleButton  } = props;
	const navigation = useNavigation();
	const { currentRoute, previousRoute } = useAppSelector(userSelectors.selectRoute);
	const { styles } = useStyles(componentStyles);

	const goBack = () => {
		navigation.goBack()
		navigation.goBack()
	}
	
	return (
		<View style={[styles.container , styleContainer]}>
			<Row width={4} style={styles.rowTitle}>
				<Text style={styles.title} maxFontSizeMultiplier={1.3}>{ title }</Text>
			</Row>
			<Row width={1} style={[styles.rowButton, styleButton]}>
				<IconButton
					style={styles.buttonIcon}
					icon={<Icon />}
					onPress={() => {
						previousRoute == "ChatDoctorScreen" && currentRoute == "ChatSanitas" ?
						goBack()
						: navigation.canGoBack() ? 
							navigation.goBack() 
						: 
							navigation.navigate('Root') 
					}}
				/>
			</Row>
		</View>
	);
};
