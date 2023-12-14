import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import Root from 'src/screens/Root/Root';
import { HomeStackParamList } from './HomeStackNavigator.types';
import { MyHealthScreen } from 'src/screens/MyHealth/MyHealthScreen';
import { ReferalsScreen } from 'src/screens/MyHealth/Referals/ReferalsScreen';
import { RegistryScreen } from 'src/screens/MyHealth/Registry/RegisterScreen';
import { LabScreen } from 'src/screens/MyHealth/Lab/LabScreen';
import { LanguageScreen } from 'src/screens/Language/LanguageScreen';
import { InmmunizationScreen } from 'src/screens/MyHealth/Inmmunization/InmmunizationScreen';
import { MyInsuranceScreen } from 'src/screens/MyInsurance/MyInsurance';
import { BookingScreen } from 'src/screens/Booking/Booking';
import { PersonalInformationScreen } from 'src/screens/PersonalInformation/PersonalInformation';
import { UpcomingBookingScreen } from 'src/screens/Booking/UpcomingBooking/UpcomingBooking';
import { PreviusBookingScreen } from 'src/screens/Booking/PreviusBooking/PreviusBooking';
import { GetCareScreen } from 'src/screens/GetCareNow/GetCareScreen';
import { VideoCallScreen } from 'src/screens/GetCareNow/VideoCallDoctor/VideoCallScreen';
import DeleteAccountScreen from 'src/screens/PersonalInformation/DeleteAccount/DeleteAccountScreen';
import { CareProgramScreen } from 'src/screens/CarePrograms/CareProgram';
import { MedicationScreen } from 'src/screens/MyHealth/Medication/MedicationScreen';
import { ChatDoctorScreen } from 'src/screens/GetCareNow/ChatDoctor/ChatDoctorScreen';
import { UpdateScreen } from 'src/screens/MyInsurance/UpdateInsurance/UpdateScreen';
import { ReferralsDetailsScreen } from 'src/screens/MyHealth/ReferralsDetails/ReferralsDetailsScreen';
import { EditAccountScreen } from '../../screens/PersonalInformation/EditAccount/EditAccount';
import { MentalHealthScreen } from 'src/screens/MentalHealth/MentalHealthScreen';
import { AboutScreen } from 'src/screens/MentalHealth/About/AboutScreen';
import { AppointmentsScreen } from 'src/screens/MentalHealth/Appointments/AppointmentsScreen';
import { FHSScreen } from 'src/screens/MentalHealth/Appointments/FHS/FHSScreen';
import { EducationalResources } from 'src/screens/MentalHealth/EducationalResources/EducationalResourcesScreen';
import { SelfManagementToolsScreen } from 'src/screens/MentalHealth/SelfManagementTools/SelfManagementToolsScreen';
import { OtherResourcesScreen } from 'src/screens/MentalHealth/EducationalResources/OtherResources/OtherResourcesScreen';
import { UnderstandingYourAnxietyScreen } from 'src/screens/MentalHealth/SelfManagementTools/UnderstandingYourAnxiety/UnderstandingYourAnxietyScreen';
import { EntryScreen } from 'src/screens/MentalHealth/SelfManagementTools/UnderstandingYourAnxiety/Entry/EntryScreen';
import { ListAnxiety } from 'src/screens/MentalHealth/SelfManagementTools/Anxiety/ListAnxiety';
import { NeedHelpScreen } from 'src/screens/MentalHealth/NeedHelp/NeedHelp';
import { IndexFHSScreen } from 'src/screens/MentalHealth/Appointments/FHS/IndexFHSScreen';
import { StinkingthinkingScreen } from 'src/screens/MentalHealth/SelfManagementTools/Stinkingthinking/StinkingthinkingScreen';
import SmartwatchScreen from 'src/screens/Smartwatch/SmartwatchScreen';
import { DetailScreen } from 'src/screens/Smartwatch/Detail/DetailScreen';
import { VitalSignScreen } from 'src/screens/VitalSign/VitalSignView';
import { VitalSignResults } from 'src/screens/VitalSign/VitalSign.results';
import { WellnessRecordsResults } from 'src/screens/WellnessRecords/WellnessRecords.results';
import { WellnessScreen } from 'src/screens/Wellness/Wellness';
import { WellnessInstructionsScreen } from 'src/screens/WellnessInstructions/WellnessInstructions';
import { WellnessRecordsScreen } from 'src/screens/WellnessRecords/WellnessRecords';
import { NotificationSettingsScreen } from 'src/screens/Notifications/NotificationSettingsScreen/NotificationSettingsScreen';
import { GeneralNotificationsScreen } from 'src/screens/Notifications/GeneralNotificationsScreen/GeneralNotificationsScreen';
import EnrollDevice from 'src/screens/Notifications/EnrollDeviceScreen/EnrollDevice';

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => (
	<HomeStack.Navigator>
		<HomeStack.Screen name="Home" component={Root} options={{ headerShown: false }} />
		<HomeStack.Screen
			name="EditAccountScreen"
			component={EditAccountScreen}
			options={{ headerShown: false }}
		/>
		<HomeStack.Screen
			name="ReferalsScreen"
			component={ReferalsScreen}
			options={{ headerShown: false }}
		/>
		<HomeStack.Screen
			name="RegistryScreen"
			component={RegistryScreen}
			options={{ headerShown: false }}
		/>
		<HomeStack.Screen name="LabScreen" component={LabScreen} options={{ headerShown: false }} />
		<HomeStack.Screen
			name="InmmunizationScreen"
			component={InmmunizationScreen}
			options={{ headerShown: false }}
		/>
		<HomeStack.Screen
			name="MedicationScreen"
			component={MedicationScreen}
			options={{ headerShown: false }}
		/>

		<HomeStack.Screen
			name="MyInsurance"
			component={MyInsuranceScreen}
			options={{ headerShown: false }}
		/>

		<HomeStack.Screen
			name="MyHealthScreen"
			component={MyHealthScreen}
			options={{ headerShown: false }}
		/>
		<HomeStack.Screen
			name="UpdateMyInsurance"
			component={UpdateScreen}
			options={{ headerShown: false }}
		/>
		<HomeStack.Screen
			name="ReferralsDetailsScreen"
			component={ReferralsDetailsScreen}
			options={{ headerShown: false }}
		/>
		<HomeStack.Screen
			name="LanguageScreen"
			component={LanguageScreen}
			options={{ headerShown: false }}
		/>
		<HomeStack.Screen
			name="BookingScreen"
			component={BookingScreen}
			options={{ headerShown: false }}
		/>
		<HomeStack.Screen
			name="PersonalInformationScreen"
			component={PersonalInformationScreen}
			options={{ headerShown: false }}
		/>
		<HomeStack.Screen
			name="UpcomingBookingScreen"
			component={UpcomingBookingScreen}
			options={{ headerShown: false }}
		/>
		<HomeStack.Screen
			name="PreviusBookingScreen"
			component={PreviusBookingScreen}
			options={{ headerShown: false }}
		/>
		<HomeStack.Screen
			name="GetCareScreen"
			component={GetCareScreen}
			options={{ headerShown: false }}
		/>
		<HomeStack.Screen
			name="VideoCallScreen"
			component={VideoCallScreen}
			options={{ headerShown: false }}
		/>
		<HomeStack.Screen
			name="ChatDoctorScreen"
			component={ChatDoctorScreen}
			options={{ headerShown: false }}
		/>
		<HomeStack.Screen
			name="DeleteAccount"
			component={DeleteAccountScreen}
			options={{ headerShown: false }}
		/>
		<HomeStack.Screen
			name="CareProgramScreen"
			component={CareProgramScreen}
			options={{ headerShown: false }}
		/>
		{/* Mental Health */}
		<HomeStack.Screen
			name="MentalHealthScreen"
			component={MentalHealthScreen}
			options={{ headerShown: false }}
		/>
		<HomeStack.Screen
			name="NotificationSettingsScreen"
			component={NotificationSettingsScreen}
			options={{ headerShown: false }}
		/>
		<HomeStack.Screen
				name="EnrollDevice"
				component={EnrollDevice}
				options={{ headerShown: false }}
			/>
		<HomeStack.Screen
			name="GeneralNotificationsScreen"
			component={GeneralNotificationsScreen}
			options={{ headerShown: false }}
		/>
		<HomeStack.Screen
			name="AboutScreen"
			component={AboutScreen}
			options={{ headerShown: false }}
		/>
		<HomeStack.Screen
			name="AppointmentsScreen"
			component={AppointmentsScreen}
			options={{ headerShown: false }}
		/>
		<HomeStack.Screen name="FHSScreen" component={FHSScreen} options={{ headerShown: false }} />
		<HomeStack.Screen
			name="EducationalResources"
			component={EducationalResources}
			options={{ headerShown: false }}
		/>
		<HomeStack.Screen
			name="SelfManagementToolsScreen"
			component={SelfManagementToolsScreen}
			options={{ headerShown: false }}
		/>
		<HomeStack.Screen
			name="OtherResourcesScreen"
			component={OtherResourcesScreen}
			options={{ headerShown: false }}
		/>
		<HomeStack.Screen
			name="UnderstandingYourAnxietyScreen"
			component={UnderstandingYourAnxietyScreen}
			options={{ headerShown: false }}
		/>
		<HomeStack.Screen
			name="EntryScreen"
			component={EntryScreen}
			options={{ headerShown: false }}
		/>
		<HomeStack.Screen
			name="ListAnxiety"
			component={ListAnxiety}
			options={{
				headerShown: false,
			}}
		/>
		<HomeStack.Screen
			name="NeedHelpScreen"
			component={NeedHelpScreen}
			options={{
				headerShown: false,
			}}
		/>
		<HomeStack.Screen
			name="StinkingthinkingScreen"
			component={StinkingthinkingScreen}
			options={{
				headerShown: false,
			}}
		/>
		<HomeStack.Screen
			name="IndexFHSScreen"
			component={IndexFHSScreen}
			options={{ headerShown: false }}
		/>
		<HomeStack.Screen
			name="Smartwatch"
			component={SmartwatchScreen}
			options={{ headerShown: false }}
		/>
		<HomeStack.Screen
			name="HealthDetail"
			component={DetailScreen}
			options={{ headerShown: false }}
		/>
		{/* <HomeStack.Screen
			name="VitalSignScreen"
			component={VitalSignScreen}
			options={{ headerShown: false }}
		/> */}
		<HomeStack.Screen
			name="WellnessScreen"
			component={WellnessScreen}
			options={{ headerShown: false }}
		/>
		<HomeStack.Screen
			name="WellnessInstructionsScreen"
			component={WellnessInstructionsScreen}
			options={{ headerShown: false }}
		/>
		<HomeStack.Screen
			name="WellnessRecordsScreen"
			component={WellnessRecordsScreen}
			options={{ headerShown: false }}
		/>
		<HomeStack.Screen
			name="VitalSignResults"
			component={VitalSignResults}
			options={{ headerShown: false }}
		/>
		<HomeStack.Screen
			name="WellnessRecordsResults"
			component={WellnessRecordsResults}
			options={{ headerShown: false }}
		/>
	</HomeStack.Navigator>
);

export default HomeStackNavigator;
