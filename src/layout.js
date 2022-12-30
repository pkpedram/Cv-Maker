import React from 'react'

const Layout = ({children, className}) => {
  return (
    <div className={`w-full min-h-screen bg-blue72 ${className}`}>
        {children}
    </div>
  )
}

export default Layout