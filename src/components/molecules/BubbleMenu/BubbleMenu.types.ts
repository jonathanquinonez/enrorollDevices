import { ReactElement } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

/**
 * @interface BubbleMenuProps
 * @since 1.0.0
 */
export interface BubbleMenuProps {
   /**
   *
   * @since  1.0.0
   * @example style={{margin: 5}}
   */
   style?: StyleProp<ViewStyle>;
   /**
    * returns the state of the bubble, whether it is visible or not
    * @since  1.0.0
    * @example onPress={(v)=>{}}
    */
   onPress: (isActive: boolean) => void;
   openwarning: () => void;
   /**
    * receives the state of the bubble to show or not.
    * @since  1.0.0
    * @example value={action()}
    */
   isActive: boolean;
   statusMaintenance: string | undefined;
   /**
    * information that the 3 buttons of this menu must have.
    * @since  1.0.0
    * @example buttons={[
    *              {title: 'Title',
    *              icon: <Icon/>,
    *              route: 'VirtualAsistent'}
    *          ]}
    */
   buttons: Array<buttonsBubble>;
}

export interface buttonsBubble {
   title: string,
   icon: ReactElement,
   route: string
}