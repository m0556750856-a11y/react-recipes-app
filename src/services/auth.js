import { users } from '../data/users';

// פונקציית הבדיקה המשותפת לכל שלושת הטפסים.
// מחזירה את המשתמשת אם יש התאמה, ו-undefined אם אין.
export function login({ email, password }) {
  const user = users.find(
    (u) => u.email === email && u.password === password
  );
  return user;
}
