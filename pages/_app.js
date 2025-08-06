import '../src/globals.css'
import Footer from '../src/components/Footer'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Footer />
    </>
  )
}