import { CatList } from '../pages/index'
import { CatCard }from '../pages/[id]'
import React from 'react';

export const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className = 'content'>
    <CatList/>
    {children}
    <CatCard/>
    </div>
  )
}
export default Layout