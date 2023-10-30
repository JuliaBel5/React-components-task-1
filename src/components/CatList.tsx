import './catSearch.css'
import { Component } from 'react'
import { CatBreed, CatService } from '../services/CatService'
import { CatItem } from './CatItem'
import { MoonSpinner } from './MoonSpinner'
import { Pagination } from './Pagination'
import { SearchInput } from './SearchInput'

const catCard = new CatService()

export class CatList extends Component<CatSearchProps, CatSearchState> {
  state: CatSearchState = {
    searchTerm: localStorage.getItem('searchTerm') ?? '',
    searchResults: [],
    currentPage: 1,
    totalPages: 1,
    isLoading: false,
  }

  componentDidMount() {
    const { searchTerm } = this.state

    this.searchCat({
      breed: searchTerm,
    })
  }

  componentDidUpdate(_prevProps: CatSearchProps, prevState: CatSearchState) {
    const { searchTerm, currentPage } = this.state
    if (prevState.currentPage !== currentPage) {
      this.searchCat({
        page: currentPage,
        breed: searchTerm,
      })
    }
  }

  handleSearchButtonClick = () => {
    const { searchTerm } = this.state
    localStorage.setItem('searchTerm', searchTerm.trim())
    this.setState({ currentPage: 1 })
    this.searchCat({
      breed: searchTerm.trim(),
    })
  }

  handleKeyPress = (event: { key: string }) => {
    if (event.key === 'Enter') this.handleSearchButtonClick()
  }

  handleSearchInputChange = (event: { target: { value: string } }) => {
    this.setState({ searchTerm: event.target.value })
  }

  handlePageChange = (page: number) => {
    this.setState((prevState) => ({ ...prevState, currentPage: page }))
  }

  async searchCat({ page = 1, breed = '' } = {}) {
    this.setState({ isLoading: true })
    const response = await catCard.getCats({ breed, page })

    this.setState({
      searchResults: response.items,
      totalPages: response.meta.total_pages,
      isLoading: false,
    })
  }

  render() {
    const { searchTerm, searchResults, currentPage, totalPages, isLoading } =
      this.state

    const breeds =
      searchResults.length === 0 ? (
        <h1 className="error-message">nothing found</h1>
      ) : (
        searchResults.map((cat) => <CatItem key={cat.id} cat={cat} />)
      )

    return (
      <div className="container">
        <SearchInput
          searchTerm={searchTerm}
          handleSearchInputChange={this.handleSearchInputChange}
          handleSearchButtonClick={this.handleSearchButtonClick}
          handleKeyPress={this.handleKeyPress}
        />
        <div className="results-container">
          {isLoading ? <MoonSpinner /> : breeds}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={this.handlePageChange}
        />
      </div>
    )
  }
}

interface CatSearchProps {
  description?: string
  image?: { url: string }
  name?: string
  temperament?: string
  searchTerm?: string
}

interface CatSearchState {
  searchTerm: string
  searchResults: CatBreed[]
  currentPage: number
  totalPages: number
  isLoading: boolean
}
