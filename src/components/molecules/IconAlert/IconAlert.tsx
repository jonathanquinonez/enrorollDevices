import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';

// Hooks
import useStyles from 'hooks/useStyles';

import componentStyles from './IconAlert.styles';
import { IconAlertProps as Props } from './IconAlert.types';
import Bell from 'icons/NotificationsIcons/bell.svg';
import Bell0 from 'icons/NotificationsIcons/bell0.svg';
import Bell1 from 'icons/NotificationsIcons/bell1.svg';
import Bell2 from 'icons/NotificationsIcons/bell2.svg';
import Bell3 from 'icons/NotificationsIcons/bell3.svg';
import Bell4 from 'icons/NotificationsIcons/bell4.svg';
import Bell5 from 'icons/NotificationsIcons/bell5.svg';
import Bell6 from 'icons/NotificationsIcons/bell6.svg';
import Bell7 from 'icons/NotificationsIcons/bell7.svg';
import Bell8 from 'icons/NotificationsIcons/bell8.svg';
import Bell9 from 'icons/NotificationsIcons/bell9.svg';
import Bell10 from 'icons/NotificationsIcons/bell10.svg';

/**
 * Render a IconAlert.
 * @since 1.0.0
 */
const IconAlert = (props: Props) => {
  const { style, numberNotifications, active } = props;
  const { styles } = useStyles(componentStyles);

  const icons = [<Bell0 />, <Bell1 />, <Bell2 />, <Bell3 />, <Bell4 />, <Bell5 />, <Bell6 />, <Bell7 />, <Bell8 />, <Bell9 />, <Bell10 />];

  return (
    <View>
      {active ? <Bell /> : numberNotifications > 9 ? icons[10] : icons[numberNotifications]}
    </View>
  )
}

export default IconAlert;