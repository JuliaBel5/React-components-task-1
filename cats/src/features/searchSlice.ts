import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper';
import { catApi } from '../services/catApi'
import { store } from '@/store/store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

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
	extraReducers(builder) {
		builder.addCase<typeof HYDRATE, PayloadAction<RootState, typeof HYDRATE>>(
			HYDRATE,
			(state, action) => ({...state, ...action.payload.search})
		);
	}
})

export const { reducer: searchReducer, actions: searchActions } = searchSlice

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = useDispatch<AppDispatch>