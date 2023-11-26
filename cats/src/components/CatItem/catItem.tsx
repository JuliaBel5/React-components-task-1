import { CatBreed } from '../../services/catApi'

export const imagePlaceholder =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019'

export const CatItem: React.FC<CatItemProps> = ({ cat }: CatItemProps) => {
  return (
    <div key={cat.id} className="result-card" data-testid="cat-item">
      <h1 className="title">{cat.name}</h1>
      <img src={cat.image ? cat.image.url : imagePlaceholder} alt={cat.name} />

      <h3 className="description">{cat.description}</h3>
      <h3 className="temperament">{cat.temperament}</h3>
    </div>
  )
}

interface CatItemProps {
  cat: CatBreed
}


