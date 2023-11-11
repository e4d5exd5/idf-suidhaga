import React from 'react'
import Navbar from '@/components/Navbars/Navbar.component'

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <div className='flex  items-center justify-center'>
                <div className=''>
                    {children}
                </div>
            </div>
        </>

    )
}

export default Layout