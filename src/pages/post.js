import React from 'react'
import Layout from '@/layouts/main.layout'
import HomeNavbar from '@/components/Navbars/HomeNav.component'
import Posts from '@/components/Posts.component'
const PostPage = () => {
    return (
        <Layout>
            <HomeNavbar selected='post' />
            <Posts/>
        </Layout>
    )
}

export default PostPage