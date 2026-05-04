import React from 'react'
import AppNavbar from './appNavbar/page'

const CustomeAppLayout = ({children}:{children: React.ReactNode}) => {
  return (
    <>

    <AppNavbar/>
    
    <main className='mt-[117.5px] h-[calc(100vh-120px)] overflow-hidden'>
        {children}
    </main>
    </>
  )
}

export default CustomeAppLayout