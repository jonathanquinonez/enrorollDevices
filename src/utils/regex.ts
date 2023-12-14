const numbers = '(?=.*?[0-9])';
const uppercase = '(?=.*?[A-Z])';
const lowercase = '(?=.*?[a-z])';
const specialCharacters = '(?=.*?[#?!@$%^&.*-])';
const min8 = '.{8,}$';
const min1 = '.{1,}$';

export const REGEX = {
  atLeastOne: new RegExp(min1),
  consecutiveNumbers:
    /\d*?(?:0(?=[1-9])|1(?=[2-9])|2(?=[3-9])|3(?=[4-9])|4(?=[5-9])|5(?=[6-9])|6(?=[7-9])|7(?=[89])|8(?=9)){3}\d+/,
  date: /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/,
  email: RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/),
  // email: RegExp(
	// 	/^[a-zA-Z0-9!#$%&'*\/=?^_`\{\|\}~\+\-]([\.]?[a-zA-Z0-9!#$%&'*\/=?^_`\{\|\}~\+\-])+@[a-zA-Z0-9]([^@&%$\/\(\)=?¿!\.,:;]|\d)+[a-zA-Z0-9][\.][a-zA-Z]{2,4}([\.][a-zA-Z]{2})?$/,
	// ),
  letters: /^[a-zA-Z\s]*$/,
  lettersNspace: /^[a-zA-ZñÑ\s]*$/,
  lettersNumberSpace: /^[a-zA-Z0-9ñÑ\s]*$/,
  lettersChars: /^[a-zA-ZñÑ\s´.'~^&çÀ-ÿ-_]*$/,
  mediumPassword: new RegExp(
    '^' +
      `${uppercase}${numbers}${min8}|` +
      `${lowercase}${numbers}${min8}|` +
      `${uppercase}${specialCharacters}${min8}|` +
      `${lowercase}${specialCharacters}${min8}|` +
      `${numbers}${specialCharacters}${min8}`,
  ),
  strongPassword: new RegExp(`^${uppercase}${lowercase}${numbers}${specialCharacters}${min8}`),
  password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&.*-]).{8,}$/,
  phone: /^\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/,
  repeatedNumbers: /(.)(\1){3}/,
	zipcode: RegExp(/^[0-9\s-]+$/),
};
