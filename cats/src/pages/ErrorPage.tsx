//import { useRouteError } from 'react-router-dom'

import error from "next/error"

export function ErrorPage() {
  //const error: unknown = useRouteError()
  console.error(error)

  return (
    <div className="error">Something went wrong. Please, reload the page</div>
  )
}
export default ErrorPage