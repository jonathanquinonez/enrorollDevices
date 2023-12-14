/**
 * @interface VerifyCodeProps
 * @since 1.0.x
 */
export interface VerifyCodeProps {
    /**
    * This button is executed when a page change is made
    * @since  1.0.0
    * @example handlerNext={handlerNext}
    */
    handlerNext?: () => Promise<void>;
    navigateSupportChat: any;
    formValues: any;
    resetForm: any;
    setCode: (v: any)=> any;
    idError: any;
    handlerBack: any;
    onPressClose: any;
}
