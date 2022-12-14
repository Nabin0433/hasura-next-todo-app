import '../styles/background.css'
import '../styles/tailwind.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { RecoilRoot } from 'recoil'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Toaster position="top-right" />
      <Component {...pageProps} />
    </RecoilRoot>
  )
}
