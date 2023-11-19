import { createSlice } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { CatBreed } from '../services/CatService'
import { store } from '../store/store'
import { getBreed, getCats } from './catSlice'

export interface SearchResultsState {
  searchResults: CatBreed[]
  currentPage: number
  totalPages: number
  isLoading: boolean
  isLoadingCats: boolean
  isLoadingCat: boolean
  limit: number
  cat: CatBreed | null
}
const initialState: SearchResultsState = {
  searchResults: [],
  currentPage: 1,
  totalPages: 2,
  isLoading: false,
  isLoadingCats: false,
  isLoadingCat: false,
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
    setIsLoadingCats: (state, action) => {
      state.isLoadingCats = action.payload
    },
    setIsLoadingCat: (state, action) => {
      state.isLoadingCat = action.payload
    },
    setLimit: (state, action) => {
      state.limit = action.payload
    },
    setCat: (state, action) => {
      state.cat = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCats.pending, (state) => {
        state.isLoading = true
        state.isLoadingCats = true
      })
      .addCase(getCats.fulfilled, (state, action) => {
        state.isLoading = false
        state.isLoadingCats = false
        state.searchResults = action.payload.items
        state.totalPages = action.payload.meta.total_pages
      })
      .addCase(getCats.rejected, (state, _action) => {
        state.isLoading = false
        state.isLoadingCats = false
      })
      .addCase(getBreed.pending, (state) => {
        state.isLoading = true
        state.isLoadingCat = true
      })
      .addCase(getBreed.fulfilled, (state, action) => {
        state.isLoading = false
        state.cat = action.payload
        state.isLoadingCat = false
      })
      .addCase(getBreed.rejected, (state, _action) => {
        state.isLoading = false
        state.isLoadingCat = false
      })
  },
})

export const { reducer: searchResultsReducer, actions: searchResultsActions } =
  searchResultsSlice

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = useDispatch<AppDispatch>
