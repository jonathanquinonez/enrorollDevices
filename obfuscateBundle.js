const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');
const path = require('path');

const bundlePath = path.join(
	__dirname,
	'android/app/build/generated/assets/react/release/index.android.bundle',
);
const bundle = fs.readFileSync(bundlePath, 'utf8');

const obfuscatedBundle = JavaScriptObfuscator.obfuscate(bundle, {
	compact: true,
	controlFlowFlattening: false,
	deadCodeInjection: false,
	renameGlobals: false,
	stringArray: true,
	stringArrayEncoding: ['base64'], // O 'rc4'
	rotateStringArray: true,
	selfDefending: false,
	disableConsoleOutput: true,
}).getObfuscatedCode();

fs.writeFileSync(bundlePath, obfuscatedBundle);
