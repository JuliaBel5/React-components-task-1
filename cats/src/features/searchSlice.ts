import { createSlice } from '@reduxjs/toolkit'
import {createWrapper, HYDRATE} from 'next-redux-wrapper';


//const searchTermFromLocalStorage = localStorage.getItem('searchTerm')

export interface SearchTermState {
  searchTerm: string
}
const initialState: SearchTermState = {
  searchTerm: /*searchTermFromLocalStorage ||*/ '',
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
  extraReducers: {
    [HYDRATE]: (state, action) => {
        console.log('HYDRATE', action.payload);

        return {
            ...state,
            ...action.payload.subjectPage,
        };
    },
},
})

export const { reducer: searchReducer, actions: searchActions } = searchSlice