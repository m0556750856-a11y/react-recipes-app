import { useState } from "react";
import { useNavigate } from "react-router";
import TextField from "../../components/TextField";
import { login } from "../../services/auth";
import { validateLogin, MESSAGES } from "../../utils/validation";

// טופס מבוקר: ערכי השדות נשמרים ב-state, וכל שדה מחובר עם value ו-onChange.
export default function ControlledLogin() {
  const navigate = useNavigate();

  // state אחד לכל הערכים, עם ערכי ברירת המחדל מהטבלה
  const [values, setValues] = useState({ email: "chef@recipes.com", password: "" });
  // state נפרד לשגיאות: { email?, password?, general? }
  const [errors, setErrors] = useState({});

  // פונקציית onChange אחת לכל השדות, לפי ה-name של השדה
  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // מנקים את השגיאה של השדה (ואת השגיאה הכללית) ברגע שמתחילים לתקן
    setErrors((prev) => ({ ...prev, [name]: undefined, general: undefined }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const fieldErrors = validateLogin(values);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    const user = login(values);
    if (!user) {
      setErrors({ general: MESSAGES.general });
      return;
    }

    navigate("/recipes");
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2>טופס מבוקר</h2>

      <TextField
        label="אימייל"
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
      />

      <TextField
        label="סיסמא"
        name="password"
        type="password"
        value={values.password}
        onChange={handleChange}
        error={errors.password}
      />

      {errors.general && (
        <p role="alert" style={{ color: "crimson" }}>
          {errors.general}
        </p>
      )}

      <button type="submit">התחברות</button>
    </form>
  );
}
