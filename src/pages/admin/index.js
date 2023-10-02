import { useSession } from 'next-auth/react'
import {
    LoginButton,
    RegisterButton,
    LogoutButton
} from '@/components/buttons.component'
import AdminNav from '@/components/Navbars/AdminNav.component'


export default function Home() {
    const { data: session, status } = useSession()
    console.log(status, session)

    return (
        <>
            <AdminNav></AdminNav>
            {/* Home
      <br />
      <button onClick={() => registerHandler()} >Register as John Doe</button>
      <br />
      <LoginButton />
      <br />
      Create /register page to use this
      <RegisterButton /> 
      <br />
      <LogoutButton /> */}
        </>
    )
}
