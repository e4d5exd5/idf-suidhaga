import printStyles from '../styles/Print.module.css'
// import Navbar from '@/components/Navbar.component'
import Link from 'next/link'

const HomeNavLink = ({ href, name }) => {
    return (
      <Link
        className='p-2 px-4 w-30 rounded-3xl m-2 text-center'
        href={href}
      >
        {name}
      </Link>
    )
}

const HomeNavbar = () => {
    return (
        <div className='flex flex-row justify-start text-black active:text-gray font-bold items-start font'>
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
            <div className='bg-white flex flex-row justify-center text-white font-bold items-start font m-1 w-1/2'>
                <HomeNavbar />
            </div>
            <div className='bg-white m-1 w-1/4'></div>
        </div>
    )
}

export default Homepage