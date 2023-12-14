import React, { useCallback, useEffect, useState } from 'react';
import { ValidateAccountDTO } from 'infrastructure/keraltyApi/models/auth';
import { useTranslation } from 'react-i18next';
//Navigation
import { CommonActions, useNavigation } from '@react-navigation/native';
//Components
import CreateAccountMedia from 'src/components/molecules/CreateAccountMedia/CreateAccountMedia';
import CreateAccountPagination from 'src/components/molecules/CreateAccountPagination/CreateAccountPagination';
import HadSanitasStep from '../Registration/HadSanitasStep/HadSanitasStep';
import AccountInformation from '../Registration/AccountInformation/AccountInformation';
import ContactSecurity from '../Registration/ContactSecurity/ContactSecurity';
import AccountVerification from '../Registration/AccountVerification/AccountVerification';
import VerifyMessage from '../Registration/VerifyMessage/VerifyMessage';
//Styles and Types
import useStyles from 'hooks/useStyles';
import AccountType from '../Registration/AccountType/AccountType';
import { CreateAccountProps } from './CreateAccount.types';
import componentStyles from './CreateAccount.styles';
import Row from 'src/components/atoms/Row/Row';
import { DataType } from 'src/components/molecules/CreateAccountPagination/CreateAccountPagination.types';
import { useAppSelector } from 'adapter/hooks';
import { userSelectors } from 'adapter/user/userSelectors';
import { TIMES_ZONES, getCustomDate } from 'src/utils/devices';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import ModalWarning from 'src/components/molecules/ModalWarning/ModalWarning';
import { useRoute } from '@react-navigation/native';
import RegisterService from '../../../adapter/api/registerService';

/**
 * Render a CreateAccountIntro.
 * @since 2.0.0
 */
const CreateAccountIntro: React.FC<CreateAccountProps> = (props) => {

    const { } = props;
    const { styles, colors } = useStyles(componentStyles);
    const { t } = useTranslation();
    const route = useRoute();
	const params: any = route?.params || {};

    const [position, setPosition] = useState(0);
    const [titles, setTitles] = useState([t('createAccount.progressBtnTitles.medicalServices')]);
    const [isInfo, setIsInfo] = useState(false);
    const [userData, setUserData] = useState({});
    const [userState, setState] = useState<any>('');
    const [elegibilityData, setElegibilityData] = useState<Object | undefined>();
    const [userSecurity, setUserSecurity] = useState({});
    const [accountInfo, setAccountInfo] = useState<ValidateAccountDTO>({ accountNumber: '', dateOfBirth: '', isFBMax: false, id: '' });
    const navigation = useNavigation();
    const [resetForms, setResetForms] = useState(new Date());
    const { serverDate: startDateState, hourDifference, statusMaintenance, maintenanceData } = useAppSelector(userSelectors.selectServerDate);
    const { closeModal, setModal } = useBottomSheet();
	const selectSSO = useAppSelector(userSelectors.selectSSO);
	const [loadMaxUserInfoSSO] = RegisterService.useLazyLoadMaxUserInfoSSOQuery();

    const openwarning = useCallback(() => {
        const message = maintenanceData?.message;
        const payload = maintenanceData?.payload;
        const dateInitET = getCustomDate({ date: payload?.date_init ?? '', language: t('general.locale'), timeZone: TIMES_ZONES.ET });
        const dateEndET = getCustomDate({ date: payload?.date_end ?? '', language: t('general.locale'), timeZone: TIMES_ZONES.ET });
        const dateInitCT = getCustomDate({ date: payload?.date_init ?? '', language: t('general.locale'), timeZone: TIMES_ZONES.CT });
        const dateEndCT = getCustomDate({ date: payload?.date_end ?? '', language: t('general.locale'), timeZone: TIMES_ZONES.CT });

        const textMessage = `${dateInitET.date} ${dateInitET.time} / ${dateInitCT.time} ${t('general.locale') === 'es' ? 'al' : 'to'} ${dateEndET.time} / ${dateEndCT.time}`;
        const privateTextMessage = `${dateEndET.time} - ${dateEndCT.time}`;

        if (maintenanceData && message) {
            const body = t('warningMessage.maintenance');
            if (body) {
                const textView = body.replace('[message]', privateTextMessage);
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


    let newPosition: number = 0;
    // receiveService
    const [receiveService, setReceiveService] = useState(0);

    /* console.log('----------------------------------------------');
    console.log('receiveService -->' , receiveService); */


    const [optionNumber, setOptionNumber] = useState(0);

    //console.log('optionNumber ---> ' , optionNumber);

    const titlesA = [
        t('createAccount.progressBtnTitles.medicalServices'),
        t('createAccount.progressBtnTitles.accountInfo'),
        t('createAccount.progressBtnTitles.contactSecurity'),
        t('createAccount.progressBtnTitles.verification')
    ];
    const titlesB = [
        t('createAccount.progressBtnTitles.medicalServices'),
        t('createAccount.progressBtnTitles.personalInfo'),
        t('createAccount.progressBtnTitles.password'),
        t('createAccount.progressBtnTitles.verification')
    ];
    const titlesC = [
        t('createAccount.progressBtnTitles.medicalServices'),
        t('createAccount.progressBtnTitles.personalInfo'),
        t('createAccount.progressBtnTitles.contactInfo'),
        t('createAccount.progressBtnTitles.verification')
    ];
    const handlerNext = async (num?: number) => {
        if (position == (data.length - 1)) {
            // navigate('PatientRegistration')
        } else {
            if (receiveService == 1 && !num && !position) {
                newPosition = 2;
            } else {
                newPosition = num ? num : position + 1;
            }
            console.log('position ->', newPosition, receiveService)
            setPosition(newPosition);
            setTitles((receiveService == 1 && optionNumber == 1 && newPosition != 1) ? titlesA :
                (receiveService == 1 && optionNumber == 2 && newPosition != 1) ? titlesB :
                    (receiveService == 2) ? titlesC : [t('createAccount.progressBtnTitles.medicalServices')])
            newPosition == 2 ? setIsInfo(true) : setIsInfo(false);

            if(newPosition == 1 && receiveService == 2) {
                if(selectSSO?.tokenFB != undefined && selectSSO?.tempUserSSO != undefined){

                    const response = await loadMaxUserInfoSSO(selectSSO?.tempUserSSO).unwrap();
                    setElegibilityData(response);
        
                }
            }
        }
    };

    useEffect(() => {
        console.log('PR');
        console.log(params.sso);

        if(params && params.sso) {
            const { state, ...values } = params.sso;
            setState(state);
            setUserData({ patientInformation: { ...values, state,  isFBMax: false} });
        }
    }, [])
    

    const resetForm = async () => {
        setResetForms(new Date())
        navigation.dispatch(
            CommonActions.navigate({
                name: 'Login',
            })
        )
    };

    let data: DataType[] = [
        {
            id: 0,
            children: (
                <HadSanitasStep
                    value={async (value) => {
                        setReceiveService(value);
                        if (value == 1) {
                            setOptionNumber(1)
                        } else {
                            setOptionNumber(0)
                        }
                    }}
                />
            ),
        },
        {
            id: 2,
            children: (
                <AccountInformation
                    openwarning={openwarning}
                    statusMaintenance={statusMaintenance}
                    resetForm={resetForms}
                    actionResetForm={() => resetForm()}
                    optionNumber={optionNumber}
                    receiveService={receiveService}
                    setAccountInfo={setAccountInfo}
                    setElegibilityData={setElegibilityData}
                    elegibilityData={elegibilityData}
                    handleNext={(v, num) => {
                        if (statusMaintenance == 'in_maintenance') {
                            openwarning()
                        } else {
                            const { isFBMax, state, ...values } = v;
                            setState(state);
                            setUserData({ patientInformation: { ...values, state }, isFBMax });
                            handlerNext(num)
                        }
                    }}
                />
            ),
        },
        {
            id: 3,
            children: (
                <ContactSecurity
                    openwarning={openwarning}
                    statusMaintenance={statusMaintenance}
                    resetForm={resetForms}
                    accountInfo={accountInfo}
                    elegibilityData={elegibilityData}
                    values={{
                        hadSanitas: receiveService,
                        type: optionNumber,
                    }}
                    handleNext={(v, num) => {
                        if (statusMaintenance == 'in_maintenance') {
                            openwarning()
                        } else {
                            setUserSecurity(v);
                            handlerNext(num);
                        }
                    }}
                />
            ),
        },
        {
            id: 4,
            children: <AccountVerification
                resetForm={resetForms}
                actionResetForm={() => resetForm()}
                optionNumber={optionNumber}
                receiveService={receiveService}
                verifyMessage={statusMaintenance == 'in_maintenance' ? () => openwarning() : handlerNext}
                data={{ userSecurity, userData, userState }}
                values={{ accountInfo }} />,
        },
        {
            id: 5,
            children: <VerifyMessage openwarning={openwarning} statusMaintenance={statusMaintenance} handlerBack={statusMaintenance == 'in_maintenance' ? () => openwarning() : () => { handlerBack() }} resetForm={() => resetForm()} data={{ userState }} />,
        }
    ];


    if (receiveService == 1)
        data.splice(1, 0, {
            id: 1,
            children: <AccountType value={(value) => setOptionNumber(value)} />,
        });


    const handlerBack = () => {
        if (position == 0) {
            navigation.dispatch(
                CommonActions.navigate({
                    name: 'Login',
                })
            )
        } else {
            if (receiveService == 1 && position == 2) newPosition = 0;
            else newPosition = position - 1;
            setPosition(newPosition);
            newPosition == 0 ? setTitles([t('createAccount.progressBtnTitles.medicalServices')]) : setTitles((receiveService == 1 && optionNumber == 1 && newPosition != 1) ? titlesA :
                (receiveService == 1 && optionNumber == 2 && newPosition != 1) ? titlesB :
                    (receiveService == 2) ? titlesC : [t('createAccount.progressBtnTitles.medicalServices')])
            newPosition == 2 ? setIsInfo(true) : setIsInfo(false);
        }
    }

    return (
        <>
            <Row>
                <CreateAccountMedia
                    titles={titles}
                    currentPosition={
                        receiveService == 1 && newPosition == 0
                            ? (position - 1) < 1 ? 0 : position - 1
                            : position}
                    handlerExit={() => {
                        navigation.dispatch({
                            type: 'RESET',
                            payload: {
                                routes: [{ name: 'Login' }],
                                index: 0,
                            },
                        });
                    }} />
            </Row>
            <Row width={2} style={styles.containerPagination}>
                <CreateAccountPagination
                    values={{
                        hadSanitas: receiveService,
                        type: optionNumber,
                    }}
                    positionRef={position}
                    bottomData={data}
                    currentPosition={position}
                    handlerBack={statusMaintenance == 'in_maintenance' ? () => openwarning() : handlerBack}
                    handlerNext={statusMaintenance == 'in_maintenance' ? () => openwarning() : () => handlerNext(undefined)}
                    isInfo={isInfo} />
            </Row>
        </>
    )

}


export default CreateAccountIntro;