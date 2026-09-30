export function onlyDigits(value: string): string {
  return value.replace(/\D/g, '')
}

export function formatLocalNumber(digits: string): string {
  return [digits.slice(0, 3), digits.slice(3, 6), digits.slice(6, 8), digits.slice(8, 10)]
    .filter((part) => part !== '')
    .join(' ')
}

export function formatPhone(phone: string): string {
  return `+${phone.slice(0, 1)} ${formatLocalNumber(phone.slice(1))}`
}
