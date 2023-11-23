import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = `https://2ff5030c446d8ca4.mokky.dev/breeds`

export const catApi = createApi({
  reducerPath: 'catApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCats: builder.query<Results, GetCatsArg>({
      query: ({ page = 1, limit = 6, breed = '' }) =>
        `?name=*${breed}&page=${page}&limit=${limit}`,
    }),
    getBreed: builder.query<CatBreed, string>({
      query: (catId) => `${catId}`,
    }),
  }),
})



export const { useGetCatsQuery, useGetBreedQuery, useLazyGetCatsQuery } = catApi



export interface Weight {
  imperial: string
  metric: string
}
export interface Image {
  id: string
  width: number
  height: number
  url: string
}

export interface CatBreed {
  image?: Image
  weight?: Weight
  id?: string
  name: string
  cfa_url?: string
  vetstreet_url?: string
  vcahospitals_url?: string
  temperament?: string
  origin?: string
  country_codes?: string
  country_code?: string
  description?: string
  life_span?: string
  indoor?: number
  lap?: number
  alt_names?: string
  adaptability?: number
  affection_level?: number
  child_friendly?: number
  dog_friendly?: number
  energy_level?: number
  grooming?: number
  health_issues?: number
  intelligence?: number
  shedding_level?: number
  social_needs?: number
  stranger_friendly?: number
  vocalisation?: number
  experimental?: number
  hairless?: number
  natural?: number
  rare?: number
  rex?: number
  suppressed_tail?: number
  short_legs?: number
  wikipedia_url?: string
  hypoallergenic?: number
  reference_image_id?: string
}

interface Meta {
  total_items: number
  total_pages: number
  current_page: number
  per_page: number
  remaining_count: number
}

export interface Results {
  meta: Meta
  items: CatBreed[]
}

interface GetCatsArg {
  page?: number
  limit?: number
  breed?: string
}