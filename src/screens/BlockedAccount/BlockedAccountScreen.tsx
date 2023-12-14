import React from 'react';
//Component
import UnblockAccount from 'src/components/organisms/BlockedAccount/UnblockAccount';
import SafeScreen from 'src/components/organisms/SafeScreen/SafeScreen';


/**
 * Render a UnblockAccountScreen.
 * @since 1.0.0
 */
const UnblockAccountScreen = () => {
    return (
        <SafeScreen>
            <UnblockAccount/>
        </SafeScreen>
    );
}
export default UnblockAccountScreen;