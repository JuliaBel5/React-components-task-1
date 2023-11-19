import './App.css'
import { CatList } from './components/CatList/CatList'

export const App: React.FC<React.ComponentPropsWithoutRef<'div'>> = () => {
  return (
    <div className="App">
      <CatList />
    </div>
  )
}
