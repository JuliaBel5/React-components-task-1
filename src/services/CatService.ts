export class CatService {
  private baseUrl = `https://2ff5030c446d8ca4.mokky.dev/breeds`

  async getCats({ page = 1, limit = 8, breed = '' } = {}): Promise<Results> {
    try {
      const response = await fetch(
        `${this.baseUrl}?name=*${breed}&page=${page}&limit=${limit}`,
      )
      const data = (await response.json()) as Results
      return data
    } catch (error) {
      console.error('Error:', error)
      return Promise.reject(error)
    }
  }
}

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
  weight: Weight
  id: string
  name: string
  cfa_url?: string
  vetstreet_url?: string
  vcahospitals_url?: string
  temperament: string
  origin: string
  country_codes: string
  country_code: string
  description: string
  life_span: string
  indoor: number
  lap?: number
  alt_names?: string
  adaptability: number
  affection_level: number
  child_friendly: number
  dog_friendly: number
  energy_level: number
  grooming: number
  health_issues: number
  intelligence: number
  shedding_level: number
  social_needs: number
  stranger_friendly: number
  vocalisation: number
  experimental: number
  hairless: number
  natural: number
  rare: number
  rex: number
  suppressed_tail: number
  short_legs: number
  wikipedia_url?: string
  hypoallergenic: number
  reference_image_id: string
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
