import { createSlice } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { CatBreed } from '../services/CatService'
import { store } from '../store/store'

export interface SearchResultsState {
  searchResults: CatBreed[]
  currentPage: number
  totalPages: number
  isLoading: boolean
  limit: number
  cat: CatBreed | null
}
const initialState: SearchResultsState = {
  searchResults: [],
  currentPage: 1,
  totalPages: 2,
  isLoading: false,
  limit: 6,
  cat: null,
}

export const searchResultsSlice = createSlice({
  name: 'searchResults',
  initialState,
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setLimit: (state, action) => {
      state.limit = action.payload
    },
    setCat: (state, action) => {
      state.cat = action.payload
    },
  },
})

export const { reducer: searchResultsReducer, actions: searchResultsActions } =
  searchResultsSlice

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = useDispatch<AppDispatch>
