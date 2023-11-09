import { createContext, Dispatch, SetStateAction } from 'react'
import { CatBreed } from '../services/CatService'

interface SearchDataContextProps {
  searchTerm: string
  setSearchTerm: Dispatch<SetStateAction<string>>
}

export const SearchDataContext = createContext<SearchDataContextProps>({
  searchTerm: '',
  setSearchTerm: () => {},
})

interface SearchResultsContextProps {
  searchResults: CatBreed[]
  setSearchResults: Dispatch<SetStateAction<CatBreed[]>>
}

export const SearchResultsContext = createContext<SearchResultsContextProps>({
  searchResults: [],
  setSearchResults: () => {},
})
