import { RootGeneral } from "src/components/molecules/RootGeneral/RootGeneral";
import { VitalSignResultsBody } from "./Results/Results";
import { useTranslation } from "react-i18next";


export const VitalSignResults = (props: any) => {
	const { t } = useTranslation();

    return (
        <RootGeneral
            title={t('wellness.results.title')}
            subtitle = {t('wellness.results.subTitle')}
            content = {<VitalSignResultsBody />}
            isButton = {false}
        />
    )
}