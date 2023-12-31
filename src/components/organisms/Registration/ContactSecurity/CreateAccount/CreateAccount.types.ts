import { UserComplementaryInfo } from "domain/entities/userComplementaryInfo"
import { Control, FieldErrorsImpl, UseFormGetValues, UseFormWatch } from "react-hook-form"

/**
 * @interface CreateAccountProps
 * @since 1.0.0
 */
export interface CreateAccountProps {
     /**
      * 
      */
     control : Control<UserComplementaryInfo, any> 
     /**
      * 
      */
     errors :  any;
     elegibilityData: any | undefined
     setValue?: any;
     getValues: UseFormGetValues<UserComplementaryInfo>;
     watch: UseFormWatch<UserComplementaryInfo>
}
