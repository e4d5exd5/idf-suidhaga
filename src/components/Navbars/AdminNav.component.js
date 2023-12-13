import Navbar, {NavLink} from '@/components/Navbars/Navbar.component'
import React, { useState } from 'react'
import {Layout , Button} from "antd"
import MenuList from '../Sidebar/menu.component';
import Logo from '../Sidebar/logo.component';
import {MenuUnfoldOutlined , MenufoldOutlined } from "@ant-design/icons"
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'


const {Header , Sider} = Layout;

export const NavigationLink = ({ href, children }) => {
  return (
      // <Link
      //     className='text-red-500 p-2 px-4 w-30 rounded-3xl m-2 text-center'
      //     href={href}
      // >
      //     {name}
      // </Link>
      <Link className="nav-link " aria-current="page" href={href}>
          {children}
      </Link>
  )
}

const AdminNav = ({children}) => {

  let { data: session } = useSession()
  const [ collapsed , setCollapsed ] = useState(false);

  return (
      // <Navbar>
      //     <NavLink href={'/admin/users/employees/bulkAdd'}>Bulk Add</NavLink>
      // </Navbar>
      <>
      <Layout>
        <Sider collapsed={collapsed} trigger={null} className="text-[#fff]">
          <Logo/>
          <MenuList/>
        </Sider>
        <Layout>
          <Header className='bg-white p-0 flex items-center justify-between'>
            <Button type='text' className='text-black' onClick={()=>setCollapsed(!collapsed)} icon={<MenuUnfoldOutlined/>}/>
            <div className='flex flex-row gap-5 mr-[5%] text-base font-semibold'>
              <div className='cursor-pointer'><NavigationLink href={'/auth/register'} >Register</NavigationLink></div>
              <div className='cursor-pointer'><NavigationLink href={'/auth/login'} >Login</NavigationLink></div>
              <div className='cursor-pointer' onClick={()=>signOut()}>Logout</div>
            </div>  
          </Header>  
          <div className='bg-white m-[1%]'>{children}</div>
        </Layout>                  
      </Layout>
      </>
  )
}

export default AdminNav