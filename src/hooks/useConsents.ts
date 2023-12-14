import { useAppDispatch } from '../adapter/hooks';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import i18n from 'i18n/i18n';
import ConsentsService from 'adapter/api/consentsService';

interface DropdownProps {
  value: string,
  label: string,
}

const defaultOptions: DropdownProps[] = [
  { label: "", value: "" }
]

type ListItem = { label: string; value: string };

export const getLabelByValue = (list: ListItem[], targetValue: string): string | undefined => {
  const matchingItem = list.find(item => item.value === targetValue);
  return matchingItem ? matchingItem.label : "";
};

const useConsents = () => {

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);


  const [gendersOptions, setGendersOptions] = useState<DropdownProps[]>(defaultOptions);
  const [sexualOrientationOptions, setSexualOrientationOptions] = useState<DropdownProps[]>(defaultOptions);
  const [ethnicityOptions, setEthnicityOptions] = useState<DropdownProps[]>(defaultOptions);
  const [raceOptions, setRaceOptions] = useState<DropdownProps[]>(defaultOptions);
  const [preferedLanguageOptions, setPreferedLanguageOptions] = useState<DropdownProps[]>(defaultOptions);
  const [employmentStatusOptions, setEmploymentStatusOptions] = useState<DropdownProps[]>(defaultOptions);
  const [doYouHaveOptions, setDoYouHaveOptions] = useState<DropdownProps[]>(defaultOptions);

  const [fetchGenders] = ConsentsService.useFetchGendersMutation();
  const [fetchSexualOrientation] = ConsentsService.useFetchSexualOrientationMutation();
  const [fetchEthnicity] = ConsentsService.useFetchEthnicityMutation();
  const [fetchRace] = ConsentsService.useFetchRaceMutation();
  const [fetchPreferedLanguage] = ConsentsService.useFetchPreferedLanguageMutation();
  const [fetchGuarantorEmployment] = ConsentsService.useFetchGuarantorEmploymentMutation();
  const [fetchDoYouHaveMutation] = ConsentsService.useFetchDoYouHaveMutation();

  const [showGenderIdentityOther, setShowGenderIdentityOther] = useState<boolean>(false);
  const [showSexualOrientationOther, setShowSexualOrientationOther] = useState<boolean>(false);
  const [showPreferedLanguageOther, setShowPreferedLanguageOther] = useState<boolean>(false);
  const [showMaritalStatusOther, setShowMaritalStatusOther] = useState<boolean>(false);


  const format = ({ data, isGender = false }: { data: any, isGender?: boolean }): DropdownProps[] => {

    const keys = Object.keys(data);

    return keys.map(key => {
      return {
        value: isGender ? (data[key][0] as string).toUpperCase() : key,
        label: data[key]
      };
    });
  }


  const setStateOther = (stateName: string, state: boolean) => {
    switch (stateName) {
      case 'showGenderIdentityOther':
        setShowGenderIdentityOther(state);
        break;
      case 'showSexualOrientationOther':
        setShowSexualOrientationOther(state);
      case 'showPreferedLanguageOther':
        setShowPreferedLanguageOther(state);
        break;
      case 'showMaritalStatusOther':
        setShowMaritalStatusOther(state);
        break;
      default:
        break;
    }
  };

  const getData = async () => {
    const language = t('general.locale');

    setIsLoading(true);

    Promise.all([
      fetchGenders(language).unwrap(),
      fetchSexualOrientation(language).unwrap(),
      fetchEthnicity(language).unwrap(),
      fetchRace(language).unwrap(),
      fetchPreferedLanguage(language).unwrap(),
      fetchGuarantorEmployment(language).unwrap(),
      fetchDoYouHaveMutation(language).unwrap(),
    ])
      .then(values => {
        const [
          genders,
          sexualOrientation,
          ethnicity,
          race,
          preferedLanguage,
          garantorEmployment,
          doYouHave
        ] = values;

        setGendersOptions(format({ data: genders }));
        setSexualOrientationOptions(format({ data: sexualOrientation }));
        setEthnicityOptions(format({ data: ethnicity }));
        setRaceOptions(format({ data: race }));
        setPreferedLanguageOptions(format({ data: preferedLanguage }));
        setEmploymentStatusOptions(format({ data: garantorEmployment }));
        setDoYouHaveOptions(format({ data: doYouHave }));

      }).catch(errors => {
        console.log({ errors })
      }).finally(() => {
        setIsLoading(false);
      });

  };

  useEffect(() => {
    getData();
      }, []);

  return {
    gendersOptions,
    sexualOrientationOptions,
    ethnicityOptions,
    raceOptions,
    preferedLanguageOptions,
    employmentStatusOptions,
    doYouHaveOptions,
    showGenderIdentityOther,
    showSexualOrientationOther,
    showPreferedLanguageOther,
    showMaritalStatusOther,
    setStateOther
  }

}

export default useConsents;