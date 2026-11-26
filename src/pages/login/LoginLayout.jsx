import { Outlet } from "react-router";

// עמוד אב לשלושת הטפסים. כל טופס מוצג בתוך ה-Outlet.
export default function LoginLayout() {
  return (
    <section>
      <h1>התחברות</h1>
      <Outlet />
    </section>
  );
}
