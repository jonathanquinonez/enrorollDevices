import { RootGeneral } from "src/components/molecules/RootGeneral/RootGeneral"
import { VitalSignForm } from "./VitalSign.form"
import { useTranslation } from "react-i18next";


export const VitalSignScreen = (props: any) => {
  const { t } = useTranslation();

    return (
        <RootGeneral
            title={t('wellness.title1')}
            isForm
            subtitle = {t('wellness.subtitle1')}
            content = {<VitalSignForm />}
            isButton = {false}
        />
    )
}