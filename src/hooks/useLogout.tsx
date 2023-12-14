// Hooks
import { useAppDispatch } from 'adapter/hooks';
import { userActions } from 'adapter/user/userSlice';
// Config, Helpers
import AsyncStorage from 'infrastructure/AsyncStorage';

export default function useLogout() {

	const dispatch = useAppDispatch();

	const handleLogout = async () => {
		await AsyncStorage.deleteItem('persist:user');
		await AsyncStorage.deleteItem('isTempAcceptAnnualVisit');
		await AsyncStorage.save("logout", "true");
		dispatch(userActions.tryLogout());
	};

	return { handleLogout }
}
