
//import { useSearchParams } from 'react-router-dom'
import {
  searchResultsActions,
  useAppDispatch,
  useAppSelector,
} from '../../features/searchResultsSlice'

export const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const { searchTerm } = useAppSelector((state) => state.search)
  const { limit } = useAppSelector((state) => state.searchResults)

  //const [_searchParams, setSearchParams] = useSearchParams()
  const dispatch = useAppDispatch()

  const handlePageChange = (page: number) => {
    dispatch(searchResultsActions.setCurrentPage(page))
    /*  setSearchParams({
        urlSearchTerm: searchTerm.trim(),
        page: page.toString(),
        limit: limit.toString(),
      })*/
  }

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
        data-testid="inc"
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