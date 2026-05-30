interface TextFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  error?: string;
  autoComplete?: string;
}

export function TextField({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  error,
  autoComplete,
}: TextFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[14px] font-medium text-ink">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        className={
          "h-12 rounded-md border px-4 text-[15px] text-black outline-none transition-colors placeholder:text-[#B2B6BD] " +
          (error ? "border-red-400 focus:border-red-400" : "border-[#CED0D4] focus:border-brand")
        }
      />
      {error ? <p className="text-[13px] text-red-500">{error}</p> : null}
    </div>
  );
}
