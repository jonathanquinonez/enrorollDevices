import { KeraltyColors } from 'config/theme';
/**
 * @interface PasswordStrengthProps
 * @since 1.0.x
 */
export interface PasswordStrengthProps {
  /**
   * Value to test against the rules.
   * @since  1.0.0
   * @example value='Passw0rd!'
   */
  value: string;
  /**
   * Regex rules to test the value.
   * @since 1.0.0
   */
  rules?: RuleType[];
}

export interface RuleType {
  /**
   * Color to be used if the regex matches value
   * @since 1.0.0
   */
  color: keyof KeraltyColors;
  /**
   * Rule label (Ex. Weak, medium)
   * @since 1.0.0
   */
  label: string;
  /**
   * Regular expression to test value
   * @since 1.0.0
   */
  regex: RegExp;
}
