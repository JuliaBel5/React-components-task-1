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
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(2)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [limit, setLimit] = useState<number>(6)
  return (
    <div className="App">
      <SearchDataContext.Provider value={{ searchTerm, setSearchTerm }}>
        <SearchResultsContext.Provider
          value={{
            searchResults,
            setSearchResults,
            currentPage,
            setCurrentPage,
            totalPages,
            setTotalPages,
            isLoading,
            setIsLoading,
            limit,
            setLimit,
          }}
        >
          <CatList />
        </SearchResultsContext.Provider>
      </SearchDataContext.Provider>
    </div>
  )
}
