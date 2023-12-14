import React from 'react';
import { View, Text } from 'react-native';
import useStyles from 'hooks/useStyles';

//Components
import RootBody from 'src/components/molecules/RootBody/RootBody';
import Row from 'src/components/atoms/Row/Row';


//Types


//Styles
import componentStyles from './Root.styles';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'adapter/hooks';
import { userSelectors } from 'adapter/user/userSelectors';
import { importDataStorage } from 'src/utils/storage';

const RootOrganism = () => {

    const { t } = useTranslation();
    const { styles, colors } = useStyles(componentStyles);
    const { firstName } = useAppSelector(userSelectors.selectUser);

    const capitalName = firstName.charAt(0) + firstName.toLowerCase().substring(1)

    console.log('firstname--->>', capitalName)
    return (
        <View style={{ flex: 1, width: '100%' }}>
            <Row style={{ paddingHorizontal: 30, paddingVertical: 10, justifyContent: 'center' }}>
                <Text
                    accessibilityRole='header'
                    style={styles.title_text}
                    adjustsFontSizeToFit
                    maxFontSizeMultiplier={1.3}
                    allowFontScaling={false}>{t('home.hiUser')}{capitalName}!</Text>
                <Text
                    accessibilityRole='header'
                    style={styles.subtitle_text}
                    adjustsFontSizeToFit
                    maxFontSizeMultiplier={1.3}
                    allowFontScaling={false}>{t('home.description')}</Text>
                <View style={{ height: 20 }} />
            </Row>
            <Row width={4} >
                <RootBody />
            </Row>
        </View>
    )
}


export default RootOrganism;