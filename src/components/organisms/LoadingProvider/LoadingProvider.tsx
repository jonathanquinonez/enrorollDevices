import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import Svg, { Path, PathProps } from 'react-native-svg';
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withRepeat,
	withSequence,
	withTiming,
} from 'react-native-reanimated';

// Hooks
import useStyles from 'hooks/useStyles';
// Redux
import { useAppSelector } from 'adapter/hooks';
import { selectIsLoading } from 'adapter/loader/loaderSelectors';
// Types, Styles
import { LoadingContextProps, LoadingProviderProps as Props } from './LoadingProvider.types';
import componentStyles from './LoadingProvider.styles';

const AnimatedPath: React.ComponentClass<
	Animated.AnimateProps<PathProps | { style: StyleProp<ViewStyle> }>
> = Animated.createAnimatedComponent(Path);
const LoadingContext = createContext<LoadingContextProps | undefined>(undefined);

/**
 * Render a loadingProvider.
 * @since 1.0.0
 */
const LoadingProvider: React.FC<Props> = (props) => {
	const { children } = props;
	// Component states
	const { styles, colors } = useStyles(componentStyles);
	const [isLoading, setIsLoading] = useState(false);
	const animationsTimeouts = useRef<NodeJS.Timeout[]>([]);
	// Redux states
	const loadingRedux = useAppSelector(selectIsLoading);

	const wings = [...Array(4).keys()].map(() => useSharedValue(0));

	const animatedStyles = [...Array(4).keys()].map((val) =>
		useAnimatedStyle(() => ({
			opacity: wings[val].value,
		})),
	);

	const setLoading = (loading: boolean) => {
		setIsLoading(loading);
	};

	const value = useMemo(() => ({
		setLoading,
	}), []);

	useEffect(() => {
		setLoading(loadingRedux);
	}, [loadingRedux]);

	useEffect(() => {
		const time = 600;
		const upTime = 500;
		const totalUp = 500;
		const downTime = 400;
		const totalDown = 400;
		if (isLoading) {
			const total = wings.length - 1;
			wings.forEach((wing, index) => {
				const wingRef = wing;
				wingRef.value = withRepeat(
					withSequence(
						withDelay(
							(upTime / 3) * index,
							withTiming(1, { duration: upTime, easing: Easing.inOut(Easing.ease) }),
						),
						withDelay(
							totalUp - (upTime / 3) * index + upTime,
							withTiming(0, { duration: time, easing: Easing.inOut(Easing.ease) }),
						),
						withDelay(
							0,
							withTiming(1, { duration: time, easing: Easing.inOut(Easing.ease) }),
						),
						withDelay(
							0,
							withTiming(0, { duration: time, easing: Easing.inOut(Easing.ease) }),
						),
						withDelay(
							0,
							withTiming(1, { duration: time, easing: Easing.inOut(Easing.ease) }),
						),
						withDelay(
							(downTime / 3) * (total - index),
							withTiming(0, {
								duration: downTime,
								easing: Easing.inOut(Easing.ease),
							}),
						),
						withDelay(
							totalDown - (downTime / 3) * (total - index) + downTime,
							withTiming(0, {
								duration: downTime,
								easing: Easing.inOut(Easing.ease),
							}),
						),
					),
					-1,
					true,
				);
			});
		} else {
			animationsTimeouts.current.forEach((timeOut) => {
				clearTimeout(timeOut);
			});
			wings.forEach((wing) => {
				const wingRef = wing;
				wingRef.value = 0;
			});
		}
	}, [isLoading]);

	return (
		<LoadingContext.Provider value={value}>
			{children}
			{isLoading ? (
				<View style={styles.loadingContainer}>
					<Svg width="100" height="100" viewBox="0 0 22 25" fill="none">
						<AnimatedPath
							d="M1.78498 14.9778C1.60242 14.757 1.47338 14.4968 1.40797 14.2178C0.436275 11.8674 -0.0403089 9.34183 0.00797257 6.79889C0.0278437 6.29389 0.157892 5.79937 0.388985 5.34991C0.454132 5.1888 0.554566 5.04433 0.68293 4.92718C0.811294 4.81004 0.964305 4.72321 1.13068 4.67303C1.29706 4.62285 1.4726 4.61063 1.64433 4.63726C1.81605 4.6639 1.9796 4.72862 2.12296 4.82684C2.84696 5.22684 3.21096 5.96685 3.75196 6.53985C4.07971 6.85452 4.28863 7.27288 4.3433 7.72393C4.39797 8.17498 4.29505 8.63097 4.05198 9.01483C3.26298 10.7968 2.68597 12.6728 2.01997 14.5148C1.9904 14.6894 1.90846 14.8509 1.78498 14.9778Z"
							fill={colors.BLUEDC1}
							style={animatedStyles[0]}
						/>
						<AnimatedPath
							d="M16.0299 3.85753C16.0136 6.53756 15.1228 9.13907 13.4929 11.2666C13.0342 11.9352 12.3454 12.4115 11.5579 12.6046C8.83392 13.3686 6.12292 14.1776 3.40692 14.9696C3.31892 14.9956 3.22993 15.0186 3.14093 15.0386C2.70093 15.1386 2.6179 15.0605 2.7709 14.6535C3.7649 12.0095 4.55391 9.28755 5.78091 6.73155C6.51425 4.99417 7.57407 3.41361 8.90292 2.07554C9.88708 1.05666 11.1502 0.351191 12.5339 0.0475892C13.1409 -0.0673369 13.7689 0.0273281 14.315 0.316022C14.8612 0.604716 15.293 1.07031 15.5399 1.63658C15.8609 2.33311 16.028 3.09059 16.0299 3.85753Z"
							fill={colors.BLUEDC1}
							style={animatedStyles[1]}
						/>
						<AnimatedPath
							d="M17.278 23.2247C15.2499 23.143 13.28 22.5239 11.5699 21.4307C8.79495 19.8417 6.20095 17.9707 3.49295 16.2767C3.21595 16.1037 3.27796 16.0007 3.52396 15.8857C4.06117 15.6654 4.61445 15.4865 5.17896 15.3506C7.74496 14.5993 10.3116 13.8523 12.879 13.1097C13.2288 12.9927 13.6072 12.9927 13.957 13.1097C15.709 13.6724 17.3244 14.5944 18.7 15.8167C19.6617 16.6772 20.4142 17.7461 20.9 18.9417C21.769 21.1917 20.694 22.9187 18.287 23.1747C17.951 23.2067 17.614 23.2077 17.278 23.2247Z"
							fill={colors.BLUEDC1}
							style={animatedStyles[2]}
						/>
						<AnimatedPath
							d="M8.56991 20.8644C8.46991 21.6204 8.58493 22.3915 8.44693 23.1475C8.34693 23.7065 8.28291 24.3244 7.67791 24.5674C7.07291 24.8104 6.62291 24.4044 6.18991 24.0674C5.2846 23.2636 4.56262 22.2746 4.0729 21.1674C3.45409 19.9049 2.94166 18.593 2.54092 17.2454C2.51095 17.1588 2.49015 17.0694 2.47891 16.9784C2.46591 16.8584 2.42891 16.7045 2.52691 16.6285C2.64591 16.5375 2.75293 16.6745 2.84793 16.7365C4.66493 17.9225 6.47792 19.1164 8.29892 20.2954C8.40072 20.3469 8.48257 20.4306 8.53161 20.5336C8.58066 20.6366 8.59413 20.753 8.56991 20.8644Z"
							fill={colors.BLUEDC1}
							style={animatedStyles[3]}
						/>
					</Svg>
				</View>
			) : null}
		</LoadingContext.Provider>
	);
};

export const useLoading = () => {
	const context = useContext(LoadingContext);
	if (context === undefined) {
		throw new Error('useLoading must be used within a LoadingProvider');
	}
	return context;
};

export default LoadingProvider;
