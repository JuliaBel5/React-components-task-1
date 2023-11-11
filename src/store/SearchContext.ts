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
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  totalPages: number
  setTotalPages: Dispatch<SetStateAction<number>>
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
  limit: number
  setLimit: Dispatch<SetStateAction<number>>
}

export const SearchResultsContext = createContext<SearchResultsContextProps>({
  searchResults: [],
  setSearchResults: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
  totalPages: 2,
  setTotalPages: () => {},
  isLoading: false,
  setIsLoading: () => {},
  limit: 6,
  setLimit: () => {},
})
