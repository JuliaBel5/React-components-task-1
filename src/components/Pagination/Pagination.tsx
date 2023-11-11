import '../catSearch.css'
import { useContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  SearchDataContext,
  SearchResultsContext,
} from '../../store/SearchContext'

export const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const { searchTerm } = useContext(SearchDataContext)
  const { setCurrentPage, limit } = useContext(SearchResultsContext)
  const [searchParams, setSearchParams] = useSearchParams()

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    setSearchParams({
      urlSearchTerm: searchTerm.trim(),
      page: page.toString(),
      limit: limit.toString(),
    })
  }
  console.log(searchParams.toString())
  return (
    <div className="pagination-container">
      <button
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        &laquo;&laquo;
      </button>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        &laquo;
      </button>
      <button
        onClick={() => handlePageChange(currentPage)}
        className="pagination-button"
      >
        {currentPage}
      </button>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || currentPage > totalPages}
        className="pagination-button"
      >
        &raquo;
      </button>
      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages || currentPage > totalPages}
        className="pagination-button"
      >
        &raquo;&raquo;
      </button>
    </div>
  )
}

interface PaginationProps {
  currentPage: number
  totalPages: number
}
