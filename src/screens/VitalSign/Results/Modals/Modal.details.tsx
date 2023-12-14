import React, { ReactElement } from 'react';
import { View, Text } from 'react-native';
// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import componentStyles from './Modal.results.styles';
//Componets
import Button from 'src/components/atoms/Button/Button';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import Row from 'src/components/atoms/Row/Row';
import { useTranslation } from 'react-i18next';

interface ModalDetailVital {
    title: string;
    children?: ReactElement | ReactElement[];
}

const ModalDetailVital = (props: ModalDetailVital) => {
	const { styles, colors } = useStyles(componentStyles);
	const { closeModal } = useBottomSheet();
	const { t } = useTranslation();

	return (
		<View style={[styles.container]}>
			<Text style={styles.title}>{props.title}</Text>
			<View style={{marginVertical: 15}}>{props.children}</View>
			<View style={{ justifyContent: 'space-evenly', flexDirection: 'row', width: '100%' }}>
				<Button
					variant={'Outlined'}
					title={t('common.close')}
					style={{ width: 130, marginTop: 15 }}
					textStyle={[styles.secondaryText, { color: colors.primary }]}
					onPress={() => {
						closeModal();
					}}
				/>
			</View>
		</View>
	);
};

export default ModalDetailVital;
