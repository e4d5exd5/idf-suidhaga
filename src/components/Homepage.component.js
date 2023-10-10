import printStyles from '../styles/Print.module.css'
// import Navbar from '@/components/Navbar.component'
import Link from 'next/link'
import Profile from './Profile.component'
import Posts from './Posts.component'
const HomeNavLink = ({ href, name }) => {
    return (
      <Link 
        className='p-2 px-6 w-30  text-center hover:bg-blue-100 focus:bg-gradient-to-t from-white to-blue-200'
        href={href}
      >
        {name}
      </Link>
    )
}

const HomeNavbar = () => {
    return (
        <div className='flex flex-row justify-center bg-blue-200 text-black active:text-gray font-bold items-start w-full'>
            <HomeNavLink href={'/'} name={'Jobs'} />
            <HomeNavLink href={'/'} name={'Posts'} />
            <HomeNavLink href={'/'} name={'Profile'} />
      </div>
    )
}

const Homepage = () => {
    return (
        <div className='flex h-screen bg-gray-200'>
            <div className='bg-white m-1 w-1/4 h-full'></div>
            <div className='bg-white flex-col justify-start text-white font-bold items-start mx-1 mb-1 w-1/2'>
                <HomeNavbar />
             
                <Posts />
                
   
            </div>
            <div className='bg-white m-1 w-1/4'></div>
        </div>
    )
}

export default Homepage