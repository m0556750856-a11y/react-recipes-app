// חוקי הבדיקה לטופס המבוקר ולטופס הלא מבוקר (ב-RHF משתמשים בסכמת joi).
// מקבלת { email, password } ומחזירה אובייקט שגיאות. אובייקט ריק = הכול תקין.
export const MESSAGES = {
  emailRequired: 'אימייל הוא שדה חובה',
  emailInvalid: 'כתובת האימייל אינה תקינה',
  passwordRequired: 'סיסמא היא שדה חובה',
  passwordShort: 'הסיסמא חייבת להכיל לפחות 6 תווים',
  general: 'אימייל או סיסמא שגויים',
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLogin({ email = '', password = '' }) {
  const errors = {};

  if (!email.trim()) errors.email = MESSAGES.emailRequired;
  else if (!EMAIL_REGEX.test(email.trim())) errors.email = MESSAGES.emailInvalid;

  if (!password) errors.password = MESSAGES.passwordRequired;
  else if (password.length < 6) errors.password = MESSAGES.passwordShort;

  return errors;
}
