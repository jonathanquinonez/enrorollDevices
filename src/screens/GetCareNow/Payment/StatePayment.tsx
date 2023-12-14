import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';

import Row from 'src/components/atoms/Row/Row'
import Button from 'src/components/atoms/Button/Button';
import IconCheckBlue from 'icons/IconCheckBlue.svg';
import IconCheckPending from 'icons/IconCheckPending.svg';
import IconCheckRejected from 'icons/IconCheckRejected.svg';
import IconCheckExpired from 'icons/IconCheckExpired.svg';
import { dataExample, Props } from './StatePayment.types';
import Checkbox from 'src/components/atoms/Checkbox/Checkbox';
import componentStyles from './StatePayment.styles';
import useStyles from 'hooks/useStyles';
import { useTranslation } from 'react-i18next';

const StatePayment = ({ status, infoPaypal, onPress, backMenu }: Props & { onPress: () => void; backMenu: () => void }) => {

    const { t } = useTranslation()
    const { styles, colors } = useStyles(componentStyles);
    const [check, setCheck] = useState(false);
    const navigation = useNavigation();

    const listStateItem = (info: dataExample[]) => {
        return (
            info && info.map((item, key) => (
                <View key={key}>
                    <View style={styles.containerList}>
                        <Text style={styles.txtList} maxFontSizeMultiplier={1.3}>{t('payment.state.id')}</Text>
                        <Text numberOfLines={2} style={styles.txtList} maxFontSizeMultiplier={1.3}>{item.id}</Text>
                    </View>
                    <View style={styles.containerList}>
                        <Text style={styles.txtList} maxFontSizeMultiplier={1.3}>{t('payment.state.state')}</Text>
                        <Text style={styles.txtList} maxFontSizeMultiplier={1.3}>{item.state}</Text>
                    </View>
                    {item?.number ?
                        <View style={styles.containerList}>
                            <Text style={styles.txtList} maxFontSizeMultiplier={1.3}>{t('payment.state.date')}</Text>
                            <Text style={styles.txtList} maxFontSizeMultiplier={1.3}>{item?.number ? item.date : ''}</Text>
                        </View>
                        : <></>}
                    {item?.number ?
                        <View style={styles.containerList}>
                            <Text style={styles.txtList} maxFontSizeMultiplier={1.3}>{t('payment.state.number')}</Text>
                            <Text style={[styles.txtList, { width: 145 }]} maxFontSizeMultiplier={1.3}>{item?.number}</Text>
                        </View>
                        : <></>}
                    {item?.number ?
                        <View style={styles.containerList}>
                            <Text style={[styles.txtList, { fontSize: 20 }]} maxFontSizeMultiplier={1.3}>{t('payment.state.value')}</Text>
                            <Text style={[styles.txtList, { fontSize: 20 }]} maxFontSizeMultiplier={1.3}>{item?.number ? item.value : ''}</Text>
                        </View>
                        : <></>}
                </View>
            ))
        )
    };

    const returnIconTitle = () => {
        switch (status) {
            case 1:
                return (
                    <>
                        <IconCheckBlue />
                        <Text style={styles.title} maxFontSizeMultiplier={1.3}>{t('payment.state.titleApproved')}</Text>
                    </>
                )
            case 2:
                return (
                    <>
                        <IconCheckPending />
                        <Text style={styles.title} maxFontSizeMultiplier={1.3}>{t('payment.state.titlePending')}</Text>
                    </>
                )
            case 3:
                return (
                    <>
                        <IconCheckRejected />
                        <Text style={styles.title} maxFontSizeMultiplier={1.3}>{t('payment.state.titleRejected')}</Text>
                    </>
                )
            case 4:
                return (
                    <>
                        <IconCheckExpired />
                        <Text style={styles.title} maxFontSizeMultiplier={1.3}>{t('payment.state.titleExpired')}</Text>
                    </>
                )
            default:
                return <></>
        }
    }

    const returnMessage = () => {
        switch (status) {
            case 2:
                return <Text style={styles.message} maxFontSizeMultiplier={1.3}>{t('payment.state.messagePending')}</Text>
            case 3:
                return <Text style={styles.message} maxFontSizeMultiplier={1.3}>{t('payment.state.messageRejected')}</Text>
            case 4:
                return <Text style={styles.message} maxFontSizeMultiplier={1.3}>{t('payment.state.messageExpired')}</Text>
            default:
                return <></>
        }
    }

    return (
        <View style={styles.container}>
            <Row style={{ flexDirection: 'column' }}>
                <View style={{
                    alignItems: 'center',
                }}>
                    {returnIconTitle()}
                </View>

                {returnMessage()}

                <View style={{ marginTop: 10 }}>
                    {listStateItem([infoPaypal])}
                </View>
            </Row>

            {/* {
                status == 2 ? (
                    <TouchableOpacity onPress={() => setCheck(!check)} style={styles.btnSendMsg}>
                        <Checkbox 
                            colorCheckbox='#4E9D2D'
                            value={check}
                            onPress={(val) => setCheck(val)}
                            textStyle={styles.txtBtnMsg}
                            text={t('payment.state.textBtnMsg')}
                        />
                    </TouchableOpacity>
                ) : (<></>)
            } */}

            <View style={{
                alignItems: 'center',
                marginTop: status == 2 ? 25 : 50,
            }}>
                <Button
                    title={status != 1 ? t('payment.state.textBtnBack') : t('payment.state.textBtnNext')}
                    style={{ marginBottom: 15, alignItems: 'center' }}
                    onPress={() => status != 1 ? backMenu() : onPress()}
                />
            </View>
        </View>
    )
}

export default StatePayment