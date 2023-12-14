import React from 'react';
import { View, Text } from 'react-native';

// Hooks
import useStyles from 'hooks/useStyles';
//Translate
import { useTranslation } from 'react-i18next';
// Types, Styles
import componentStyles from './Modal.results.styles';
//Images
import IconWarning from 'icons/IconWarning.svg';
//Componets
import Button from 'src/components/atoms/Button/Button';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import Row from 'src/components/atoms/Row/Row';

const ModalResultVital = () => {
	const { styles, colors } = useStyles(componentStyles);
	const { closeModal } = useBottomSheet();

	return (
		<View style={[styles.container]}>
			<Text style={styles.title}>Tips to keep in mind about your results</Text>
			<Text style={[styles.text]}></Text>
			<Row>
				<View style={[styles.mode_row, styles.spacing]}>
					<View style={styles.obj_success} />
					<View style={styles.obj_warning} />
					<View style={styles.obj_error} />
				</View>
				<View style={[styles.mode_row, { justifyContent: 'space-between' }]}>
					<Text style={[styles.text_body, { color: '#008767' }]}>Optimun</Text>
					<Text style={[styles.text_body, { color: '#B50303' }]}>Prevention</Text>
				</View>
			</Row>
			<View style={{ justifyContent: 'space-evenly', flexDirection: 'row', width: '100%' }}>
				<Button
					variant={'Outlined'}
					title={'Close'}
					style={{ width: 130 }}
					textStyle={[styles.secondaryText, { color: colors.primary }]}
					onPress={() => {
						closeModal();
					}}
				/>
			</View>
		</View>
	);
};

export default ModalResultVital;
