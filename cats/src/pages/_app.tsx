import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../store/store'
import { ErrorBoundary } from '../components/ErrorBoundary'
import { ErrorPage } from './ErrorPage'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ErrorBoundary fallback={<ErrorPage />}>
    
      <Component {...pageProps} />
 
      </ErrorBoundary>
    </Provider>
  )
}