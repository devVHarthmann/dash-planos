function FormField({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  inputMode,
  autoComplete,
  error,
  onBlur,
}) {
  return (
    <div className="my-data-field">
      <label className="my-data-label" htmlFor={id}>
        {label} <span className="my-data-required" aria-hidden="true">*</span>
      </label>
      <input
        className="my-data-input"
        id={id}
        name={id}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        required
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <span className="my-data-field-error" id={`${id}-error`} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

export default FormField;
