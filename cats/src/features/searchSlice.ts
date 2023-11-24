import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper';
import { catApi } from '../services/catApi'

export interface SearchTermState {
  searchTerm: string
}

const initialState: SearchTermState = {
  searchTerm: '',
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.subjectPage,
      };
    },
  },
})

export const { reducer: searchReducer, actions: searchActions } = searchSlice