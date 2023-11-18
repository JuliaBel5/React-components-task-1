import './App.css'
//import { useState } from 'react'
//import { useSearchParams } from 'react-router-dom'
import { CatList } from './components/CatList/CatList'
//import { CatBreed } from './services/CatService'

export const App: React.FC<React.ComponentPropsWithoutRef<'div'>> = () => {
  // const [searchParams] = useSearchParams()

  /* const [searchTerm, setSearchTerm] = useState<string>(
    localStorage.getItem('searchTerm') ??
      searchParams.get('urlSearchTerm') ??
      '',
  )*/
  /* const [searchResults, setSearchResults] = useState<CatBreed[]>([])
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get('page')) || 1,
  )
  const [totalPages, setTotalPages] = useState<number>(2)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [limit, setLimit] = useState<number>(
    Number(searchParams.get('limit')) || 6,
  )*/
  //const [cat, setCat] = useState<CatBreed | null>(null)
  return (
    <div className="App">
      <CatList />
    </div>
  )
}
/*<SearchResultsContext.Provider
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
          cat,
          setCat,
        }}
      >
   </SearchResultsContext.Provider>
      */
