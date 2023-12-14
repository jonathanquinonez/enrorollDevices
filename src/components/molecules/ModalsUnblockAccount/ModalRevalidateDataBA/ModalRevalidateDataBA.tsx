import React from 'react'

// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { ModalRevalidateDataBAProps as Props } from './ModalRevalidateDataBA.types';
import componentStyles from './ModalRevalidateDataBA.styles';

/**
 * Render a ModalRevalidateDataBA.
 * @since 1.0.0
 */
const ModalRevalidateDataBA = (props: Props) => {
  const { style, isMobile } = props;
  const { styles } = useStyles(componentStyles);

  return (
    <></>
  )
}

export default ModalRevalidateDataBA