import './App.css'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { CatList } from './components/CatList'

export const App: React.FC<React.ComponentPropsWithoutRef<'div'>> = () => {
  const [error, setError] = useState(false)

  if (error) {
    throw new Error('БУММММММММММММММ')
  }

  return (
    <div className="App">
      <button onClick={() => setError(true)} className="gradient-button ">
        I don't like cats!
      </button>{' '}
      <CatList />
      <Outlet />
    </div>
  )
}
