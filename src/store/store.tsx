import { configureStore, Store } from '@reduxjs/toolkit'
import { searchResultsReducer } from '../features/searchResultsSlice'
import { searchReducer } from '../features/searchSlice'
import { catApi } from '../services/catApi'

export const store: Store = configureStore({
  reducer: {
    search: searchReducer,
    searchResults: searchResultsReducer,
    [catApi.reducerPath]: catApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(catApi.middleware),
})
