import { Action, ThunkAction } from '@reduxjs/toolkit';
import { CaptchaState } from './captcha/captchaState';
import { store } from './store';
import { UserState } from './user/userState';
import { TwoFactorState } from './user/twoFactor/twoFactorState';

export type AppDispatch = typeof store.dispatch;

export type RootState = {
    user: UserState;
    captcha: CaptchaState;
    loader: { loadingActions: number; };
    twoFactorLogin: TwoFactorState
} & ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>>;
