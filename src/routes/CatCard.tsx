import { useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { imagePlaceholder } from '../components/CatItem/CatItem'
import { MoonSpinner } from '../components/MoonSpinner'
import {
  searchResultsActions,
  useAppDispatch,
  useAppSelector,
} from '../features/searchResultsSlice'
//import { SearchResultsContext } from '../store/SearchContext'

export const CatCard: React.FC<object> = () => {
  const { cat, isLoading } = useAppSelector((state) => state.searchResults)

  const dispatch = useAppDispatch()

  const { catId } = useParams<{ catId: string }>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const baseUrl = `https://2ff5030c446d8ca4.mokky.dev/breeds`
    const fetchCatDetails = async () => {
      dispatch(searchResultsActions.setIsLoading(true))
      try {
        const response = await fetch(`${baseUrl}/${catId}`)
        const data = await response.json()
        dispatch(searchResultsActions.setCat(data))
        dispatch(searchResultsActions.setIsLoading(false))
      } catch (error) {
        console.error('Error fetching cat details:', error)
      }
    }

    fetchCatDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catId])

  const handleCloseButtonClick = () => {
    navigate(`/?${searchParams}`)
  }
  const handleContainerClick = () => {
    navigate(`/?${searchParams}`)
  }

  if (!cat || isLoading) {
    return <MoonSpinner />
  }

  const { image, description, temperament, name } = cat

  return (
    <>
      <div
        className="shadow"
        onClick={handleContainerClick}
        role="textbox"
        tabIndex={0}
      />

      <div className="modal-container" data-testid="cat-card">
        <div className="cat-card">
          <button
            data-testid={`close-${name}`}
            className="close-button, gradient-button"
            onClick={handleCloseButtonClick}
          >
            Close
          </button>
          <h1 className="title"> {name}</h1>
          <img src={image ? image.url : imagePlaceholder} alt={name} />
          <h3 className="card-description">{description}</h3>
          <h3 className="temperament">{temperament}</h3>
        </div>
      </div>
    </>
  )
}
