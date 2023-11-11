import Link from 'next/link'
const HomeNavLink = ({ href, name, selected }) => {
    return (
        <Link
            className={'p-2 px-6 w-30  text-center hover:bg-blue-100 focus:bg-gradient-to-t from-white to-blue-200 ' + (selected ? 'bg-blue-300' : '') + ' '}
            href={href}
            passHref
        >
            {name}
        </Link>
    )
}

const HomeNavbar = ({selected}) => {
    return (
        <div className='flex flex-row justify-center bg-blue-200 text-black active:text-gray font-bold items-start w-full'>
            <HomeNavLink href={'/job'} name={'Jobs'} selected={ selected == 'job' } />
            <HomeNavLink href={'/post'} name={'Posts'} selected={selected == 'post'} />
            <HomeNavLink href={'/profile'} name={'Profile'} selected={selected == 'profile'} />
        </div>
    )
}
export default HomeNavbar