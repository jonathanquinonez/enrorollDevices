import React from 'react';
import useStyles from 'hooks/useStyles';
//Component
import PatientRegistrationIntro from 'src/components/organisms/PatientRegistration/PatientRegistration';
//Styles
import SafeScreen from 'src/components/organisms/SafeScreen/SafeScreen';

/**
 * Render a ForgotPassword.
 * @since 1.0.0
 */
const PatientRegistration = () => {

  return (
    <SafeScreen>
      <PatientRegistrationIntro />
    </SafeScreen>
  );
}

export default PatientRegistration;