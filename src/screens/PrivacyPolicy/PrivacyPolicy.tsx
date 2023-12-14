
import React from 'react';
import { SafeAreaView } from 'react-native';
import PrivacyPolicyOrganism from 'src/components/organisms/PrivacyPolicy/PrivacyPolicyOrganism';
import componentStyles from './PrivacyPolicy.styles';
import useStyles from 'hooks/useStyles';
import SafeScreen from 'src/components/organisms/SafeScreen/SafeScreen';
const PrivacyPolicy = () => {
  const { styles, colors } = useStyles(componentStyles);
  return (
    <SafeScreen>
      <PrivacyPolicyOrganism />
    </SafeScreen>
  );
}
export default PrivacyPolicy;