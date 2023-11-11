import React from 'react'
import Layout from '@/layouts/main.layout'
import HomeNavbar from '@/components/Navbars/HomeNav.component'
import ProfileComp from '@/components/Profile.component'
const Profile = () => {
    return (
        <Layout>
            <HomeNavbar selected='profile' />
            <ProfileComp/>
        </Layout>
    )
}

export default Profile