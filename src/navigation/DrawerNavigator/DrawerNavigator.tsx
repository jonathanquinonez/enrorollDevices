import React from 'react';
import { StatusBar, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Types
import {
	DrawerParamList,
	DrawerRigthParamList,
	DrawerStackParamsList,
} from './DrawerNavigator.types';
import BottomTabNavigator from '../BottomTabNavigator/BottomTabNavigator';
import AsideDrawer from 'src/components/organisms/AsideDrawer/AsideDrawer';
import { screenDimentions } from 'ui-core/utils/globalStyles';
import AsideDrawerRigth from 'src/components/organisms/AsideDrawerRigth/AsideDrawerRigth';
import { VimView } from 'src/screens/VinView/VimView';
import { HealtLibrary } from 'src/screens/Symtoms/HealtLibrary';
import { UpdateScreen } from 'src/screens/MyInsurance/UpdateInsurance/UpdateScreen';
import { ReferralsDetailsScreen } from 'src/screens/MyHealth/ReferralsDetails/ReferralsDetailsScreen';

const Drawer = createDrawerNavigator<DrawerParamList>();
const DrawerNavigator = () => (
	<Drawer.Navigator
		id="LeftDrawer"
		useLegacyImplementation={false}
		drawerContent={(props) => <AsideDrawer {...props} />}
		screenOptions={{
			headerShown: false,
			drawerStyle: {
				//marginTop: StatusBar.currentHeight,
				borderTopRightRadius: 25,
				borderBottomRightRadius: 25,
				width: screenDimentions.width * 0.83,
				overflow: 'hidden',
			},
			drawerType: 'front',
			drawerPosition: 'left',
		}}
	>
		<Drawer.Screen name="Drawer" component={DrawerStackNavigator} />
	</Drawer.Navigator>
);

const DrawerLeft = createDrawerNavigator<DrawerRigthParamList>();
const DrawerNavigatorRigth = () => (
	<Drawer.Navigator
		id="RigthDrawer"
		useLegacyImplementation={false}
		drawerContent={(props) => <AsideDrawerRigth {...props} />}
		screenOptions={{
			drawerPosition: 'right',
			headerShown: false,
			drawerStyle: {
				//marginTop: StatusBar.currentHeight,
				borderTopLeftRadius: 25,
				borderBottomLeftRadius: 25,
				borderColor: 'gray',
				width: screenDimentions.width * 0.83,
				overflow: 'hidden',
			},
		}}
	>
		<DrawerLeft.Screen name="HomeDrawer" component={DrawerNavigator} />
	</Drawer.Navigator>
);

const DrawerStack = createNativeStackNavigator<DrawerStackParamsList>();
const DrawerStackNavigator = () => (
	<DrawerStack.Navigator>
		<DrawerStack.Screen
			name="Tabs"
			component={BottomTabNavigator}
			options={() => ({
				headerShown: false,
			})}
		/>
		<DrawerStack.Screen
			name="ChatWithDoctor"
			component={View}
			options={{ headerShown: false }}
		/>
		<DrawerStack.Screen
			name="VideoCallDoctor"
			component={View}
			options={{ headerShown: false }}
		/>
		<DrawerStack.Screen
			name="ClinicalCallCenter"
			component={View}
			options={{ headerShown: false }}
		/>
		<DrawerStack.Screen name="CarePrograms" component={View} options={{ headerShown: false }} />
		<DrawerStack.Screen name="Registry" component={View} options={{ headerShown: false }} />
		<DrawerStack.Screen name="Referrals" component={View} options={{ headerShown: false }} />
		<DrawerStack.Screen name="LabResults" component={View} options={{ headerShown: false }} />
		<DrawerStack.Screen
			name="Immunizations"
			component={View}
			options={{ headerShown: false }}
		/>
		<DrawerStack.Screen name="Book" component={VimView} options={{ headerShown: false }} />
		<DrawerStack.Screen name="Previous" component={View} options={{ headerShown: false }} />
		<DrawerStack.Screen name="Upcoming" component={View} options={{ headerShown: false }} />
		<DrawerStack.Screen
			name="HealthLibrary"
			component={HealtLibrary}
			options={{ headerShown: false }}
		/>
		<DrawerStack.Screen
			name="UpdateMyInsurance"
			component={UpdateScreen}
			options={{ headerShown: false }}
		/>
		<DrawerStack.Screen
			name="ReferralsDetailsScreen"
			component={ReferralsDetailsScreen}
			options={{ headerShown: false }}
		/>
	</DrawerStack.Navigator>
);

export default DrawerNavigatorRigth;
