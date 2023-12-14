import React, { useCallback, useState } from 'react';
import { FlatList, View } from 'react-native';
import useStyles from 'hooks/useStyles';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
//Types
import { ForgotPasswordProps } from './ForgotPassword.types';
import { FormValues } from './ContactInfoData/ContactInfoData.types';
//Styles
import componentStyles from './ForgotPassword.styles';
//Components
import ForgotPasswPagination from 'src/components/molecules/ForgotPasswPagination/ForgotPasswPagination';
import ForgotPasswMedia from 'src/components/molecules/ForgotPasswMedia/ForgotPasswMedia';
import Row from 'src/components/atoms/Row/Row';
import { BottomDataType } from 'src/components/molecules/ForgotPasswPagination/ForgotPasswPagination.types';
import PersonalInfoData from './PersonalInfoData/PersonalInfoData';
import ContactInfoData from './ContactInfoData/ContactInfoData';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import ModalForgotState from 'src/components/molecules/ModalForgotState/ModalForgotState';
import VerifyMessage from './VerifyMessage/VerifyMessage';
import PasswordDataFP from './PasswordDataFP/PasswordDataFP';
import { useAppSelector } from 'adapter/hooks';
import { userSelectors } from 'adapter/user/userSelectors';
import { TIMES_ZONES, getCustomDate } from 'src/utils/devices';
import ModalWarning from 'src/components/molecules/ModalWarning/ModalWarning';

/**
 * Render a ForgotPasswordIntro.
 * @since 1.0.0
 */
const ForgotPasswordIntro: React.FC<ForgotPasswordProps> = (props) => {

    const { } = props;
    const { styles, colors } = useStyles(componentStyles);
    const [position, setPosition] = useState(0);
    const [formValues, setFormValues] = useState<FormValues>({ email: '' });
    const [newData, setNewData] = useState<any>();
    const [valueCode, setCode] = useState<any>();
    const [open, setOpen] = useState(false);
    const { reset, navigate } = useNavigation();
    const { closeModal, setModal } = useBottomSheet();
    const [inputA, setInputA] = useState(false);
    const [inputB, setInputB] = useState(false);
    const [resetForms, setResetForms] = useState(new Date());
    const [showError, setError] = useState(false);
    const [isByEmail, setIsByEmail] = useState<boolean | undefined>(false);
    const [showError2, setError2] = useState(false);
    const [isSendEmail, setIsSendEmail] = useState(false);
    const { t } = useTranslation();
    const bottomRef = React.createRef<FlatList>();
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

    const stateCheckbox = (id: number) => {
        if (id == 1) { setInputA(!inputA) };
        if (id == 2) { setInputB(!inputB) };
        setError(false)
    }

    const resetForm = useCallback(
        async () => {
            updateIndexScroll(bottomRef, 0);
            setResetForms(new Date())
            setPosition(0);
            resetLogin();
        },
        [position, bottomRef],
    );

    const handlerNext = useCallback(
        async (num?: number) => {
            if (position == bottomData.length - 1) {
                // setOpen(true);
            } else {
                const newPosition = num ? num : position + 1;
                updateIndexScroll(bottomRef, newPosition);
                setPosition(newPosition);
            }
        },
        [position, bottomRef],
    );

    const stateOpenModal = () => {
        setOpen(true);
    }

    const handleSupportChat = () => {
        navigate('ChatSanitas')
    }

    const bottomData: BottomDataType[] = [
        {
            id: 0,
            title: t('forgotPassword.personalInfo'),
            children: <PersonalInfoData
                openwarning={openwarning}
                statusMaintenance={statusMaintenance}
                actionResetForm={resetForm}
                resetForm={resetForms}
                position={position}
                onSubmit={(v: any) => {
                    setFormValues(v);
                    if (Object.keys(v.id).length > 1) stateOpenModal();
                    else statusMaintenance == 'in_maintenance' ? openwarning() : handlerNext();
                }}
                navigateSupportChat={handleSupportChat}
            />
        },
        {
            id: 1,
            title: t('forgotPassword.contactInfo'),
            children: <ContactInfoData
                openwarning={openwarning}
                statusMaintenance={statusMaintenance}
                resetForm={resetForms}
                actionResetForm={resetForm}
                isByEmail={(v) => { setIsByEmail(v) }}
                onPress={(v) => { setNewData(v); statusMaintenance == 'in_maintenance' ? openwarning() : handlerNext(2) }}
                formValues={formValues}
                idError={showError2 || isSendEmail}
                navigateSupportChat={handleSupportChat}
            />
        },
        {
            id: 2,
            title: t('forgotPassword.contactInfo'),
            children: <VerifyMessage
                openwarning={openwarning}
                statusMaintenance={statusMaintenance}
                handlerBack={() => { statusMaintenance == 'in_maintenance' ? openwarning() : handlerBack() }}
                isByEmail={isByEmail}
                newData={newData}
                resetForm={resetForm}
                setCode={(v) => { setCode(v); statusMaintenance == 'in_maintenance' ? openwarning() : handlerNext() }}
                navigateSupportChat={handleSupportChat}
            />
        },
        {
            id: 3,
            title: t('forgotPassword.password'),
            children: <PasswordDataFP formValues={formValues} valueCode={valueCode} handlerNext={() => resetLogin()} navigateSupportChat={handleSupportChat} />
        },
    ];


    const resetLogin = () => {
        reset({ index: 0, routes: [{ name: 'Login' }] });
    }

    const updateIndexScroll = (ref: React.RefObject<FlatList<any>>, position: number) => {
        ref.current?.scrollToIndex({
            animated: true,
            index: position
        })
    }

    const handlerBack = () => {
        setError2(false)
        setIsSendEmail(false)
        if (position == 0) {
            resetLogin();
        } else {
            const newPosition = position - 1;
            updateIndexScroll(bottomRef, newPosition);
            setPosition(newPosition);
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <Row>
                <ForgotPasswMedia titles={[t('forgotPassword.personalInfo2'), t('forgotPassword.contactInfo'), t('forgotPassword.password')]} currentPosition={position == 2 ? 1 : position} handlerExit={statusMaintenance == 'in_maintenance' ? () => openwarning() : () => resetLogin()} />
            </Row>
            <Row width={2} style={{ backgroundColor: colors.BLUE8AF }}>
                <ForgotPasswPagination ref={bottomRef} bottomData={bottomData} currentPosition={position} handlerBack={statusMaintenance == 'in_maintenance' ? () => openwarning() : handlerBack} handlerNext={() => { }} positionRef={position} />
            </Row>
            {open &&
                setModal({
                    render: () => (<ModalForgotState
                        closeModal={closeModal}
                        handlerNext={statusMaintenance == 'in_maintenance' ? () => openwarning() : handlerNext}
                        inputA={inputA}
                        inputB={inputB}
                        setError={setError}
                        setOpen={setOpen}
                        showError={showError}
                        stateCheckbox={stateCheckbox}
                    />), height: 420, blockModal: true
                })
            }
        </View>
    )

}


export default ForgotPasswordIntro;