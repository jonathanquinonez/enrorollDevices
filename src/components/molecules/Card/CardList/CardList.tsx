import React, { useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Labels } from 'src/components/atoms/Label/Labels';
import Row from 'src/components/atoms/Row/Row';
import Button from 'src/components/atoms/Button/Button';
import { CardList as Props } from './CardList.type';
import componentStyles from './CardList.styles';
import useStyles from 'hooks/useStyles';
import { windowDimentions } from 'ui-core/utils/globalStyles';


export const CardList: React.FC<Props> = (props) => {
	const { button, labels, styleContainer, titleCard, itemObject, showUrl, typeBody } = props;
	const { nameCard, iconCard } = titleCard;
	const { styles } = useStyles(componentStyles);


	return (
		<View style={{ flex: 1 }}>
			<View style={styles.row}>
				<View style={{ paddingVertical: 25, width: '85%' }}>
					<View style={[styles.container, styleContainer]}>
						{React.cloneElement(iconCard)}
						<Text style={styles.title}>{nameCard ?? ''}</Text>
					</View>
					<View
						style={{
							marginTop: -15,
							justifyContent: 'center',
						}}
					>
						{labels?.map((item, i) => (
							<Labels
								key={`labels-${i}`}
								isDoubleLine={item?.doubleLine}
								isTitle2={item?.isTitle2 ?? ''}
								title={item?.title ?? ''}
								subTitle={item?.subTitle}
								icon={item?.iconLabel}
								url={showUrl}
								typeBody={typeBody}
								position={i}
								maxPosition={labels?.length}
							/>
						))}
					</View>
					{!!button &&
						button.map((item: any, index) => {
							return (
								<View
									key={index}
									style={[styles.view, index === 0 && { marginTop: 30 }]}
								>
									<Button
										title={item.name}
										icon={item.isNeedIcon ? item.icon : <></>}
										onPress={() => {
											item.onSubmit(itemObject);
										}}
										textStyle={[item.textStyle]}
										style={[styles.button, item.styleButton]}
										// variant={item.variant ? 'Outlined' : 'Contained'}
										variant={item.variant}
									/>
								</View>
							);
						})}
				</View>
			</View>
		</View>
	);
};
