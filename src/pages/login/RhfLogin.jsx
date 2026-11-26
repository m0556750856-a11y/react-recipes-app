import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import TextField from "../../components/TextField";
import { login } from "../../services/auth";
import { loginSchema } from "../../utils/schema";
import { MESSAGES } from "../../utils/validation";

export default function RhfLogin() {
  const navigate = useNavigate();
  const [generalError, setGeneralError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(loginSchema),
    defaultValues: { email: "chef@recipes.com", password: "" },
    // השגיאות מוצגות רק אחרי שנגעו בשדה (blur), ואז מתעדכנות בזמן הקלדה
    mode: "onTouched",
  });

  // handleSubmit קורא לפונקציה הזו רק אם הסכמה עברה בהצלחה
  function onSubmit(data) {
    const user = login(data);
    if (!user) {
      setGeneralError(MESSAGES.general);
      return;
    }
    navigate("/recipes");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onChange={() => setGeneralError("")}
      noValidate
    >
      <h2>טופס react-hook-form</h2>

      <TextField
        label="אימייל"
        type="email"
        error={errors.email?.message}
        {...register("email")}
      />

      <TextField
        label="סיסמא"
        type="password"
        error={errors.password?.message}
        {...register("password")}
      />

      {generalError && (
        <p role="alert" style={{ color: "crimson" }}>
          {generalError}
        </p>
      )}

      <button type="submit">התחברות</button>
    </form>
  );
}
