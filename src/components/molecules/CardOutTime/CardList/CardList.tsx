import React, { useState } from 'react';
import { View, Text } from 'react-native';
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
			<Row style={styles.row}>
				<View style={{ marginLeft: 70, paddingVertical: 20 }}>
					<View style={[styles.container, styleContainer]}>
						{React.cloneElement(iconCard)}
						<Text style={styles.title} maxFontSizeMultiplier={1.3}> {nameCard}</Text>
					</View>
					<View
						style={{
							marginTop:-15,
							justifyContent: 'center',
							width: windowDimentions.width * 0.95,
						}}
					>					
						{labels?.map((item, i) => ( 							
							<Labels
								key={`${item.title}-${i}`}
								isDoubleLine={item.doubleLine}
								isTitle2={item.isTitle2} 
								title={item.title} 
								subTitle={item.subTitle}
								icon={item.iconLabel}								
								url={showUrl}
								typeBody={typeBody}
								position={i}
								maxPosition={labels?.length}
							/>
						))}
					</View>
					{!!button ? (
						<>
							{button.map((item: any, index) => {
								return(
								<View key={index} style={[styles.view, index === 0 && {marginTop:30}]}>
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
								</View>);
							})}
						</>
					) : (
						<></>
					)}
				</View>
			</Row>
		</View>
	);
};
