'use client'

import { PropsWithChildren } from 'react'

function OpenModalButton({ children, id }: PropsWithChildren<{ id: string }>) {
  return (
    <button
      onClick={() => (document.getElementById(id) as HTMLDialogElement)?.showModal()}
    >
      {children}
    </button>
  )
}

export default OpenModalButton
