import React from 'react';
//Component
import CreateAccountIntro from 'src/components/organisms/CreateAccount/CreateAccount';
//Styles
import SafeScreen from 'src/components/organisms/SafeScreen/SafeScreen';

/**
 * Render a CreateAccount.
 * @since 1.0.0
 */
const CreateAccount = () => {

	return (
		<SafeScreen>
			<CreateAccountIntro />
		</SafeScreen>
	);
};

export default CreateAccount;
