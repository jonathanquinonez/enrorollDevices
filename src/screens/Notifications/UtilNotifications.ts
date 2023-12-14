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