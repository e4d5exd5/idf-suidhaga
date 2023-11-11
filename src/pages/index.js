import { useSession } from 'next-auth/react'
import Layout from '@/layouts/main.layout'



export default function Home() {
    const { data: session, status } = useSession()
    console.log(status, session)

    const registerHandler = async () => {
        console.log(
            'This will not register the John Doe. If you want to register John Doe, you need to uncomment the code in index.js of pages folder'
        )

        // let result = await fetch("http://localhost:3000/api/user"
        //   , {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ firstName: 'John', lastName: 'Doe', email: 'johndoe@gmail.com', password: 'johndoe' }),
        //   })
        // console.log(await result.json());
    }

}

export async function getServerSideProps(context) {
    return {
       redirect: {
            destination: '/job',
            permanent: false,
        },
    }
}
