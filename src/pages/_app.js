import { SessionProvider } from 'next-auth/react'
import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
require('@/models/associations');


export default function App({
  Component,
  pageProps: { session, ...pageProps }
}) {
  return (
    <ChakraProvider >
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
    </ChakraProvider>
  )
}



