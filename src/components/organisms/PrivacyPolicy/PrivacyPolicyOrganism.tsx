import React from 'react'
import PrivacyPolicyFrom from 'src/components/molecules/PrivacyPolicyForm/PrivacyPolicyForm'
import HeaderTerms from 'src/components/molecules/HeaderTermsPrivacy/HeaderTermsPrivacy'
import TermsConditionsForm from 'src/components/molecules/TermsConditionsForm/TermsConditionsForm'
import { View } from 'react-native'
import Row from 'src/components/atoms/Row/Row'
const PrivacyPolicyOrganism = () => {
  const [bar, setBar] = React.useState(true);
  const toggleBar = (isBar) => {
    setBar(isBar);
  }
  return (
    <>
      <View style={{ flex: 1 }} >
        <HeaderTerms toggleBar={toggleBar} bar={bar} />
        <Row width={0} style={{ backgroundColor: '#034268' }}>
          {bar ? <PrivacyPolicyFrom /> : <TermsConditionsForm />}
        </Row>
      </View>
    </>
  )
}
export default PrivacyPolicyOrganism