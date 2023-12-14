import { FontAwesome } from '@expo/vector-icons';
import { StyleProp, ViewStyle } from 'react-native';

/**
 * @interface PaginatorProps
 * @since 1.0.0
 */
export interface PaginatorProps {
  currentPage: number;
  itemsPerPage: number;
  lastPage: number;
  select: (page: any) => void;
  totalItems: number;
}
