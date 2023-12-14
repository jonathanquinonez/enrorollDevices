import { ReactElement } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { UserNotifications } from 'src/screens/Notifications/UtilNotifications';

/**
 * @interface CardNotificationsSettingsProps
 * @since 1.0.0
 */
export interface CardNotificationsSettingsProps {
  /**
  *
  * @since  1.0.0
  * @example style={{margin: 5}}
  */
  style?: StyleProp<ViewStyle>;
  data: UserNotifications
  onChangeData: (data: UserNotifications, value: boolean) => void;
}
