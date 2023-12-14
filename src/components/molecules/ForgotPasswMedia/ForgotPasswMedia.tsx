import React from "react";
import { FlatList } from "react-native";
import useStyles from "hooks/useStyles";
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from "react-i18next";
//Styles
import componentStyles from './ForgotPasswMedia.styles';
//Components
import ProcessCounter from "src/components/atoms/ProcessCounter/ProcessCounter";
//Types
import { ForgotPasswMediaType } from "./ForgotPasswMedia.types";
// Images
import TimesCircle from 'icons/TimesCircle.svg';
import BreadCrumb from "src/components/atoms/BreadCrumb/BreadCrumb";
import Row from "src/components/atoms/Row/Row";
import Header from "../Header/Header";

/**
 * Render a ForgotPasswMedia.
 * @since 1.0.0
 */
const ForgotPasswMedia = React.forwardRef<FlatList, ForgotPasswMediaType>(({ ...props }, ref) => {

    const { styles, colors } = useStyles(componentStyles);
    const { titles, currentPosition, handlerExit } = props;
    const { t } = useTranslation();

    return (
        <LinearGradient
            colors={['#0069A7', '#00578A']}
            locations={[0, 0.9]}
            style={styles.container}
        >
            <Header accesibilityLabel={t('accessibility.closeFP')} logoWithoutText iconLeft={<TimesCircle />} onPressLeft={handlerExit} showLine/>
            <Row style={styles.contentBreadCrumb}>
                <BreadCrumb
                    styleText={styles.breadCrumbText}
                    breadcrumbList={[
                        { label: t('forgotPassword.navigateText.login'), route: 'Login' },
                        { label: t('forgotPassword.navigateText.forgotPassword') },
                    ]}
                />
            </Row>
            <Row width={2}>
                <ProcessCounter onPress={() => { }} titles={titles} currentPosition={currentPosition} />
            </Row>
        </LinearGradient>
    )
});


export default ForgotPasswMedia;