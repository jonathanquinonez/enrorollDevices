
import React from 'react';
import { SafeAreaView } from 'react-native';
import TermsConditionsOrganism from 'src/components/organisms/TermsConditions/TermsOrganism';
import componentStyles from './TermsConditions.styles';
import useStyles from 'hooks/useStyles';
import SafeScreen from 'src/components/organisms/SafeScreen/SafeScreen';
const TermsConditions = () => {
  const { styles, colors } = useStyles(componentStyles);
  return (
    <SafeScreen>
      <TermsConditionsOrganism />
    </SafeScreen>
  );
}
export default TermsConditions;