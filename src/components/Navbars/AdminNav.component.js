import Navbar, { NavLink } from '@/components/Navbars/Navbar.component'
import React, { useState } from 'react'
import { Layout, Button } from "antd"
import MenuList from '../Sidebar/menu.component';
import Logo from '../Sidebar/logo.component';
import { MenuUnfoldOutlined, MenufoldOutlined } from "@ant-design/icons"
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'
import logo from '@/../public/images/idf-logo.png'

const { Header, Sider } = Layout;

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

const AdminNav = ({ children }) => {

    let { data: session } = useSession()
    const [collapsed, setCollapsed] = useState(false);

    return (
        // <Navbar>
        //     <NavLink href={'/admin/users/employees/bulkAdd'}>Bulk Add</NavLink>
        // </Navbar>
        <>
            <Layout>
                <Sider collapsed={collapsed} trigger={null} className="text-[#fff]">
                    <Logo />
                    <MenuList />
                </Sider>
                <Layout>
                    <Header className='bg-white p-0 flex items-center justify-between'>
                        <Button type='text' className='text-black' onClick={() => setCollapsed(!collapsed)} icon={<MenuUnfoldOutlined />} />
                        <div className='flex flex-row justify-center'>
                            <Link
                                className='flex flex-col m-2'
                                href='https://www.idf.org.in'
                                passHref
                            >
                                <Image className='w-16 h-20 ' src={logo} alt='idf-logo.png' />
                            </Link>
                            <div className='flex flex-col justify-normal '>
                                <p className='flex flex-row m-0 text-bold  text-m'>
                                    Indian Development Foundation
                                </p>
                                <p className='flex flex-row m-0 text-sm'>
                                    A National NGO committed to Health, Education, and Development
                                </p>
                                <p className='flex flex-row text-sm'>
                                    IDF - Organization in Special Consultative Status with the Economic
                                    and Social Council since 2012.
                                </p>
                            </div>
                        </div>
                        <div className='flex flex-row gap-5 mr-[5%] text-base font-semibold'>
                            <div className='cursor-pointer' onClick={() => signOut()}>Logout</div>
                        </div>
                    </Header>
                    <div className='bg-white m-[1%]'>{children}</div>
                </Layout>
            </Layout>
        </>
    )
}

export default AdminNav