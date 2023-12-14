const MAIN = {
	appointments: 'appointments',
	chat: 'chat',
	check: 'check',
	fb: 'fb',
	forgot: 'forgot-password',
	guest: 'guest',
	getCare: 'get-care',
	home: 'home',
	legal: 'legal',
	login: 'login',
	myAccount: 'my-account',
	myHealth: 'my-health',
	notFound: 'not-found',
	patientRegistration: 'patient-registration',
	previousAppointments: 'previous-appointments',
	register: 'register',
	selectLocation: 'select-location',
	sso: 'sso',
	virtualAssistantChat: 'virtual-assistant',
};

const REGISTER = {
	fb: 'fb',
	sanitas: 'sanitas',
	public: 'public',
	hadSanitas: 'had-sanitas',
	accountType: 'account-type',
	account: 'account',
	confirm: 'confirm',
	basic: 'basic',
	complementary: 'complementary',
	contact: 'contact',
	codeSent: 'code-sent',
	verify: 'verify',
	oneMore: 'one-more'
};

const PATIENT_REGISTRATION = {
	responsible: 'responsible-party',
	insurance: 'insurance',
	treatment: 'treatment-consent',
	pharmacy: 'pharmacy',
	hipaa: 'hipaa',
	financial: 'financial',
};

const LEGAL = {
	privacy: 'privacy-policy',
	terms: 'terms-of-service',
	third: 'third-party-notices',
};

const FORGOT = {
	recover: 'recover-password',
	contact: 'contact-form',
	verify: 'verify-option',
	newPass: 'new-password',
	success: 'password-successfully-changed',
};

const MY_HEALTH = {
	labResults: 'lab-results',
	medication: 'medications',
	referrals: 'referrals',
	immunization: 'immunization',
	visitSummary: 'visit-summary',
};

const GET_CARE = {
	getCareNow: 'get-care-now',
	appointments: 'appointments',
	talkToaDoctor: 'talk-to-a-doctor',
	carePrograms: 'care-programs',
	televisit: 'televisit',
	previousAppointments: 'previous-appointments',
	upcomingAppointments: 'upcoming-appointments',
};

const MY_ACCOUNT = {
	personalInfo: 'personal-information',
	myInsurance: 'my-insurance',
};

const ROUTES = {
	MAIN,
	REGISTER,
	PATIENT_REGISTRATION,
	LEGAL,
	FORGOT,
	MY_HEALTH,
	GET_CARE,
	MY_ACCOUNT,
};

export default ROUTES;
