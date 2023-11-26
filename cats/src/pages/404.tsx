/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

export const NotFound = () => {
  const router = useRouter();

  return (
    <>
      <h1 className="error-message">nothing found</h1>
      <p>
        Please, go to the  {" "}
        <Link href="/">
          main page
        </Link>
      </p>
    </>
  );
};
// export default NotFound;
export default dynamic(() => Promise.resolve(NotFound), { ssr: false });