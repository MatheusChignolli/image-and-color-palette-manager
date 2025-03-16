import { PropsWithChildren } from 'react'

function FieldsetError({ children }: PropsWithChildren) {
  return (
    <em role="alert" className="text-red-400">
      {children}
    </em>
  )
}

export default FieldsetError
