import { useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { imagePlaceholder } from '../components/CatItem/CatItem'
import { MoonSpinner } from '../components/MoonSpinner'
import { getBreed } from '../features/catSlice'
import { useAppDispatch, useAppSelector } from '../features/searchResultsSlice'
import { NotFound } from './NotFound'

export const CatCard: React.FC<object> = () => {
  const { cat, isLoading } = useAppSelector((state) => state.searchResults)
  const { status } = useAppSelector((state) => state.cats)
  const dispatch = useAppDispatch()

  const { catId } = useParams<{ catId: string }>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (catId) {
      dispatch(getBreed(catId))
    }
  }, [catId, dispatch])

  const handleCloseButtonClick = () => {
    navigate(`/?${searchParams}`)
  }
  const handleContainerClick = () => {
    navigate(`/?${searchParams}`)
  }

  if (!cat || isLoading || status === 'loading') {
    return <MoonSpinner />
  }
  if (status === 'failed') {
    return <NotFound />
  }
  const { image, description, temperament, name } = cat
  if (status === 'succeeded') {
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
}
