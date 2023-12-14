import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import useStyles from "hooks/useStyles";
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from "react-i18next";
//Styles
import componentStyles from './PatientRegisMedia.styles';
//Components
import ProcessCounter from "src/components/atoms/ProcessCounter/ProcessCounter";
import IconButton from "src/components/atoms/IconButton/IconButton";
//Types
import { PatientRegisMediaType } from "./PatientRegisMedia.types";
// Images
import LogoSanitas from 'icons/LogoSanitas.svg';
import TimesCircle from 'icons/TimesCircle.svg';
import BreadCrumb from "src/components/atoms/BreadCrumb/BreadCrumb";
import Column from "src/components/atoms/Column/Column";
import { userSelectors } from 'adapter/user/userSelectors';
import { useAppSelector } from 'adapter/hooks';

/**
 * Render a ForgotPasswMedia.
 * @since 1.0.0
 */
const PatientRegisMedia = React.forwardRef<FlatList, PatientRegisMediaType>(({ ...props }, ref) => {

    const { styles, colors } = useStyles(componentStyles);
    const { titles, currentPosition, handlerExit } = props;
    const { t } = useTranslation();

    const [newTitles, setNewTitles] = useState<any[]>([])
    const { editAccountdata } = useAppSelector(userSelectors.selectEditAccountdata);

    const getItemInfo = async (tit: any[]) => {
        let values: any;
        values = await AsyncStorage.getItem('loadUserInfoByCode');
        let valuesParse = JSON.parse(values)
        const tempTitles = tit;
        if (!valuesParse?.patientInformation || editAccountdata?.isNewVersion) {
            tempTitles.splice(1, 1)
        }
        setNewTitles(tempTitles);
    }

    useEffect(() => {
        getItemInfo(titles)
    }, [titles])

    return (
        <LinearGradient
            colors={[colors.primary, colors.BLUE8AF]}
            locations={[0, 1]}
            style={styles.container}
        >
            <Column style={styles.header}>
                <IconButton accessibilityLabel={t('accessibility.closeCAC')} icon={<TimesCircle />} variant={"Header"} onPress={handlerExit} />
                <LogoSanitas />
                <View style={{ width: 45 }} />
            </Column>
            <View style={styles.line} />
            <Column width={3} style={{ width: '100%', justifyContent: "space-evenly" }}>
                {/* <View style={styles.contentBreadCrumb}>
                    <BreadCrumb
                        styleText={styles.breadCrumbText}
                        breadcrumbList={[
                            { label: t('forgotPassword.navigateText.login'), route: 'Login' },
                            { label: t('patientRegistration.sectionTittle') },
                        ]}
                    />
                </View> */}
                <View style={{ alignItems: "center" }}>
                    <ProcessCounter onPress={() => { }} titles={newTitles} currentPosition={currentPosition} />
                </View>
            </Column>
        </LinearGradient>
    )
});


export default PatientRegisMedia;