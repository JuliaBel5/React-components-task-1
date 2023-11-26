/* eslint-disable @next/next/no-img-element */
import { useEffect } from "react";
import { useRouter } from "next/router";
//import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { imagePlaceholder } from "../components/CatItem/catItem";
import { MoonSpinner } from "../components/MoonSpinner";
import {
  searchResultsActions,
  useAppDispatch,
  useAppSelector,
} from "../features/searchResultsSlice";
import { catApi, CatBreed, useGetBreedQuery } from "../services/catApi";

type CatCardProps = {
  data: CatBreed | null
}

export const CatCard = ({ data }: CatCardProps) => {
  if (!data) return null

  return <CatCardBody data={data} />;
};

const CatCardBody = ({ data: breed }: { data: CatBreed }) => {
  const router = useRouter();

  const handleCloseButtonClick = () => {
    router.back();
  };

  const { image, description, temperament, name } = breed;

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
  );
};

export default CatCard;
