//import { useParams } from 'react-router-dom'
import { imagePlaceholder } from '../components/CatItem'
import { CatBreed } from '../services/CatService'

export function CatCard({ cat }: { cat: CatBreed }) {
  //const params = useParams(cat.id)
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
