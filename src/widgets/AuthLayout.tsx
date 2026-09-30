import type { ReactNode } from 'react'
import { HelpIcon } from '../shared/ui/icons.tsx'
import { Logo } from '../shared/ui/Logo.tsx'
import { PatternBackground } from '../shared/ui/PatternBackground.tsx'

type AuthLayoutProps = {
  children: ReactNode
  footer: ReactNode
}

export function AuthLayout({ children, footer }: AuthLayoutProps) {
  return (
    <div className="relative isolate flex min-h-dvh">
      <PatternBackground className="hidden card:block" />
      <section className="relative isolate flex min-h-dvh w-full flex-col overflow-hidden bg-page card:m-auto card:h-174 card:min-h-0 card:w-145 card:rounded-card card:border card:border-border-subtle card:bg-surface card:shadow-card">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 hidden h-80 card:block">
          <div className="absolute -top-24 left-1/6 size-80 rounded-full bg-glow-cyan blur-3xl" />
          <div className="absolute -top-28 right-1/8 size-80 rounded-full bg-glow-indigo blur-3xl" />
        </div>

        <header className="flex items-center justify-between px-3 py-3 card:p-4">
          <span className="size-10" />
          <Logo className="card:hidden" />
          <a
            href="https://green-api.com/v3/docs/before-start/"
            target="_blank"
            rel="noreferrer"
            aria-label="Где найти данные инстанса"
            className="flex size-10 items-center justify-center rounded-full hover:bg-fill-hover"
          >
            <HelpIcon />
          </a>
        </header>

        <main className="mx-auto flex w-full flex-1 flex-col items-center px-4 card:max-w-90 card:px-3">{children}</main>
        <footer className="mx-auto w-full px-4 pt-6 pb-11 text-center card:max-w-90 card:pb-8">{footer}</footer>
      </section>
    </div>
  )
}
