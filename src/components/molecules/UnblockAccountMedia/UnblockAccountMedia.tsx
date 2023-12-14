import React from "react";
import { FlatList } from "react-native";
import useStyles from "hooks/useStyles";
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from "react-i18next";
//Styles
import componentStyles from './UnblockAccountMedia.styles';
//Components
import ProcessCounter from "src/components/atoms/ProcessCounter/ProcessCounter";
import BreadCrumb from "src/components/atoms/BreadCrumb/BreadCrumb";
import Header from "../Header/Header";
import Row from "src/components/atoms/Row/Row";
//Types
import { UnblockAccountMediaType } from "./UnblockAccountMedia.types";
// Images
import TimesCircle from 'icons/TimesCircle.svg';

/**
 * Render a UnblockAccountMedia.
 * @since 1.0.0
 */
const UnblockAccountMedia = React.forwardRef<FlatList, UnblockAccountMediaType>(({ ...props }, ref) => {

    const { styles, colors } = useStyles(componentStyles);
    const { titles, currentPosition, handlerExit } = props;
    const { t } = useTranslation();

    return (
        <LinearGradient
            colors={['#0069A7', '#00578A']}
            locations={[0, 0.9]}
            style={styles.container}
        >
            <Header accesibilityLabel={t('accessibility.closeUB')} logoWithoutText iconLeft={<TimesCircle />} onPressLeft={handlerExit} showLine/>
            <Row style={styles.contentBreadCrumb}>
                <BreadCrumb
                    styleText={styles.breadCrumbText}
                    breadcrumbList={[
                        { label: t('unblockAccount.navigateLogin'), route: 'Login' },
                        { label: t('unblockAccount.navigateUnblockAccount') },
                    ]}
                />
            </Row>
            <Row width={2}>
                <ProcessCounter onPress={() => { }} titles={titles} currentPosition={currentPosition} />
            </Row>
        </LinearGradient>
    )
});


export default UnblockAccountMedia;