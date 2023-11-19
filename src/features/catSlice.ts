import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CatBreed, Results } from '../services/CatService'

const baseUrl = `https://2ff5030c446d8ca4.mokky.dev/breeds`
interface GetCatsArg {
  page?: number
  limit?: number
  breed?: string
}

export const getCats = createAsyncThunk<Results, GetCatsArg>(
  'cats/getCats',
  async ({ page = 1, limit = 6, breed = '' } = {}) => {
    const response = await fetch(
      `${baseUrl}?name=*${breed}&page=${page}&limit=${limit}`,
    )
    const data = await response.json()
    return data
  },
)

export const getBreed = createAsyncThunk<CatBreed, string>(
  'cats/getBreed',
  async (catId) => {
    const response = await fetch(`${baseUrl}/${catId}`)
    const data = await response.json()
    return data
  },
)

const catsSlice = createSlice({
  name: 'cats',
  initialState: {
    cats: [] as CatBreed[],
    breed: {},
    status: 'idle',
    error: null as string | null | undefined,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCats.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getCats.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.cats = action.payload.items
      })
      .addCase(getCats.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(getBreed.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getBreed.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.breed = action.payload
      })
      .addCase(getBreed.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { reducer: catsReducer, actions: catsActions } = catsSlice
