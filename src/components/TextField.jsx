import { useId } from 'react';

// שדה טקסט עם label מקושר, הודעת שגיאה, ו-id ייחודי מ-useId.
// ב-React 19 אפשר להעביר ref כ-prop רגיל, ולכן register של react-hook-form עובד דרך ...props.
export default function TextField({ label, error, ...props }) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div style={{ marginBottom: 12 }}>
      <label htmlFor={id} style={{ display: 'block' }}>
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      {error && (
        <p id={errorId} role="alert" style={{ color: 'crimson', margin: 0, fontSize: 14 }}>
          {error}
        </p>
      )}
    </div>
  );
}
