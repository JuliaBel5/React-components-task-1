import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { imagePlaceholder } from '../components/CatItem'
import { CatBreed } from '../services/CatService'

interface CatCardProps {
  // Remove the cat prop
}
export const CatCard: React.FC<CatCardProps> = () => {
  const { catId } = useParams<{ catId: string }>()
  const [cat, setCat] = useState<CatBreed | null>(null)

  useEffect(() => {
    const fetchCatDetails = async () => {
      try {
        const response = await fetch(
          `https://2ff5030c446d8ca4.mokky.dev/breeds/${catId}`,
        )
        const data = await response.json()
        setCat(data)
      } catch (error) {
        console.error('Error fetching cat details:', error)
      }
    }

    fetchCatDetails()
  }, [catId])

  if (!cat) {
    return <div>Loading...</div>
  }

  const { image, description, temperament, name } = cat
  return (
    <div className="cat-card">
      <h1 className="title">{name}</h1>
      <img src={image ? image.url : imagePlaceholder} alt={name} />
      <h3 className="description">{description}</h3>
      <h3 className="temperament">{temperament}</h3>
    </div>
  )
}
