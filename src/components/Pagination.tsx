import './catSearch.css'

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  return (
    <div className="pagination-container">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        &laquo;&laquo;
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        &laquo;
      </button>
      <button
        onClick={() => onPageChange(currentPage)}
        className="pagination-button"
      >
        {currentPage}
      </button>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || currentPage > totalPages}
        className="pagination-button"
      >
        &raquo;
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
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
  onPageChange: (pageNumber: number) => void
}
