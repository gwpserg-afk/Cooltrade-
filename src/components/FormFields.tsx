import type { ReactNode, SelectHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string
  children: ReactNode
  required?: boolean
}) {
  return (
    <label htmlFor={htmlFor} className="field-label">
      {children}
      {required && <span className="ml-0.5 text-sun-600">*</span>}
    </label>
  )
}

export function TextField({
  label,
  id,
  required,
  error,
  ...props
}: { label: string; error?: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <Label htmlFor={id!} required={required}>
        {label}
      </Label>
      <input id={id} required={required} className="field-input" {...props} />
      {error && <p className="mt-1 text-xs text-sun-700">{error}</p>}
    </div>
  )
}

export function TextAreaField({
  label,
  id,
  required,
  ...props
}: { label: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <Label htmlFor={id!} required={required}>
        {label}
      </Label>
      <textarea id={id} required={required} className="field-input resize-y" {...props} />
    </div>
  )
}

export function SelectField({
  label,
  id,
  required,
  children,
  ...props
}: { label: string } & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div>
      <Label htmlFor={id!} required={required}>
        {label}
      </Label>
      <select id={id} required={required} className="field-input appearance-none pr-9" {...props}>
        {children}
      </select>
    </div>
  )
}
