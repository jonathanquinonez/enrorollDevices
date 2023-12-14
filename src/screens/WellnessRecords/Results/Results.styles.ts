import { KeraltyColors } from 'config/theme';
import { StyleSheet } from 'react-native';

const styles = (colors: KeraltyColors) =>
	StyleSheet.create({
		title_text: {
			fontFamily: 'proxima-bold',
			fontSize: 20,
			lineHeight: 20,
			color: '#002F87',
		},
        mode_row: {
            flexDirection: 'row',
        },
        spacing:{
            paddingBottom: 5
        },
        titleDate: { fontFamily: 'proxima-bold', fontSize: 18, color: '#022F58', marginTop: 10 },
        text_body: {
            fontSize: 14,
            fontFamily: 'proxima-regular',
            lineHeight: 14
        },
        obj_success: {
            backgroundColor: '#B4B4B4',
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
            margin: 1,
            width: 56,
            height: 10
        },
        obj_warning: {
            backgroundColor: '#B4B4B4',
            margin: 1,
            width: 56,
            height: 10
        },
        obj_error: {
            backgroundColor: '#B4B4B4',
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
            margin: 1,
            width: 56,
            height: 10
        },
        view_center:{
            marginHorizontal: 'auto',
			alignContent: 'center',
			alignItems: 'center',
			justifyContent: 'center',
        },
		row_container: {
			flexDirection: 'row',
			marginHorizontal: 'auto',
			alignContent: 'center',
			alignItems: 'center',
			justifyContent: 'center',
			paddingBottom: 10,
		},
		info2: { fontFamily: 'proxima-bold', color: '#B50303', fontSize: 14, marginRight: 9 },
        card_score: {
            margin:2,
            fontSize: 20,
            fontFamily: 'proxima-bold',
            color: '#FFF'
        },
        card_icon: {
            marginHorizontal: 'auto',
			alignContent: 'center',
			alignItems: 'center',
			justifyContent: 'center',
        },
        circle: {
            justifyContent: 'center',
            alignItems: 'center',
            width: 32,
            height: 32,
            borderRadius: 27,
            backgroundColor: '#0071A3',
        },
        card_base:{
            height: '100%',
            borderRadius: 10,
            padding: 10,
            justifyContent: 'center'
        },
        card_title: {
            fontSize: 16,
            fontFamily: 'proxima-bold',
            lineHeight: 19,
            color: '#002F87'
        },
        card_body: {
            fontSize: 14,
            fontFamily: 'proxima-regular',
            lineHeight: 14,
        },
		radioButton: {
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 10

		},
		textRadioButton: {
            marginLeft: 16
		},
		contentRow: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			marginBottom: 15,
		},
        content_radio_button : {
            flexDirection: "row",
            alignItems: "center",
        },
		label_text: {
			fontSize: 14,
			fontWeight: '400',
			fontFamily: 'proxima-regular',
            color: colors.BLUEDC1,
		},
        label_error: {
            fontSize: 14,
			fontFamily: 'proxima-bold',
        }
	});

export default styles;
