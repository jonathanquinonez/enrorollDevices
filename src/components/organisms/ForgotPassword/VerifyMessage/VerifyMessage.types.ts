import { EmailIdentifier } from "domain/entities/emailIdentifier";

/**
 * @interface VerifyMessageProps
 * @since 1.0.x
 */
export interface VerifyMessageProps {
    newData: EmailIdentifier;
    setCode: (value: string) => void;
    openwarning: () => void;
    isByEmail: boolean | undefined
    resetForm: () => Promise<void>;
    handlerBack: () => void;
    navigateSupportChat: any;
    statusMaintenance?: string
}
