import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { imagePlaceholder } from '../components/CatItem'
import { MoonSpinner } from '../components/MoonSpinner'
import { CatBreed } from '../services/CatService'

export const CatCard: React.FC<object> = () => {
  const [cat, setCat] = useState<CatBreed | null>(null)
  const { catId } = useParams<{ catId: string }>()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const baseUrl = `https://2ff5030c446d8ca4.mokky.dev/breeds`
    const fetchCatDetails = async () => {
      try {
        const response = await fetch(`${baseUrl}/${catId}`)
        const data = await response.json()
        setCat(data)
      } catch (error) {
        console.error('Error fetching cat details:', error)
      }
    }

    fetchCatDetails()
  }, [catId])

  if (!cat) {
    return <MoonSpinner />
  }
  const handleCloseButtonClick = () => {
    navigate(`/?${searchParams}`)
  }
  const handleContainerClick = () => {
    navigate(`/?${searchParams}`)
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

      <div className="modal-container">
        <div className="cat-card">
          <button
            className="close-button, orange-gradient-button"
            onClick={handleCloseButtonClick}
          >
            Close
          </button>
          <h1 className="title">{name}</h1>
          <img src={image ? image.url : imagePlaceholder} alt={name} />
          <h3 className="card-description">{description}</h3>
          <h3 className="temperament">{temperament}</h3>
        </div>
      </div>
    </>
  )
}
