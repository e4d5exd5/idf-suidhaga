import { signIn, signOut } from 'next-auth/react'
import Link from 'next/link'

export const LoginButton = () => {
  return (
    <button className='' onClick={() => signIn()}>
      Sign in
    </button>
  )
}

export const RegisterButton = () => {
  return (
    <Link href='/register' className=''>
      Register
    </Link>
  )
}

export const LogoutButton = () => {
  return (
    <button className='' onClick={() => signOut()}>
      Sign Out
    </button>
  )
}
