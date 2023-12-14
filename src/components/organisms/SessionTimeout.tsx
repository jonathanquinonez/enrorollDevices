import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../adapter/hooks';
import { userSelectors } from 'adapter/user/userSelectors';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import ModalTimeOut from '../molecules/ModalTimeOut/ModalTimeOut';
import ModalLogOut from '../molecules/ModalTimeOut/ModalLogOut';
import { modalPayments } from 'src/components/atoms/ModalPaymentsProvider/ModalPaymentsProvider';

import useLogout from 'hooks/useLogout';

export let TIME_EXPIRATION_MIN = 10;
export const TIME_EXPIRATION_ADVICE = 1;
export let MINUTE = 60000;
//export let MINUTE = 1000;


const SessionTimeout = (props: { eventState: any }) => {

    const { eventState } = props;

    const { isLoggedIn: isAuthenticated, isPaymentProcess } = useAppSelector(userSelectors.selectIsLoggedIn);
    const { setModal, closeModal } = useBottomSheet();
    const { closeModal2 } = modalPayments();

    const { handleLogout } = useLogout();

    let timeOutInit = useRef<any>();
    let timeOutLogout = useRef<any>();

    // check
    let timeChecker = useCallback(() => {
        console.log('** timeChecker **', isPaymentProcess);
        timeOutInit.current = setInterval(async () => {
            timeLogout();
            openModal();
        }, (TIME_EXPIRATION_MIN - TIME_EXPIRATION_ADVICE + isPaymentProcess ?? 0) * MINUTE);
    }, [isPaymentProcess])

    let timeLogout = useCallback(() => {
        console.log('** timeLogout **', isPaymentProcess);
        timeOutLogout.current = setTimeout(async () => {
            resetTimers();
            openModalLogOut();
        }, (TIME_EXPIRATION_ADVICE + isPaymentProcess ?? 0) * MINUTE);
    }, [isPaymentProcess])

    let resetTimers = () => {
        // console.log('** resetTimers **');
        clearTimeout(timeOutLogout.current);
        clearTimeout(timeOutInit.current);
    }

    useEffect(() => {
        //console.log('** useEffect **');
        resetTimers();
        if (isAuthenticated) {
            timeChecker();
        }
        return () => {
        };
    }, [eventState, isAuthenticated, isPaymentProcess]);

    const handleOnClose = async () => {
        closeModal();
        resetTimers();
        timeChecker();
    }

    const handleOnCloseLogout = async () => {
        closeModal();
        resetTimers();
        handleLogout();
        closeModal2();
    }

    const openModal = async () => {
        try {
            setModal({
                render: () => (
                    <ModalTimeOut onPrimaryPress={handleOnClose}  onCancel={closeModal}/>
                ),
                height: 350
            });
        } catch (error) {
            console.log("Error in show modal TimeOut")
        }
    }

    const openModalLogOut = async () => {
        try {
            setModal({
                render: () => (
                    <ModalLogOut onPrimaryPress={handleOnCloseLogout} />
                ),
                height: 350,
                blockModal: true
            });
        } catch (error) {
            console.log("Error in show modal ModalLogOut (TimeOut)")
        }
    }

    return (
        <>
        </>
    );

};

export default SessionTimeout;


