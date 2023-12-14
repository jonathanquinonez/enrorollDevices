import { REGEX } from 'src/utils/regex';
import { RuleType } from './PasswordStrength.types';

export const DEFAULT_VALIDATOR: RuleType[] = [
  {
    color: 'DANGER',
    label: 'StrengthValidator.weak',
    regex: REGEX.atLeastOne,
  },
  {
    color: 'WARNING',
    label: 'StrengthValidator.medium',
    regex: REGEX.mediumPassword,
  },
  {
    color: 'GREENDC1',
    label: 'StrengthValidator.strong',
    regex: REGEX.strongPassword,
  },
];
