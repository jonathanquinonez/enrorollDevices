import { StyleProp, TextStyle, ViewStyle } from 'react-native';

/**
 * @interface BreadCrumbProps
 * @since 1.0.0
 */
export interface BreadCrumbProps {
  /**
   * List of routes to show in the breadcrumb
   * @since  1.0.0
   * @example breadcrumbList={[{label: "Login", route:"Login"},{label: "Recovery password"}]}
   */
  breadcrumbList?: Route[];
  /**
   * Styles for the button.
   * @since 1.0.0
   * @example style={{borderColor: "#ffdd34"}}
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Styles for the button.
   * @since 1.0.0
   * @example styleText={{color: "#ffdd34"}}
   */
  styleText?: StyleProp<TextStyle>;
}

export interface Route {
  /**
   * Text to show in the crumb
   * @since 1.0.0
   */
  label: string;
  /**
   * Name of the route to navigate
   * @since 1.0.0
   */
  route?: string;
  /**
   * Params to navigate to the route
   * @since 1.0.0
   */
  params?: any;
}
