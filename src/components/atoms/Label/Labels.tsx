import React from 'react';
import { View, Text, Linking, TouchableOpacity, Dimensions } from 'react-native';
import { LabelIconProps as Props } from './Labels.types';
import componentStyles from './Labels.styles';
import useStyles from 'hooks/useStyles';
import { FontAwesome5 } from '@expo/vector-icons';
import DividerLine from 'src/components/atoms/DividerLine/DividerLine';
import { Platform } from 'react-native';

/**
 * Atom label whit icons , title and subtitle
 * @param props
 * @since 1.0.0
 * @returns
 */

export const Labels: React.FC<Props> = (props) => {
	const { styles } = useStyles(componentStyles);
	const {
		isDoubleLine = false,
		url,
		title,
		subTitle,
		icon,
		styleView,
		isTitle2,
		position,
		typeBody,
		maxPosition,
	} = props;
	const { styleTitle, styleSubTitle } = props;

	const handleOpenLink = (url: string) => {
		Linking.openURL(url);
	};

	return (
		<>
			{isTitle2 ? (
				<Text style={styles.text} maxFontSizeMultiplier={1.3}>
					{isTitle2 ?? ''}:
				</Text>
			) : (
				<>
					{
						isDoubleLine ? (
							url != '' && url != null ? (
								<View
									style={[
										styles.container,
										styleView,
										{
											flexDirection: 'column',
											padding: 4,
											alignItems: 'flex-start',
											alignContent: 'flex-start',
										},
									]}
								>
									<View style={styles.flexRow}>
										<View style={{ marginRight: 10 }}>
											{React.cloneElement(icon)}
										</View>

										<View>
											{title == 'URL' ? (
												<View style={styles.flexRow}>
													<Text
														style={[styles.titleUrl]}
														maxFontSizeMultiplier={1.3}
													>
														{title ?? '' + ': '}
													</Text>
													<TouchableOpacity
														onPress={() => handleOpenLink(url)}
													>
														<Text
															numberOfLines={4}
															style={styles.textUrl}
															maxFontSizeMultiplier={1.3}
														>
															{' ' + subTitle ?? ''}
														</Text>
													</TouchableOpacity>
												</View>
											) : (
												<Text
													numberOfLines={4}
													style={styles.title}
													maxFontSizeMultiplier={1.3}
												>
													{title != '' ? title ?? '' + ':  ' : title ?? '' + ''}
													<Text
														numberOfLines={4}
														style={[styles.subTitle]}
														maxFontSizeMultiplier={1.3}
													>
														{subTitle ?? ''}
													</Text>
												</Text>
											)}
										</View>
									</View>
								</View>
							) : title != 'URL' ? (
								typeBody == 'previus' ? (
									<View
										style={[
											{
												width: '90%',
												flexDirection: 'row',
												alignItems: 'flex-start',
												padding: 4,
											},
										]}
									>
										<View
											style={{
												width: '100%',
												flexDirection: 'row',
												flex: 1,
											}}
										>
											<View style={styles.viewElement}>
												{React.cloneElement(icon)}
											</View>

											<View
												style={{
													flexDirection: 'row',
													marginTop: Platform.OS === 'ios' ? 5 : 4,
													flex: 1,
													height: 15,
												}}
											>
												<Text
													style={[styles.title1]}
													maxFontSizeMultiplier={1.3}
												>
													{title ?? '' + ':'}
												</Text>
												<Text
													numberOfLines={4}
													style={[
														styles.subTitle1,
														{
															marginTop:
																Platform.OS === 'ios' ? -1.5 : 0,
														},
													]}
													maxFontSizeMultiplier={1.3}
												>
													{subTitle ?? ''}
												</Text>
											</View>
										</View>
									</View>
								) : (
									<View
										style={[
											styles.container,
											styleView,
											{
												alignItems: 'flex-start',
												marginVertical: 1,
												padding: 4,
											},
										]}
									>
										<View
											style={{
												width: title ? '55%' : '100%',
												flexDirection: 'row',
											}}
										>
											<View style={styles.viewElement}>
												{React.cloneElement(icon)}
											</View>

											{title ? (
												<Text
													style={[
														styles.title,
														styleTitle,
														{ width: '75%' },
													]}
													maxFontSizeMultiplier={1.3}
												>
													{title ?? '' + ':'}
												</Text>
											) : (
												<Text
													style={[styles.subTitle, { width: 400 }]}
													maxFontSizeMultiplier={1.3}
												>
													{subTitle ?? ''}
												</Text>
											)}
										</View>
										<View style={{ width: '43%' }}>
											{title ? (
												<Text
													numberOfLines={4}
													style={[styles.subTitle, styleSubTitle]}
													maxFontSizeMultiplier={1.3}
												>
													{subTitle ?? ''}
												</Text>
											) : (
												<></>
											)}
										</View>
									</View>
								)
							) : null //Hide item url
						) : url != '' && url != null ? (
							<View
								style={[
									styles.container,
									styleView,
									{
										flexDirection: 'column',
										padding: 4,
										alignItems: 'flex-start',
										alignContent: 'flex-start',
									},
								]}
							>
								<View style={styles.flexRow}>
									<View style={{ marginRight: 10 }}>
										{React.cloneElement(icon)}
									</View>

									<View style={{}}>
										{title == 'URL' ? (
											<View style={styles.flexRow}>
												<Text
													style={[styles.titleUrl]}
													maxFontSizeMultiplier={1.3}
												>
													{title ?? '' + ': '}
												</Text>
												<TouchableOpacity
													onPress={() => handleOpenLink(url)}
												>
													<Text
														numberOfLines={4}
														style={styles.textUrl}
														maxFontSizeMultiplier={1.3}
													>
														{' ' + subTitle ?? ''}
													</Text>
												</TouchableOpacity>
											</View>
										) : (
											<Text
												numberOfLines={4}
												style={styles.title}
												maxFontSizeMultiplier={1.3}
											>
												{title != '' ? title ?? '' + ':  ' : title ?? '' + ''}
												<Text
													numberOfLines={4}
													style={[styles.subTitle]}
													maxFontSizeMultiplier={1.3}
												>
													{subTitle ?? ''}
												</Text>
											</Text>
										)}
									</View>
								</View>
							</View>
						) : title != 'URL' ? (
							<View
								style={[
									styles.container,
									styleView,
									{ margin: 1, padding: 4, alignItems: 'center' },
								]}
							>
								<View
									style={{
										alignItems: 'center',
										justifyContent: 'center',
										width: 55,
									}}
								>
									{React.cloneElement(icon)}
								</View>
								<View style={{ left: 5 }}>
									<Text
										style={[styles.title, styleTitle]}
										maxFontSizeMultiplier={1.3}
									>
										{title ?? '' + ':'}
									</Text>
									{subTitle ? (
										<Text
											numberOfLines={4}
											style={[
												styles.subTitle,
												styleSubTitle,
												{ width: Dimensions.get('window').width * 0.5 },
											]}
											maxFontSizeMultiplier={1.3}
										>
											{subTitle ?? ''}
										</Text>
									) : (
										<></>
									)}
								</View>
							</View>
						) : null //Hide item url
					}
				</>
			)}
			{maxPosition === 7 && typeBody === 'insurance' && position === 3 && (
				<DividerLine
					style={{
						width: Dimensions.get('window').width * 0.75,
						paddingTop: 19,
						marginBottom: 24,
					}}
				/>
			)}
			{maxPosition === 8 && typeBody === 'insurance' && position === 4 && (
				<DividerLine
					style={{
						width: Dimensions.get('window').width * 0.75,
						paddingTop: 19,
						marginBottom: 24,
					}}
				/>
			)}
		</>
	);
};
