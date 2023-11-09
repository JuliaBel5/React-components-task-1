import './App.css'
import { useState } from 'react'
import { CatList } from './components/CatList'
import { CatBreed } from './services/CatService'
import { SearchDataContext, SearchResultsContext } from './store/SearchContext'

export const App: React.FC<React.ComponentPropsWithoutRef<'div'>> = () => {
  const [searchTerm, setSearchTerm] = useState<string>(
    localStorage.getItem('searchTerm') ?? '',
  )
  const [searchResults, setSearchResults] = useState<CatBreed[]>([])

  return (
    <div className="App">
      <SearchDataContext.Provider value={{ searchTerm, setSearchTerm }}>
        <SearchResultsContext.Provider
          value={{ searchResults, setSearchResults }}
        >
          <CatList />
        </SearchResultsContext.Provider>
      </SearchDataContext.Provider>
    </div>
  )
}
