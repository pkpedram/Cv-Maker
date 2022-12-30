import React from 'react'
import { Link } from 'react-router-dom'


const Button = ({
    to,
    onClick,
    layout,
    className,
    children,
    type
}) => {

    let types = {
        default: 'text-white px-6 py-2 bg-blue95 border-2 border-blue95 rounded-md shadow-lg hover:shadow-none hover:bg-blue72 hover:border-blue72',
        border: 'text-white/50 px-6 py-2 bg-transparent rounded-md border-2 border-blue95 hover:bg-blue95 hover:text-white hover:shadow-md'
    }

  return (
        to?.length !== 0 ? 
          <Link to={to} className={`${types[layout]}  ${className}`}>
        {children}
    </Link> :
      <button onClick={onClick} type={type} className={`${types[layout]}  ${className}`}>
      {children}
  </button>
  )
}

export default Button

Button.defaultProps = {
    layout:"default",
    to: '',
    type: 'button'
}