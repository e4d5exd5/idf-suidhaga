import React from 'react'
import { Menu } from 'antd'
// import { HomeOutLined } from '@ant-design/icons'
import { HomeOutlined } from '@mui/icons-material'
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import PointOfSaleOutlinedIcon from '@mui/icons-material/PointOfSaleOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import Link from 'next/link'

export const NavigationLink = ({ href, children }) => {
    return (
        // <Link
        //     className='text-red-500 p-2 px-4 w-30 rounded-3xl m-2 text-center'
        //     href={href}
        // >
        //     {name}
        // </Link>
        <Link className="nav-link" aria-current="page" href={href}>
            {children}
        </Link>
    )
  }

const MenuList = () => {
  return (
    <>
        <Menu theme='dark' mode='inline' className='flex flex-col  h-[88vh] mt-6  text-[0.9rem] '>
            {/* <Menu.Item key="Home" icon={<HomeOutLined/>}>Home</Menu.Item> */}
            <Menu.Item key="home" className='p-1' icon={<HomeOutlined/>} ><NavigationLink href={'/admin/'} >Home</NavigationLink></Menu.Item>
            <Menu.Item key="Authentication" icon={<VpnKeyOutlinedIcon/>} >Authentication</Menu.Item>
            <Menu.Item key="BulkAdd" icon={<PeopleOutlineOutlinedIcon/>} ><NavigationLink  href={'/admin/bulkAdd'} >Bulk Add</NavigationLink></Menu.Item>
            <Menu.Item key="users" icon={<PeopleOutlineOutlinedIcon/>} ><NavigationLink href={'/admin/users'} >Users</NavigationLink></Menu.Item>
            <Menu.Item key="Roles" icon={<ChecklistOutlinedIcon/>} >Roles</Menu.Item>
            <Menu.Item key="Jobs" icon={<WorkOutlineOutlinedIcon/>} >Jobs</Menu.Item>
            <Menu.Item key="Posts" icon={<PostAddOutlinedIcon/>} >Posts</Menu.Item>
            <Menu.Item key="Orders" icon={<AddShoppingCartOutlinedIcon/>} >Orders</Menu.Item>
            <Menu.Item key="Notification" icon={<NotificationsActiveOutlinedIcon/>} >Notification</Menu.Item>
            <Menu.Item key="Payments" icon={<PointOfSaleOutlinedIcon/>} >Payments</Menu.Item>
            <Menu.Item key="Settings" icon={<AdminPanelSettingsOutlinedIcon/>} >Settings</Menu.Item>
            <Menu.Item key="Bugs" icon={<BugReportOutlinedIcon/>}> <NavigationLink  href={'/admin/bugs'} >Bugs </NavigationLink></Menu.Item>
            <Menu.Item key="Profile" icon={<BugReportOutlinedIcon/>} >Profile</Menu.Item>
            

        </Menu>
    </>
    )
}

export default MenuList;
