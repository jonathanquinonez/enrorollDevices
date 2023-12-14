import React from "react";
import { FlatList } from "react-native";
import useStyles from "hooks/useStyles";
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from "react-i18next";
//Styles
import componentStyles from './CreateAccountMedia.styles';
//Components
import ProcessCounter from "src/components/atoms/ProcessCounter/ProcessCounter";
import BreadCrumb from "src/components/atoms/BreadCrumb/BreadCrumb";
import Row from "src/components/atoms/Row/Row";
import Header from "../Header/Header";
//Types
import { CreateAccountMediaType } from "./CreateAccountMedia.types";
// Images
import TimesCircle from 'icons/TimesCircle.svg';

/**
 * Render a CreateAccountMedia.
 * @since 1.0.0
 */
const CreateAccountMedia = React.forwardRef<FlatList, CreateAccountMediaType>(({ ...props }, ref) => {

    const { styles, colors } = useStyles(componentStyles);
    const { titles, currentPosition, handlerExit } = props;
    const { t } = useTranslation();

    return (
        <LinearGradient
            colors={[colors.primary, colors.BLUE8AF]}
            locations={[0, 0.9]}
            style={styles.container}
        >
            <Header accesibilityLabel={t('accessibility.closeCA')} logoWithoutText iconLeft={<TimesCircle />} onPressLeft={handlerExit} showLine/>
            <Row style={styles.contentBreadCrumb}>
                <BreadCrumb
                    styleText={styles.breadCrumbText}
                    breadcrumbList={[
                        { label: t('createAccount.navigateText.login'), route: 'Login' },
                        { label: t('createAccount.navigateText.createAccount') },
                    ]}
                />
            </Row>
            <Row width={2}>
                <ProcessCounter onPress={() => { }} titles={titles} currentPosition={currentPosition} />
            </Row>
        </LinearGradient>
    )
});


export default CreateAccountMedia;