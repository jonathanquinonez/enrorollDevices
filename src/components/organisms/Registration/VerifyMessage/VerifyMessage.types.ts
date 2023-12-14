/**
 * @interface VerifyMessageProps
 * @since 1.0.x
 */
export interface VerifyMessageProps {
    resetForm: () => void;
    openwarning: () => void;
    handlerBack: () => void;
    data?: any;
    statusMaintenance?: string;
}
