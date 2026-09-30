# test-task-max

Простой чат для отправки и получения текстовых сообщений MAX через [GREEN-API](https://green-api.com/max).
Внешний вид повторяет web.max.ru.

React 19, TypeScript, Vite, Tailwind CSS, React Router, Redux Toolkit.

## Локальный запуск

```sh
npm install
npm run dev
```

1. Откройте приложение и введите `apiUrl`, `idInstance` и `apiTokenInstance` из
   [личного кабинета GREEN-API](https://console.green-api.com/). Инстанс должен быть авторизован.
2. Нажмите **+**, введите номер телефона получателя и нажмите **Найти в MAX**.
3. Напишите сообщение. Ответы получателя появятся в чате.

В настройках инстанса должны быть включены уведомления о входящих сообщениях, а поле `webhookUrl`
должно быть пустым — сообщения принимаются методами `ReceiveNotification` / `DeleteNotification`.

## Скрипты

- `npm run dev` — сервер разработки
- `npm run build` — проверка типов и production-сборка
- `npm run check` — проверка типов и линтер

## Структура

```
src/
├── app/       # store, роутер
├── pages/     # страницы входа и чата
├── widgets/   # макет входа, список чатов, окно чата
├── features/  # вход, новый чат, отправка и получение сообщений
├── entities/  # состояние сессии и чатов
└── shared/    # запросы к GREEN-API, утилиты, UI-компоненты
```
