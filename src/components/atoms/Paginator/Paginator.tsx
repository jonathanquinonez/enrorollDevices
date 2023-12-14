import React, { useMemo } from 'react'
import { FontAwesome5 } from '@expo/vector-icons';

// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { PaginatorProps as Props } from './Paginator.types';
import componentStyles from './Paginator.styles';
import { Text, TouchableOpacity, View } from 'react-native';
// Images
import CaretRight from 'icons/CaretRight.svg';
import LaretLeft from 'icons/LaretLeft.svg';


/**
 * Render a Paginator.
 * @since 1.0.0
 */
const Paginator = (props: Props) => {
  const {
    itemsPerPage,
    totalItems,
    select,
    currentPage,
    lastPage,
  } = props;
  const { styles } = useStyles(componentStyles);

  const pageNumber = useMemo(() => {
    let pageToList: Array<any> = [];
    const pages = Math.ceil(totalItems / itemsPerPage);

    if (pages <= 6) {
      pageToList = Array.from({ length: pages }, (_v, i) => i + 1);
    } else {
      pageToList = Array.from({ length: 3 }, (_v, i) => i + 1);
      pageToList.push('...');
      pageToList.push(pages);

      for (let n = 2; !pageToList.includes(currentPage); n++) {
        pageToList.length = 0;
        pageToList = Array.from({ length: 3 }, (_v, i) => i + n);
        pageToList.push('...');
        pageToList.push(pages);
      }
    }

    return pageToList;
  }, [currentPage, itemsPerPage, totalItems]);


  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
      <TouchableOpacity onPress={() => { currentPage !== 1 && select(currentPage - 1); }}>
        <LaretLeft />
      </TouchableOpacity>
      {pageNumber.map((page, i) => (
        <TouchableOpacity key={'pn-' + i}
          style={[styles.btn, { backgroundColor: currentPage === page ? '#3CA70D' : '#E5E5E5' }]}
          onPress={() => {
            page !== '...' && select(page);
          }}>
          <Text style={[styles.text, { color: currentPage === page ? '#FFFFFF' : '#5B5C5B' }]} maxFontSizeMultiplier={1.3}>{page}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={() => {
        currentPage !== lastPage && select(currentPage + 1);
      }}>
        <CaretRight />
      </TouchableOpacity>
    </View>
  )
}

export default Paginator