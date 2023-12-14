import { ContactSecurityCredentials } from "domain/entities/ContactSecurityCredentials";
import { UserComplementaryInfo } from "domain/entities/userComplementaryInfo"
import { UserConfirmCredentials } from "domain/entities/userConfirmCredentials";
import { Control, FieldErrorsImpl } from "react-hook-form"

/**
 * @interface PasswordProps
 * @since 1.0.0
 */
export interface PasswordProps {
    /**
     * 
     */
    control: Control<UserComplementaryInfo, any> | Control<ContactSecurityCredentials, any> | Control<UserConfirmCredentials, any> 
    /**
     * 
     */
    errors: any,
    /**
     * 
     */
    setValue: (name: any, value: any) => void;
}
