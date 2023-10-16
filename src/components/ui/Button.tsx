import React from 'react'

export type ButtonType = 'Add' | 'Remove' | 'Edit' | 'Reset'

interface Props extends React.HTMLProps<HTMLButtonElement> {
  title: string
  className?: string
  type?: ButtonType
  isDisabled?: boolean
}

const createStyle = (type: ButtonType, isDisabled: boolean | undefined) => {
  switch (type) {
    case 'Add': {
      return `bg-green-200  ${!isDisabled && 'hover:bg-green-300'}`
    }
    case 'Remove': {
      return `bg-red-200 ${!isDisabled && 'hover:bg-red-300'}`
    }
    case 'Edit': {
      return `bg-yellow-200 ${!isDisabled && 'hover:bg-yellow-300'}`
    }
    case 'Reset': {
      return 'border-2 border-green-400 hover:bg-green-100'
    }
  }
}

const Button = ({ title, className, type, isDisabled, ...props }: Props) => {
  return (
    <button
      className={`min-h-[45px] w-fit rounded-md px-4 py-2 transition-all duration-150 ${
        isDisabled && 'opacity-50'
      } ${type && createStyle(type, isDisabled)} ${className} `}
      {...props}
    >
      <p className='text-2xl font-semibold'>{title}</p>
    </button>
  )
}

export default Button
