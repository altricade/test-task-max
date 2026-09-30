import { useEffect, useRef, type ReactNode } from 'react'

type DialogProps = {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
}

export function Dialog({ open, title, onClose, children }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (open) {
      ref.current?.showModal()
    } else {
      ref.current?.close()
    }
  }, [open])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      className="m-auto w-[calc(100%-2rem)] max-w-105 rounded-card bg-surface p-6 text-fg backdrop:bg-overlay"
    >
      <h2 className="mb-6 text-2xl font-semibold">{title}</h2>
      {open ? children : null}
    </dialog>
  )
}
