import { formatLocalNumber, onlyDigits } from '../lib/phone.ts'

type PhoneFieldProps = {
  value: string
  onChange: (digits: string) => void
}

export function PhoneField({ value, onChange }: PhoneFieldProps) {
  return (
    <div className="flex h-13 items-center gap-2 rounded-field bg-fill px-4 focus-within:outline-2 focus-within:outline-focus">
      <span className="text-[15px] text-fg">🇷🇺 +7</span>
      <input
        type="tel"
        aria-label="Номер телефона"
        placeholder="123 456 78 90"
        value={formatLocalNumber(value)}
        onChange={(event) => {
          onChange(onlyDigits(event.target.value).slice(0, 10))
        }}
        className="h-10 min-w-0 flex-1 bg-transparent text-[15px] text-fg outline-none placeholder:text-fg-placeholder"
      />
    </div>
  )
}
