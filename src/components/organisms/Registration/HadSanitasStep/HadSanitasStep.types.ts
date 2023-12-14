/**
 * @interface HadSanitasStepProps
 * @since 1.0.x
 */
export interface HadSanitasStepProps {
	/**
	   * Method called after pressing the checkbox.
	   * @since 1.0.0
	   * @example value={() => {}}
	   */
	value: (status: number) => void;
}
