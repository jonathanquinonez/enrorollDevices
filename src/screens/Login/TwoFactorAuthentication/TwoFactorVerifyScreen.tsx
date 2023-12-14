import React, { useEffect } from 'react';

import TwoFactorVerify from 'src/components/organisms/Login/TwoFactorAuthentication/TwoFactorVerify/TwoFactorVerify';
import SafeScreen from 'src/components/organisms/SafeScreen/SafeScreen';

const TwoFactorSelectScreen = (props: any) => {

	return (
		<SafeScreen>
			<TwoFactorVerify  />
		</SafeScreen>
	);
};

export default TwoFactorSelectScreen;