import { RootGeneral } from "src/components/molecules/RootGeneral/RootGeneral";
import { WellnessRecordsResultsBody } from "./Results/Results";
import { useTranslation } from "react-i18next";


export const WellnessRecordsResults = (props: any) => {
	const { t } = useTranslation();

    return (
        <RootGeneral
            title={t('wellness.results.title')}
            subtitle = {t('wellness.results.subTitle')}
            content = {<WellnessRecordsResultsBody />}
            isButton = {false}
        />
    )
}