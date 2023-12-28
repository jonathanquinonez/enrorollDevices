import React from 'react';
//Component
import CreateSsoAccount from 'src/components/organisms/CreateAccount/CreateSSO/CreateSsoAccount';
//Styles
import SafeScreen from 'src/components/organisms/SafeScreen/SafeScreen';

/**
 * Render a CreateAccount.
 * @since 1.0.0
 */
const CreateAccountSSO = () => {
	return (
		<SafeScreen>
			<CreateSsoAccount />
		</SafeScreen>
	);
};

export default CreateAccountSSO;
