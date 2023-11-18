import { createSlice } from '@reduxjs/toolkit'

const searchTermFromLocalStorage = localStorage.getItem('searchTerm')

export interface SearchTermState {
  searchTerm: string
}
const initialState: SearchTermState = {
  searchTerm: searchTermFromLocalStorage || '',
}
export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
      localStorage.setItem('searchTerm', action.payload)
    },
  },
})

export const { reducer: searchReducer, actions: searchActions } = searchSlice
