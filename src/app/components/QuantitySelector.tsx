'use client'

import { Minus, Plus } from 'lucide-react'

interface QuantitySelectorProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
}

export default function QuantitySelector({ 
  value, 
  onChange, 
  min = 1, 
  max = 99,
  size = 'md'
}: QuantitySelectorProps) {
  const handleDecrease = () => {
    if (value > min) {
      onChange(value - 1)
    }
  }

  const handleIncrease = () => {
    if (value < max) {
      onChange(value + 1)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || min
    if (newValue >= min && newValue <= max) {
      onChange(newValue)
    }
  }

  const sizeClasses = {
    sm: {
      button: 'w-6 h-6',
      input: 'w-8 h-6 text-xs',
      icon: 'w-3 h-3'
    },
    md: {
      button: 'w-8 h-8',
      input: 'w-12 h-8 text-sm',
      icon: 'w-4 h-4'
    },
    lg: {
      button: 'w-10 h-10',
      input: 'w-16 h-10 text-base',
      icon: 'w-5 h-5'
    }
  }

  const classes = sizeClasses[size]

  return (
    <div className="flex items-center">
      <button
        type="button"
        onClick={handleDecrease}
        disabled={value <= min}
        className={`
          ${classes.button}
          flex items-center justify-center 
          border border-ink/20 rounded-l-lg
          bg-white hover:bg-base/50
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors duration-200
        `}
        aria-label="Diminuir quantidade"
      >
        <Minus className={classes.icon} />
      </button>
      
      <input
        type="number"
        value={value}
        onChange={handleInputChange}
        min={min}
        max={max}
        className={`
          ${classes.input}
          text-center border-t border-b border-ink/20
          bg-white focus:bg-base/20 focus:outline-none
          [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
        `}
        aria-label="Quantidade"
      />
      
      <button
        type="button"
        onClick={handleIncrease}
        disabled={value >= max}
        className={`
          ${classes.button}
          flex items-center justify-center
          border border-ink/20 rounded-r-lg
          bg-white hover:bg-base/50
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors duration-200
        `}
        aria-label="Aumentar quantidade"
      >
        <Plus className={classes.icon} />
      </button>
    </div>
  )
}