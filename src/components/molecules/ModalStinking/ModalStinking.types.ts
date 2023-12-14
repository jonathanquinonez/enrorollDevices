export interface ModalStinkingProps {
  	/**
	 * Method called after pressing the button.
	 * @since 1.0.0
	 * @example onPress={() => handlePress()}
	 */
	onPress?: () => void;

	title: string;

	quote: string;

	body: string

}
