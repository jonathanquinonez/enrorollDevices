export type ValidNames =
  | "change_password"
  | "block_account"
  | "log_in"
  | "biometrical_login"
  | "annual_wellness_visit"
  | "update_insurance_information"
  | "new_referral"
  | "edit_profile";

export const notificationNames = [
  'change_password',
  'block_account',
  'log_in',
  'biometrical_login',
  'annual_wellness_visit',
  'update_insurance_information',
  'new_referral',
  'edit_profile',
];

type Functionality = {
  sms: boolean | null | undefined;
  push: boolean | null | undefined;
  email: boolean | null | undefined;
};

export type UserNotifications = {
  name: ValidNames;
  type: "security" | "notification";
  functionality: Functionality;
};

export interface UserNotificationsList {
  authUid?: string;
  state?: string;
  notificationList: UserNotifications[];
};

export const initialDataNf = (name: ValidNames): UserNotifications => {
  return {
    functionality: {
      email: email.some((v) => v == name) == false ? null : false,
      push: push.some((v) => v == name) == false ? null : false,
      sms: sms.some((v) => v == name) == false ? null : false,
    },
    name,
    type: name == 'annual_wellness_visit' || name == 'new_referral' ? 'notification' : 'security',
  }
}

export const removeObjectByUuid = (list: NotificationsGeneral[], uuid: string) => {
  return list.filter(object => object.uuid !== uuid);
}

export interface NotificationsGeneral {
  uuid: string;
  authUid: string;
  date: string;
  viewed: boolean;
  functionality: ValidNames;
  titleEs: string | null;
  titleEn: string | null;
  bodyEs: string | null;
  bodyEn: string | null;
}

const sms: ValidNames[] = ['log_in', 'biometrical_login', 'annual_wellness_visit', 'new_referral']
const push: ValidNames[] = ['annual_wellness_visit', 'new_referral']
const email: ValidNames[] = ['change_password', 'block_account', 'annual_wellness_visit', 'update_insurance_information', 'new_referral', 'edit_profile']

export const markAllAsViewed = (inputArray: UserNotifications[]) => {
  // Crear una nueva copia del arreglo con todos los objetos "viewed" establecidos en true
  const newArray = inputArray.map(item => ({
    ...item,
    viewed: true,
  }));

  return newArray;
}

const maritalStatusEn = [
  "Single",
  "Married",
  "Divorced",
  "Widowed",
  "Domestic partner"]

const maritalStatusEs = [
  "Soltero/a",
  "Casado/a",
  "Divorciado/a",
  "Viudo/a",
  "Pareja de hecho",
]

export const getMaritalStatusLabel = (status: any, items: { key: number; label: string; value: string; }[]) => {
  const indexEn = maritalStatusEn.indexOf(status);
  const indexEs = maritalStatusEs.indexOf(status);

  if (indexEn !== -1) {
    return { label: items[indexEn].label, value: items[indexEn].value };
  } else if (indexEs !== -1) {
    return { label: items[indexEs].label, value: items[indexEs].value };
  } else {
    return { label: '', value: "0" };
  }
};