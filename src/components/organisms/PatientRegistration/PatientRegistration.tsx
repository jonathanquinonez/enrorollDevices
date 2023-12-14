import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList } from 'react-native';
import useStyles from 'hooks/useStyles';
import { userSelectors } from 'adapter/user/userSelectors';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'adapter/hooks';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
//Components
import PatientRegisPagination from 'src/components/molecules/PatientRegisPagination/PatientRegisPagination';
import FirstData from './FirstData/FirstData';
import ModalWarning from 'src/components/molecules/ModalWarning/ModalWarning';
import SecondData from './SecondData/SecondData';
import Consents from 'src/components/molecules/Consents/Consents';
//import ModalForgotPassword from './ModalForgotPassword/ModalForgotPassword';
import PatientRegisMedia from 'src/components/molecules/PatientRegisMedia/PatientRegisMedia';
//Types
import { PatientRegistrationProps } from './PatientRegistration.types';
//Styles
import componentStyles from './PatientRegistration.styles';
import Row from 'src/components/atoms/Row/Row';
import RegisterService from 'adapter/api/registerService';
import { TIMES_ZONES, getCustomDate } from 'src/utils/devices';

/**
 * Render a ForgotPasswordIntro.
 * @since 1.0.0
 */
const PatientRegistrationIntro: React.FC<PatientRegistrationProps> = (props) => {

    const { } = props;
    const { styles, colors } = useStyles(componentStyles);
    const [position, setPosition] = useState(0);
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();
    const navigation = useNavigation();
    const [firstData, setFirstData] = useState<any>({});
    const [secondData, setSecondData] = useState<any>({});

    const { closeModal, setModal } = useBottomSheet();
    const bottomRef = React.createRef<FlatList>();
    const tempSessionId = useAppSelector(userSelectors.selectTempSessionId);
    const { editAccountdata } = useAppSelector(userSelectors.selectEditAccountdata);
    const { serverDate: startDateState, hourDifference, statusMaintenance, maintenanceData } = useAppSelector(userSelectors.selectServerDate);

    const openwarning = useCallback(() => {
        const message = maintenanceData?.message;
        const payload = maintenanceData?.payload;
        const dateInitET = getCustomDate({ date: payload?.date_init ?? '', language: t('general.locale'), timeZone: TIMES_ZONES.ET });
        const dateEndET = getCustomDate({ date: payload?.date_end ?? '', language: t('general.locale'), timeZone: TIMES_ZONES.ET });
        const dateInitCT = getCustomDate({ date: payload?.date_init ?? '', language: t('general.locale'), timeZone: TIMES_ZONES.CT });
        const dateEndCT = getCustomDate({ date: payload?.date_end ?? '', language: t('general.locale'), timeZone: TIMES_ZONES.CT });

        // const textMessage = `${dateInitET.date} ${dateInitET.time} / ${dateInitCT.time} ${t('general.locale') === 'es' ? 'al' : 'to'} ${dateEndET.time} / ${dateEndCT.time}`;
        const textMessage = `${dateInitET.date} ${dateInitET.time} / ${dateInitCT.time} ${t('general.locale') === 'es' ? 'al' : 'to'} ${dateEndET.date} ${dateEndET.time} / ${dateEndCT.time}`;

        if (maintenanceData && message) {
            const body = t('warningMessage.maintenance');
            if (body) {
                const textView = body.replace('[message]', textMessage);
                setModal({
                    render: () => (<ModalWarning
                        delateBtn
                        isIconAlert
                        styleTitle={{ color: '#055293', fontSize: 16 }}
                        styleSubtitle={{ color: '#055293', fontSize: 14 }}
                        onPress={() => {
                            closeModal();
                        }}
                        title={textView}
                        warningText={t('warningMessage.maintenanceSub')} />),
                    blockModal: true
                });
            }
        }
    }, [startDateState, maintenanceData]);

    const updateIndexScroll = (ref: React.RefObject<FlatList<any>>, position: number) => {
        ref.current?.scrollToIndex({
            animated: true,
            index: position
        })
    }
    const handlerNext = async () => {
        if (position == bottomData.length) {
            setOpen(true);
        } else {
            const newPosition = position + 1;
            updateIndexScroll(bottomRef, newPosition);
            setPosition(newPosition);
        }
    }
    const handlerBack = () => {
        if (position == 0) {
            resetLogin();
        } else {
            const newPosition = position - 1;
            updateIndexScroll(bottomRef, newPosition);
            setPosition(newPosition);
        }
    }


    let bottomData: any = [
        {
            id: 0,
            children: <FirstData handlerNext={handlerNext} setFirstData={setFirstData} />
        },
        {
            id: 1,
            children: <SecondData handlerNext={handlerNext} setSecondData={setSecondData} />
        },
        {
            id: 2,
            children: <Consents
                statusMaintenance={statusMaintenance}
                openwarning={openwarning}
                handlerNext={handlerNext}
                secondData={secondData}
                firstData={firstData}
            />
        },
    ];

    let titles: any = [
        t('patientRegistration.stepTitleA'),
        t('patientRegistration.stepTitleB'),
        t('patientRegistration.stepTitleC'),
    ]

    const resetLogin = () => {
        navigation.dispatch(
            CommonActions.navigate({
                name: editAccountdata?.isNewVersion ? 'Root' : 'Login',
            })
        )
    }

    return (
        <>
            <Row>
                <PatientRegisMedia
                    titles={titles}
                    currentPosition={position}
                    handlerExit={statusMaintenance == 'in_maintenance' ? () => openwarning() : () => resetLogin()} />
            </Row>
            <Row width={3} style={{ backgroundColor: colors.BLUE8AF }}>
                <PatientRegisPagination ref={bottomRef} bottomData={bottomData} currentPosition={position} handlerBack={statusMaintenance == 'in_maintenance' ? () => openwarning() : handlerBack} handlerNext={statusMaintenance == 'in_maintenance' ? () => openwarning() : handlerNext} />
            </Row>
        </>
    )

}


export default PatientRegistrationIntro;
