import { createSlice } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { catApi } from '../services/catApi'
import { CatBreed } from '../services/catApi'
import {createWrapper, HYDRATE} from 'next-redux-wrapper';
import { store, wrapper } from "@/store/store";


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
  /*extraReducers: (builder) => {
    builder
      .addMatcher(catApi.endpoints.getCats.matchPending, (state) => {
        state.isLoadingCats = true
      })
      .addMatcher(catApi.endpoints.getCats.matchFulfilled, (state) => {
        state.isLoadingCats = false
      })
      .addMatcher(catApi.endpoints.getCats.matchRejected, (state) => {
        state.isLoadingCats = false
      })
      .addMatcher(catApi.endpoints.getBreed.matchPending, (state) => {
        state.isLoadingCat = true
      })
      .addMatcher(catApi.endpoints.getBreed.matchFulfilled, (state) => {
        state.isLoadingCat = false
      })
      .addMatcher(catApi.endpoints.getBreed.matchRejected, (state) => {
        state.isLoadingCat = false
      })
},*/
extraReducers: {
  [HYDRATE]: (state, action) => {
      console.log('HYDRATE system', action.payload);

      return {
          ...state,
          ...action.payload.system,
      };
  },
},
})
export const { reducer: searchResultsReducer, actions: searchResultsActions } =
  searchResultsSlice

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = useDispatch<AppDispatch>