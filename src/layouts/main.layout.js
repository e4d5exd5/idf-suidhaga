import React from 'react'
import Navbar from '@/components/Navbars/Navbar.component'

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <div className='flex flex-row justify-between bg-red-300 p-4 gap-4' style={{background:'#F8F6F4'}}>
                <div className='bg-red-600 w-[30%] h-screen fixed p-4 shadow-xl' style={{width:'20%', background:'white' , height:'100vh' , position:'fixed'}}>Connect Components</div>
                <div className='w-[30%] h-screen bg-gray-500 shadow-lg ' style={{width:'59%' , marginLeft:'21%'}}>{children}</div>
                <div className='text-red-700 font-bold right-0 pl-[60%] p-4 shadow-xl' style={{width:'20%' , background:'white' , height:'100vh' , position:'fixed' , marginLeft:'78.5%'}}>Latest News</div>
            </div>
            
            {/* <div className='flex  items-center justify-center'>
                <div className=''>
                    {children}
                </div>
            </div> */}
        </>

    )
}

export default Layout