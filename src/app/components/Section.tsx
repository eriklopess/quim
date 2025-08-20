import clsx from 'clsx'
import { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
}

export default function Section({ children, className, id }: SectionProps) {
  return (
    <section 
      id={id}
      className={clsx('section', className)}
    >
      {children}
    </section>
  )
}