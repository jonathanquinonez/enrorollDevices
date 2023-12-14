import React, { useEffect } from 'react';

import TwoFactorSelect from 'src/components/organisms/Login/TwoFactorAuthentication/TwoFactorSelect/TwoFactorSelect';
import SafeScreen from 'src/components/organisms/SafeScreen/SafeScreen';

const TwoFactorSelectScreen = (props: any) => {

	return (
		<SafeScreen>
			<TwoFactorSelect  />
		</SafeScreen>
	);
};

export default TwoFactorSelectScreen;