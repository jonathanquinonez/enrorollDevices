import { NavigatorScreenParams } from '@react-navigation/native';
import { HomeStackParamList } from '../HomeStackNavigator/HomeStackNavigator.types';

export type BottomTabParamList = {
  PhoneStack: any;
  HomeStack: NavigatorScreenParams<HomeStackParamList> | undefined;
  ChatSupport: any;
  ChatStack: undefined;
  Symptoms: any;
}
