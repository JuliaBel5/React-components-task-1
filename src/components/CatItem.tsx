import { CatBreed } from '../services/CatService'

export const imagePlaceholder =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019'

export const CatItem: React.FC<CatItemProps> = ({ cat }) => {
  return (
    <div key={cat.id} className="result-card">
      <h1 className="title">{cat.name}</h1>
      <div className="image-frame">
        <img
          src={cat.image ? cat.image.url : imagePlaceholder}
          alt={cat.name}
        />
      </div>
      <h3 className="description">{cat.description}</h3>
      <h3 className="temperament">{cat.temperament}</h3>
    </div>
  )
}

interface CatItemProps {
  cat: CatBreed
}
