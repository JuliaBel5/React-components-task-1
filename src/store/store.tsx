import { configureStore } from '@reduxjs/toolkit'
import { searchResultsReducer } from '../features/searchResultsSlice'
import { searchReducer } from '../features/searchSlice'

export const store = configureStore({
  reducer: {
    search: searchReducer,
    searchResults: searchResultsReducer,
  },
})
