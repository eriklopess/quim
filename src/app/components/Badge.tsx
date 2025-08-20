
import clsx from 'clsx'

type BadgeType = "Novo" | "Chef" | "Vegano" | "Sem glúten" | "Sem lactose" | "Picante" | "Vegetariano"

interface BadgeProps {
  children: React.ReactNode
  variant: BadgeType
  size?: 'sm' | 'md'
}

const badgeVariants = {
  'Novo': 'bg-blue-100 text-blue-800',
  'Chef': 'bg-purple-100 text-purple-800',
  'Vegano': 'bg-green-100 text-green-800',
  'Sem glúten': 'bg-orange-100 text-orange-800',
  'Sem lactose': 'bg-yellow-100 text-yellow-800',
  'Picante': 'bg-red-100 text-red-800',
  'Vegetariano': 'bg-lime-100 text-lime-800',
}

export default function Badge({ children, variant, size = 'sm' }: BadgeProps) {
  return (
    <span
      className={clsx(
        'badge',
        badgeVariants[variant],
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
      )}
    >
      {children}
    </span>
  )
}