import type { AppProps } from 'next/app'

import { ToasterComponent } from '../components/Partials/ToasterComponent'
import { GlobalContextProvider } from '../context/GlobalContextProvider'
import '../styles/index.scss'
import Head from 'next/head'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalContextProvider>
      <Head>
        <title>Sensores</title>
      </Head>
      <Component {...pageProps} />
      <ToasterComponent />
    </GlobalContextProvider>
  )
}
