import './catSearch.css'
import { useEffect, useState } from 'react'
import { CatCard } from '../routes/CatCard'
import { CatBreed, CatService } from '../services/CatService'
import { CatItem } from './CatItem'
import { MoonSpinner } from './MoonSpinner'
import { Pagination } from './Pagination'
import { SearchInput } from './SearchInput'

const catCard = new CatService()

export const CatList: React.FC<CatSearchProps> = () => {
  const [searchTerm, setSearchTerm] = useState<string>(
    localStorage.getItem('searchTerm') ?? '',
  )
  const [searchResults, setSearchResults] = useState<CatBreed[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedCat, setSelectedCat] = useState<CatBreed | null>(null)

  useEffect(() => {
    searchCat({ page: currentPage })
  }, [currentPage])

  const handleSearchButtonClick = () => {
    localStorage.setItem('searchTerm', searchTerm.trim())
    setCurrentPage(1)
    setSelectedCat(null)
    searchCat({ breed: searchTerm.trim() })
  }

  const handleKeyPress = (event: { key: string }) => {
    if (event.key === 'Enter') handleSearchButtonClick()
  }

  const handleSearchInputChange = (event: { target: { value: string } }) => {
    setSearchTerm(event.target.value)
  }

  const handleCatClick = (cat: CatBreed) => {
    setSelectedCat(cat)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    setSelectedCat(null)
  }

  const searchCat = async ({ page = 1, breed = '' } = {}) => {
    setIsLoading(true)
    const response = await catCard.getCats({ breed, page })

    setSearchResults(response.items)
    setTotalPages(response.meta.total_pages)
    setIsLoading(false)
  }

  const breeds =
    searchResults.length === 0 ? (
      <h1 className="error-message">nothing found</h1>
    ) : (
      searchResults.map((cat) => (
        <CatItem key={cat.id} cat={cat} onCatClick={handleCatClick} />
      ))
    )

  return (
    <div className="container">
      <SearchInput
        searchTerm={searchTerm}
        handleSearchInputChange={handleSearchInputChange}
        handleSearchButtonClick={handleSearchButtonClick}
        handleKeyPress={handleKeyPress}
      />
      <div className="search-results">
        <div className="results-container">
          {isLoading ? <MoonSpinner /> : breeds}
        </div>
        <div>{selectedCat && <CatCard cat={selectedCat} />}</div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

interface CatSearchProps {
  description?: string
  image?: { url: string }
  name?: string
  temperament?: string
  searchTerm?: string
}

/*interface CatSearchState {
  searchTerm: string
  searchResults: CatBreed[]
  currentPage: number
  totalPages: number
  isLoading: boolean
  selectedCat: CatBreed | null
}*/
