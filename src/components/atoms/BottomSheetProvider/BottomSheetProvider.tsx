import React, { createContext, useContext, useMemo, useState } from 'react';

// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import {
  BottomSheetContextProps,
  BottomSheetProviderProps as Props,
  SetBottomSheetProps
} from './BottomSheetProvider.types';
import BottomSheet from '../BottomSheet/BottomSheet';
import { screenDimentions } from 'ui-core/utils/globalStyles';


const BottomSheetContext = createContext<BottomSheetContextProps | undefined>(undefined);

/**
 * Render a BottomSheetProvider.
 * @since 1.0.x
 */
const BottomSheetProvider: React.FC<Props> = (props) => {
  const { children } = props;

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

  const value = useMemo(
    () => ({
      setModal: setModalValues,
      closeModal: handleCloseModal,
    }),
    [],
  );


  return (
    <BottomSheetContext.Provider value={value}>
      {children}
      <BottomSheet
        open={openModal}
        radius={30}
        draggable={false}
        hasDraggableIcon
        height={modal.height ? modal.height : screenDimentions.height * 0.45}
        onClose={handleCloseModal}
        blockModal={modal.blockModal ? modal.blockModal : false}
      >
        {modal.render ? modal.render() : <></>}
      </BottomSheet>
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a BottomSheetProvider');
  }
  return context;
};

export default BottomSheetProvider;
