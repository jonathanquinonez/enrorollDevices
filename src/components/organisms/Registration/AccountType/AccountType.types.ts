/**
 * @interface AccountTypeProps
 * @since 1.0.x
 */
export interface AccountTypeProps {
  /**
	 * Method called after pressing the checkbox.
	 * @since 1.0.0
	 * @example value={() => {}}
	 */
  value: (status: number) => void;
}
