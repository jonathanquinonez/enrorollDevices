// Hooks
import { useAppDispatch } from 'adapter/hooks';
import { userActions } from 'adapter/user/userSlice';
// Config, Helpers
import AsyncStorage from 'infrastructure/AsyncStorage';
import {  useNavigation } from '@react-navigation/native';

export default function useLogout() {
	const navigation: any = useNavigation();
	const dispatch = useAppDispatch();

	const handleLogout = async () => {
		navigation.navigate('Home')
		await AsyncStorage.deleteItem('persist:user');
		await AsyncStorage.deleteItem('isTempAcceptAnnualVisit');
		await AsyncStorage.save("logout", "true");
		dispatch(userActions.tryLogout());
	};

	return { handleLogout }
}
