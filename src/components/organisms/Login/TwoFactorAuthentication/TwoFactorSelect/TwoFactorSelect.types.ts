/**
 * @interface AccountVerificationProps
 * @since 1.0.x
 */
export interface AccountVerificationProps {
	values: any;
	data: any;
	verifyMessage: () => void;
	optionNumber: number;
	receiveService: number;
	/**
   	* Method to clean the form passing the time to update and clean the data
   	* @example resetForm={new Date()}
   	* @since  1.0.0
   	*/
	resetForm: Date;
	actionResetForm: () => Promise<void>

}
