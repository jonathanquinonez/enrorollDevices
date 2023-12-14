export interface ModalListProps {
	/**
	 * Method called after pressing the button.
	 * @since 1.0.0
	 * @example onPress={() => handlePress()}
	 */
	onPress?: () => void;

  options?: ModalListOptions[];
}

export interface ModalListOptions {
  /**
	 * Param for title of option.
	 * @since 1.0.0
	 * @example "Example option text"
	 */
	name: string;

  /**
	 * Method called after pressing the button.
	 * @since 1.0.0
	 * @example handlerAction={() => handlePress()}
	 */
	handlerAction: () => void;
}
