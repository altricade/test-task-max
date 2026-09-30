const LOCALE = 'ru-RU'

export function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString(LOCALE, { hour: '2-digit', minute: '2-digit' })
}

export function formatDay(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString(LOCALE, { day: 'numeric', month: 'long', year: 'numeric' })
}

export function isSameDay(a: number, b: number): boolean {
  return new Date(a).toDateString() === new Date(b).toDateString()
}

export function formatChatDate(timestamp: number): string {
  if (isSameDay(timestamp, Date.now())) {
    return formatTime(timestamp)
  }
  return new Date(timestamp).toLocaleDateString(LOCALE, { day: 'numeric', month: 'short' })
}
