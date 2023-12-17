import React from 'react'
import Layout from '@/layouts/main.layout'
import HomeNavbar from '@/components/Navbars/HomeNav.component'
import SideNav from '@/components/Navbars/SideNav.component'
const Job = () => {
  return (
    <Layout>
          <HomeNavbar selected='job'/>
    </Layout>
  // <>
  //     {/* <SideNav/> */}
  // </>
  )
}

export default Job