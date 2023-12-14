import React, { createContext, useContext, useEffect, useMemo, useState, } from 'react';

// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import {
  BottomSheetContextProps,
  ModalPaymentsProviderProps as Props,
  SetBottomSheetProps
} from './ModalPaymentsProvider.types';
import BottomSheet from '../BottomSheet/BottomSheet';
import { screenDimentions } from 'ui-core/utils/globalStyles';
import { Dimensions, Modal, Text, View } from 'react-native';
import { useAppSelector } from 'adapter/hooks';
import { userSelectors } from 'adapter/user/userSelectors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { extraScrollHeigth } from 'src/utils/devices';


const BottomSheetContext = createContext<BottomSheetContextProps | undefined>(undefined);

/**
 * Render a ModalPaymentsProvider.
 * @since 1.0.x
 */
const ModalPaymentsProvider: React.FC<Props> = (props) => {
  const { children } = props;
  const { currentRoute } = useAppSelector(userSelectors.selectRoute);

  const [openModal, setOpenModal] = useState(false);
  const [modal, setModal] = useState<SetBottomSheetProps>({
    onClose: undefined,
    render: undefined,
  });

  const setModalValues = (values: SetBottomSheetProps) => {
    setModal(values);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    if (modal.onClose) {
      modal.onClose();
    }
    setOpenModal(false);
  };

  useEffect(() => {
    if (currentRoute == 'GetCareScreen' || currentRoute == 'ChatStack') { }
    else setOpenModal(false);
  }, [currentRoute])

  const value = useMemo(
    () => ({
      setModal2: setModalValues,
      closeModal2: handleCloseModal,
    }),
    [],
  );

  const extraScrollHeight = extraScrollHeigth();

  return (
    <BottomSheetContext.Provider value={value}>
      {children}
      {openModal && <View style={[{ position: 'absolute',  }]}>
        <KeyboardAwareScrollView
          enableAutomaticScroll
          keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
          extraScrollHeight={extraScrollHeight}
          enableOnAndroid={true}
          contentContainerStyle={{
            width: Dimensions.get('window').width, height: Dimensions.get('window').height, alignContent: 'center', justifyContent: 'center', backgroundColor: '#25252589'
          }} >
          <View style={{
            backgroundColor: '#FFF',
            marginHorizontal: 10,
            borderRadius: 20,
            paddingVertical: 40
          }}>{modal.render ? modal.render() : <></>}</View>
        </KeyboardAwareScrollView>
      </View>
      }
    </BottomSheetContext.Provider>
  );
};

export const modalPayments = () => {
  const context = useContext(BottomSheetContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalPaymentsProvider');
  }
  return context;
};

export default ModalPaymentsProvider;
