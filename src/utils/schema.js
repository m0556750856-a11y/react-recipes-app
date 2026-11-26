import Joi from "joi";

// סכמת joi לטופס ההתחברות (משמשת את react-hook-form דרך joiResolver)
export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "אימייל הוא שדה חובה",
      "string.email": "כתובת האימייל אינה תקינה",
      "any.required": "אימייל הוא שדה חובה",
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      "string.empty": "סיסמא היא שדה חובה",
      "string.min": "הסיסמא חייבת להכיל לפחות 6 תווים",
      "any.required": "סיסמא היא שדה חובה",
    }),
});
