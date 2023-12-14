export interface ErrorAlertProviderProps {
  
}

export interface AlertErrorContextProps {
  /**
   * This method receives the message that will be displayed in the alert
   * @since 1.0.0
   * @example setIsAlertError('Error message')
   */
   setAlertErrorMessage: (satus: string, type?: 'error' | 'warning' | 'success' | 'successNotification') => void;
}