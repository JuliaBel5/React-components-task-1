/* eslint-disable @next/next/no-img-element */
import { useEffect } from 'react'
import { useRouter } from 'next/router'
//import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { imagePlaceholder } from '../components/CatItem/catItem'
import { MoonSpinner } from '../components/MoonSpinner'
import {
  searchResultsActions,
  useAppDispatch,
  useAppSelector,
} from '../features/searchResultsSlice'
import { catApi, CatBreed, useGetBreedQuery } from '../services/catApi'



export const CatCard: React.FC<object> = () => {
  const { isLoading, isLoadingCat } = useAppSelector(
    (state) => state.searchResults,
  )
  const router = useRouter()
  const { id } = router.query
  
  let catId = ""
  if (id) { 
 catId = id.toString()
  }

  
  const { data: breed } = useGetBreedQuery(catId)
  /*async function getServerSideProps(context: { params: any }) {
    const { data: breed } = useGetBreedQuery(catId)
   
    return { props: { breed } };
   }*/
  const dispatch = useAppDispatch()

  useEffect(() => {
 if (breed) {
       dispatch(searchResultsActions.setCat(breed))
     }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [breed])

  const handleCloseButtonClick = () => {
    router.back()
  }
  const handleContainerClick = () => {
    router.back()
  }

  if (!breed || isLoading || isLoadingCat) {
    return <MoonSpinner />
  }

  const { image, description, temperament, name } = breed

  return (
    <>
      <div
        className="shadow"
        onClick={handleCloseButtonClick}
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
export default CatCard