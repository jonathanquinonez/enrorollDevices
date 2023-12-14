import React from 'react';
import { View, Text } from 'react-native';
import useStyles from 'hooks/useStyles';
import { useTranslation } from 'react-i18next';
//Components
import RadioButton from 'src/components/atoms/RadioButton/RadioButton';
import RadioGroup from 'src/components/atoms/RadioGroup/RadioGroup';
// Types, Styles
import { AccountTypeProps as Props } from './AccountType.types';
import componentStyles from './AccountType.styles';

const AccountType: React.FC<Props> = (props) => {
    const { value } = props;
    const { styles } = useStyles(componentStyles);
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            
        </View>
    );
}

export default AccountType;