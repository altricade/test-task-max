import { z } from 'zod'

export type Credentials = {
  apiUrl: string
  idInstance: string
  apiTokenInstance: string
}

type RequestOptions = {
  path?: string
  init?: RequestInit
  emptyOnTimeout?: boolean
}

function errorMessage(status: number): string {
  if (status === 401 || status === 403 || status === 404) {
    return 'Неверный apiUrl, idInstance или apiTokenInstance'
  }
  if (status === 429) {
    return 'Слишком много запросов, попробуйте позже'
  }
  return `Ошибка GREEN-API (${String(status)})`
}

async function request(credentials: Credentials, method: string, options: RequestOptions = {}): Promise<unknown> {
  const { apiUrl, idInstance, apiTokenInstance } = credentials
  const url = `${apiUrl}/waInstance${idInstance}/${method}/${apiTokenInstance}${options.path ?? ''}`

  let response: Response
  try {
    response = await fetch(url, options.init)
  } catch {
    throw new Error('Не удалось подключиться к apiUrl')
  }

  if (response.status === 408 && options.emptyOnTimeout === true) {
    return null
  }

  if (!response.ok) {
    throw new Error(errorMessage(response.status))
  }

  const text = await response.text()
  const data: unknown = text === '' ? null : JSON.parse(text)
  return data
}

function parse<T>(schema: z.ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data)
  if (!result.success) {
    throw new Error('Неожиданный ответ от GREEN-API')
  }
  return result.data
}

function post(body: unknown): RequestInit {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }
}

export async function getStateInstance(credentials: Credentials): Promise<string> {
  const data = await request(credentials, 'getStateInstance')
  return parse(z.object({ stateInstance: z.string() }), data).stateInstance
}

export async function checkAccount(credentials: Credentials, phone: string) {
  const data = await request(credentials, 'checkAccount', { init: post({ phoneNumber: Number(phone) }) })
  return parse(z.object({ exist: z.boolean(), chatId: z.string().optional() }), data)
}

export async function sendMessage(credentials: Credentials, chatId: string, message: string): Promise<string> {
  const data = await request(credentials, 'sendMessage', { init: post({ chatId, message }) })
  return parse(z.object({ idMessage: z.string() }), data).idMessage
}

const notificationSchema = z.object({
  receiptId: z.number(),
  body: z.unknown(),
})

export async function receiveNotification(credentials: Credentials) {
  const data = await request(credentials, 'receiveNotification', { path: '?receiveTimeout=20', emptyOnTimeout: true })
  return data === null ? null : parse(notificationSchema, data)
}

export async function deleteNotification(credentials: Credentials, receiptId: number): Promise<void> {
  await request(credentials, 'deleteNotification', { path: `/${String(receiptId)}`, init: { method: 'DELETE' } })
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Что-то пошло не так'
}
