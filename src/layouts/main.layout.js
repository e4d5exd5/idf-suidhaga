import React from 'react'
import Navbar from '@/components/Navbars/Navbar.component'
import Bugs from '@/components/connectComponents/bugs/Bugs.component'


const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <div className='flex flex-row justify-between bg-red-300 p-4 gap-4' style={{background:'#F8F6F4'}}>
                <div className='bg-red-600  h-full p-4 shadow-xl' style={{width:'20%', background:'white' , height:'100vh' , position:'sticky',top: '0'}}>Connect Components 
                    <div className='bottom-0'><Bugs/></div>
                </div>
                <div className='w-[30%] h-full bg-gray-500 shadow-lg ' style={{width:'80%' , /*marginLeft:'21%'*/}}>{children}</div>
                <div className='text-red-700 font-bold right-0  p-4 shadow-xl' style={{width:'20%' , background:'white' , height:'100vh' , position:'sticky',top: '0' , }}>Latest News</div>
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