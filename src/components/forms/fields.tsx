"use client";

import { Icon } from "@/components/ui/icon";

interface BaseProps {
  name: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  onBlurField: (name: string) => void;
}

const control =
  "w-full rounded-sm border bg-ink px-4 text-base text-snow placeholder:text-fog/60 transition-colors focus:border-white focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-white/30";

const stateClass = (error?: string) => (error ? "border-brand" : "border-line hover:border-white/40");

function Shell({
  name,
  label,
  error,
  hint,
  required,
  children,
}: Omit<BaseProps, "onBlurField"> & { children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-snow">
        {label}
        {required ? (
          <span aria-hidden="true" className="text-brand-text">
            {" "}
            *
          </span>
        ) : (
          <span className="font-normal text-fog"> (isteğe bağlı)</span>
        )}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${name}-hint`} className="mt-1.5 text-sm text-fog">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${name}-error`} className="mt-1.5 flex items-start gap-1.5 text-sm text-brand-text">
          <Icon name="alert" className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

const describedBy = (name: string, error?: string, hint?: string) =>
  error ? `${name}-error` : hint ? `${name}-hint` : undefined;

export function TextField({
  type = "text",
  autoComplete,
  inputMode,
  placeholder,
  ...props
}: BaseProps & {
  type?: "text" | "email" | "tel";
  autoComplete?: string;
  inputMode?: "text" | "tel" | "email";
  placeholder?: string;
}) {
  const { name, error, hint, required, onBlurField } = props;
  return (
    <Shell {...props}>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        required={required}
        aria-required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, error, hint)}
        onBlur={() => onBlurField(name)}
        className={`${control} h-12 ${stateClass(error)}`}
      />
    </Shell>
  );
}

export function SelectField({
  options,
  ...props
}: BaseProps & { options: readonly string[] }) {
  const { name, error, hint, required, onBlurField } = props;
  return (
    <Shell {...props}>
      <select
        id={name}
        name={name}
        defaultValue=""
        required={required}
        aria-required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, error, hint)}
        onBlur={() => onBlurField(name)}
        className={`${control} h-12 cursor-pointer ${stateClass(error)}`}
      >
        <option value="" disabled>
          Seçin
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </Shell>
  );
}

export function TextAreaField({
  rows = 5,
  placeholder,
  ...props
}: BaseProps & { rows?: number; placeholder?: string }) {
  const { name, error, hint, required, onBlurField } = props;
  return (
    <Shell {...props}>
      <textarea
        id={name}
        name={name}
        rows={rows}
        placeholder={placeholder}
        required={required}
        aria-required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, error, hint)}
        onBlur={() => onBlurField(name)}
        className={`${control} resize-y py-3 ${stateClass(error)}`}
      />
    </Shell>
  );
}

export function ConsentField({
  error,
  onBlurField,
}: {
  error?: string;
  onBlurField: (name: string) => void;
}) {
  return (
    <div>
      <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-fog">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          aria-required="true"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "consent-error" : undefined}
          onChange={() => onBlurField("consent")}
          className="mt-0.5 size-5 shrink-0 cursor-pointer accent-[#d62a2f]"
        />
        <span>
          Kişisel verilerimin talebime dönüş yapılması amacıyla işlenmesini kabul ediyorum.
          <span aria-hidden="true" className="text-brand-text">
            {" "}
            *
          </span>
        </span>
      </label>
      {error ? (
        <p id="consent-error" className="mt-1.5 flex items-start gap-1.5 text-sm text-brand-text">
          <Icon name="alert" className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Off-screen field that humans never see; bots tend to fill it. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label htmlFor="website">Bu alanı boş bırakın</label>
      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}
