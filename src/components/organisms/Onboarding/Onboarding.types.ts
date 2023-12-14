import { MediaDataType } from "src/components/molecules/OnboardingMedia/OnboardingMedia.types";
import { BottomDataType } from "src/components/molecules/OnboardingPagination/OnboardingPagination.types";

export interface OnboardingIntroProps {
    /**
      * media object.
      * @since  1.0.0
      * @example value={[]}
      */
    media: MediaDataType[],
    /**
      * bottom object.
      * @since  1.0.0
      * @example value={[]}
      */
    bottom: BottomDataType[],
    /**
      * onFinish handler.
      * @since  1.0.0
      * @example value={action()}
      */
     onFinish: () => void
}