import { UpdateUserParamList } from '@intercom/intercom-react-native';

export interface Intercom {
    isShow: boolean;
    isInitialized: boolean;
    intercomUser?: UpdateUserParamList | null;
    actions?: {
        isShutdowning?: boolean;
        isUpdating?: boolean
    };
}

export interface UpdateIntercomUserProps {
    updateFlag: boolean,
    intercomUserInfo?: UpdateIntercomUserProps | null;
}
