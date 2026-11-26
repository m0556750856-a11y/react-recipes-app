import { useActionState } from "react";
import { useNavigate } from "react-router";
import TextField from "../../components/TextField";
import { login } from "../../services/auth";
import { validateLogin, MESSAGES } from "../../utils/validation";

/*
  תשובה לשאלה: האם אפשר לבדוק תקינות בעת הקלדה?
  ב-action עצמו - לא. הפונקציה שנשלחת ל-action רצה רק בשליחת הטופס (לחיצה על הכפתור),
  ולכן הבדיקה שם היא בשליחה בלבד.
  כן אפשר לבדוק בעת הקלדה, אבל מחוץ ל-action: אם מוסיפים לאינפוט onChange או onBlur
  וקוראים את e.target.value. זה כבר דורש state כדי להציג את השגיאה, ולכן מאבדים
  את היתרון של טופס לא מבוקר. כאן בחרנו לבדוק רק בשליחה.
*/

const DEFAULTS = { email: "chef@recipes.com", password: "" };

export default function UncontrolledLogin() {
  const navigate = useNavigate();

  // action מקבל את המצב הקודם ואת ה-FormData, ומחזיר את המצב החדש.
  async function submitAction(_prevState, formData) {
    // הופכים את ה-FormData לאובייקט רגיל, במקום לקרוא כל שדה עם get
    const values = Object.fromEntries(formData);

    const errors = validateLogin(values);
    if (Object.keys(errors).length > 0) {
      return { values, errors };
    }

    const user = login(values);
    if (!user) {
      return { values, errors: { general: MESSAGES.general } };
    }

    navigate("/recipes");
    return { values, errors: {} };
  }

  const [state, formAction] = useActionState(submitAction, {
    values: DEFAULTS,
    errors: {},
  });

  /*
    ב-React 19 אחרי כל שליחה של טופס עם action, הטופס מתאפס לערכי ה-defaultValue.
    כדי שמה שהמשתמשת הקלידה לא יימחק אחרי שליחה שנכשלה, ה-action מחזיר את הערכים
    ששלחה, ואנחנו משתמשים בהם בתור defaultValue (ולא value, כדי שהשדה יישאר לא מבוקר).
  */
  return (
    <form action={formAction} noValidate>
      <h2>טופס לא מבוקר</h2>

      <TextField
        label="אימייל"
        name="email"
        type="email"
        defaultValue={state.values.email}
        error={state.errors.email}
      />

      <TextField
        label="סיסמא"
        name="password"
        type="password"
        defaultValue={state.values.password}
        error={state.errors.password}
      />

      {state.errors.general && (
        <p role="alert" style={{ color: "crimson" }}>
          {state.errors.general}
        </p>
      )}

      <button type="submit">התחברות</button>
    </form>
  );
}
