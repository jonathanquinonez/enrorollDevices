import { Platform, Linking } from 'react-native';

interface Call {
    number: string;
    prompt?: boolean;
	skipCanOpen?: boolean;
}

export function useCall() {
    async function openLink(settings: Call){
    
        const url = `${Platform.OS === 'ios' && settings.prompt ? 'telprompt:' : 'tel:'}${settings.number}`
        if (settings.skipCanOpen) {
            return Linking.openURL(url);
        }
        const canOpen = await Linking.canOpenURL(url);
        if (!canOpen) {
            return console.error(`invalid URL provided: ${url}`);
        } else {
            return Linking.openURL(url);
        }
    }

    return {openLink}
}


