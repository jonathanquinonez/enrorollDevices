import { NavigationState, ParamListBase, PartialState, Route } from '@react-navigation/native';

/**
 * @interface TabBarCustomProps
 * @since 1.0.0
 */
export interface TabBarCustomProps {}

export type NavigationRoute<
	ParamList extends ParamListBase,
	RouteName extends keyof ParamList,
> = Route<Extract<RouteName, string>, ParamList[RouteName]> & {
	state?: NavigationState | PartialState<NavigationState>;
};
