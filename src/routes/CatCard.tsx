import { useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { imagePlaceholder } from '../components/CatItem/CatItem'
import { MoonSpinner } from '../components/MoonSpinner'
import {
  searchResultsActions,
  useAppDispatch,
  useAppSelector,
} from '../features/searchResultsSlice'
import { useGetBreedQuery } from '../services/catApi'

export const CatCard: React.FC<object> = () => {
  const { isLoading, isLoadingCat } = useAppSelector(
    (state) => state.searchResults,
  )

  const dispatch = useAppDispatch()

  const { catId = '' } = useParams<{ catId: string }>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const { data: fetchedCat } = useGetBreedQuery(catId)

  useEffect(() => {
    if (fetchedCat) {
      dispatch(searchResultsActions.setCat(fetchedCat))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchedCat])

  const handleCloseButtonClick = () => {
    navigate(`/?${searchParams}`)
  }
  const handleContainerClick = () => {
    navigate(`/?${searchParams}`)
  }

  if (!fetchedCat || isLoading || isLoadingCat) {
    return <MoonSpinner />
  }

  const { image, description, temperament, name } = fetchedCat

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
