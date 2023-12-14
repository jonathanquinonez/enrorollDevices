/**
 * @interface LoadingProviderProps
 * @since 1.0.x
 */
export interface LoadingProviderProps {
  /**
   * Description of the property
   * @since  1.0.x
   * @example property='Some example value'
   */
  // property: string;
}

/**
 * @interface LoadingContextProps
 * @since 1.0.0
 */
export interface LoadingContextProps {
  /**
   * This method render the loading overlay component
   * @since 1.0.0
   * @example setLoading(true)
   */
  setLoading: (loading: boolean) => void;
}
