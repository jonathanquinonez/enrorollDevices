import moment from "moment";
import { ReactElement } from "react"
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import FORMATS from "ui-core/utils/formats";

/**
 * @interface CardList
 * @since 1.0.0
 */

export interface CardList {
    /**
     * Object consult information
     */
    itemObject?: any
    /**
     * Array Card de list 
     *@since 1.0.0
     *@example labels={{icon : <Email /> , title : 'Titulo' , subTitle={'SubTitulo'}}} 
     */

    labels: InfLabels[],

    /**
     * Property option button
     *@since 1.0.0
     *@example button={{name={'Nombre Boton'} , isNeedIcon , onSubmit={() =>{}}}} 
     */
    button: ButtonOption[]

    /**
     * Style container
     *@since 1.0.0
     *@example stylecontent={{color:'red'}} 
     */
    styleContainer?: StyleProp<ViewStyle>

    /**
     * Property tittleCard
     *@since 1.0.0
     *@example button={{name={'Nombre Boton'} , isNeedIcon , onSubmit={() =>{}}}} 
     */
    titleCard: {

        nameCard: string;
        iconCard: ReactElement
    }
    showUrl?: any
    index?: number
    minutes: number
    typeBody?: "referals" | "labs" | "register" | "inmunization" | "upcoming" | "previus" | "medication" | "insurance" | "referralsDetails"
}

export type InfLabels = {

    id?: number
    /**
     * Icon label 
     * @since 1.0.0
     * @example icon={ <Email /> }
     */
    iconLabel: ReactElement;

    /**
    * Title label information
    * @since 1.0.0
    * @example title={'Titulo de pruebas'}
    */
    title: string;

    /**
    * Title label information
    * @since 1.0.0
    * @example subtiTitle={'Titulo de pruebas'}
    */
    subTitle: string;

    /**
   * Label need doble line title, subtitle
   * @since 1.0.0
   * @example subtiTitle={'Titulo de pruebas'}
   */
    doubleLine?: boolean

    /**
   * Label need doble line title, subtitle
   * @since 1.0.0
   * @example isTitle2={'Text'}
   */
    isTitle2?: string

    /**
     * Object response service 
     */
    object?: any
    url?: any;
}

export type ButtonOption = {

    /**
     * Icon label 
     * @since 1.0.0
     * @example icon={ <Email /> }
     */

    icon?: ReactElement;

    /**
    * Title label information
    * @since 1.0.0
    * @example label={'Titulo de pruebas'}
    */
    name: string;

    /**
    * Title label information
    * @since 1.0.0
    * @example subtiTitle={'Titulo de pruebas'}
    */
    isNeedIcon?: boolean;

    /**
     * OnSubmit action button
     * @since 1.0.0
     * @example onSubmit = { () =>{}}
     */
    onSubmit: (item?: any) => void;

    /**
     * Style button
     * styleButton= {color : 'red'}
     */
    styleButton?: StyleProp<ViewStyle>

    /**
     * Style button
     * styleButton= {color : 'red'}
     */
    textStyle?: StyleProp<TextStyle>
    /**
     * Variant type button
     */
    variant?: string | boolean
    disabled?: boolean
}

export type ButtonActivation = {
    general_text: React.JSX.Element;
    go_to_appointment: any
    cancel_button: any
    disable_cancelButton: any;
    notUrl?: boolean;
}

export const isCurrentDate = (startTimeI: string, dataI: string): boolean => {
    const startTime = moment(dataI).format(FORMATS.date2);
    const date = startTimeI;
    const utcDate = `${startTime}T${date}:00Z`;
    const newDate: Date = new Date(utcDate);

    const [month, day, year] = moment(newDate).format('MM/DD/YYYY').split('/');
    const inputDate = `${year}-${month}-${day}`;
    const currentDate = moment().format(FORMATS.date2);
    return inputDate === currentDate;
};

export const calculateTimeDifference = (startTimeI: string, dataI: string): number => {
    if (!startTimeI) return 0;

    const startTime = moment(dataI).format(FORMATS.date2);
    const date = startTimeI;
    const utcDate = `${startTime}T${date}:00Z`;
    const newDate: Date = new Date(utcDate);

    const [startHour, startMinute] = moment(newDate, 'hh:mm:ss').format('HH:mm').split(':').map(Number);
    const [currentHour, currentMinute] = moment().format('HH:mm').split(':').map(Number);

    const startTotalMinutes = startHour * 60 + startMinute;
    const currentTotalMinutes = currentHour * 60 + currentMinute;
    return startTotalMinutes - currentTotalMinutes;
}

export const visitTypes = [
    'telehealth',
    'thbeWellfu',
    'thbewellnp',
    'bwell thfu',
    'bwell thnp',
    'OnDemand',
    'bwell',
    'thfu',
    'thnp'
];
