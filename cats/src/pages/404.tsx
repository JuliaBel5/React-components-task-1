/* eslint-disable react-hooks/exhaustive-deps */
import Link from 'next/link'
import {useEffect} from  'react'
import {useRouter} from 'next/router'

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/')
    }, 5000)
    }, [])

   return (
    <>
  <h1 className="error-message">nothing found</h1>
  <p>You will be redirected to the <Link href='/'><a>main page</a> in 5 seconds</Link></p>
  </>
  )
}
export default NotFound